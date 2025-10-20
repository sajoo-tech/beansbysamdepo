import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO_EMAIL = 'seckinyalcings@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

interface CargoLabel {
  id: string;
  recipient_info: string;
  items: Array<{
    id: string;
    product: string;
    weight: string;
    quantity: number;
    grindType: string;
  }>;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const { data: labels, error } = await supabase
      .from('cargo_labels')
      .select('*')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    const typedLabels = labels as CargoLabel[];

    let totalProducts = 0;
    const productSummary: Record<string, number> = {};

    typedLabels?.forEach((label) => {
      label.items?.forEach((item) => {
        totalProducts += item.quantity || 0;
        const productKey = `${item.product} (${item.weight}gr)`;
        productSummary[productKey] = (productSummary[productKey] || 0) + item.quantity;
      });
    });

    const summary = {
      date: today.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      total_orders: typedLabels?.length || 0,
      total_products: totalProducts,
      product_breakdown: productSummary,
      orders: typedLabels || [],
    };

    console.log('Daily Summary:', JSON.stringify(summary, null, 2));

    if (summary.total_orders > 0 && RESEND_API_KEY) {
      let emailBody = `
        <h2>Günlük Kargo Özeti - ${summary.date}</h2>
        <p><strong>Toplam Sipariş:</strong> ${summary.total_orders}</p>
        <p><strong>Toplam Ürün Adedi:</strong> ${summary.total_products}</p>

        <h3>Ürün Dağılımı:</h3>
        <ul>
      `;

      for (const [product, count] of Object.entries(summary.product_breakdown)) {
        emailBody += `<li>${product}: ${count} adet</li>`;
      }

      emailBody += `
        </ul>

        <h3>Sipariş Detayları:</h3>
      `;

      typedLabels.forEach((label, index) => {
        emailBody += `
          <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0;">
            <h4>Sipariş ${index + 1}</h4>
            <p><strong>Alıcı Bilgileri:</strong><br>${label.recipient_info.replace(/\n/g, '<br>')}</p>
            <p><strong>Ürünler:</strong></p>
            <ul>
        `;

        label.items?.forEach((item) => {
          emailBody += `<li>${item.product} - ${item.weight}gr - ${item.quantity} adet${item.grindType && item.grindType !== 'Çekirdek' ? ` - ${item.grindType}` : ''}</li>`;
        });

        emailBody += `
            </ul>
            <p><small>Oluşturulma: ${new Date(label.created_at).toLocaleString('tr-TR')}</small></p>
          </div>
        `;
      });

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: `Günlük Kargo Özeti - ${summary.date} (${summary.total_orders} sipariş)`,
          html: emailBody,
        }),
      });

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email gönderimi başarısız:', errorText);
        throw new Error(`Email sending failed: ${errorText}`);
      }

      const emailResult = await emailResponse.json();
      console.log('Email gönderildi:', emailResult);
    }

    return new Response(
      JSON.stringify({
        success: true,
        summary,
        email_sent: summary.total_orders > 0 && !!RESEND_API_KEY,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});