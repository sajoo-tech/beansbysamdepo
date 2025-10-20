import { OrderItem } from '../types';

interface LabelPreviewProps {
  recipientInfo: string;
  items: OrderItem[];
}

export function LabelPreview({ recipientInfo, items }: LabelPreviewProps) {
  return (
    <div
      id="label-content"
      className="bg-white"
      style={{
        width: '10cm',
        height: '10cm',
        padding: '0.3cm',
        fontFamily: 'Arial, sans-serif',
        fontSize: '8pt',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Logo and Header */}
      <div className="text-center mb-2">
        <img
          src="/Adsız tasarımcc.png"
          alt="Beans by Sam"
          className="mx-auto"
          style={{ height: '1.5cm', objectFit: 'contain', filter: 'grayscale(100%) brightness(0)' }}
        />
      </div>

      {/* Recipient Info */}
      <div className="mb-2 border-b border-gray-400 pb-2">
        <div className="font-bold mb-1 text-xs">Alıcı:</div>
        <div className="text-xs whitespace-pre-wrap leading-tight">
          {recipientInfo || 'Alıcı bilgileri girilmedi'}
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex-1 mb-2">
        <div className="font-bold mb-1 text-xs">Sipariş Özeti:</div>
        {items.length > 0 ? (
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-black">
                <th className="text-left py-1 font-bold">Ürün</th>
                <th className="text-left py-1 font-bold">Gramaj</th>
                <th className="text-left py-1 font-bold">Adet</th>
                <th className="text-left py-1 font-bold">Öğütme</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-300">
                  <td className="py-1">{item.product}</td>
                  <td className="py-1">{item.weight}</td>
                  <td className="py-1">{item.quantity}</td>
                  <td className="py-1 text-xs">{item.grindType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-xs text-gray-500">Sipariş kalemi yok</div>
        )}
      </div>

      {/* Sender Info - At Bottom */}
      <div className="mt-auto pt-2 border-t border-gray-400" style={{ fontSize: '6pt' }}>
        <div className="leading-tight text-center">
          <div className="font-semibold">Beans by Sam</div>
          <div>Aydın Evler Mah. Selçukbey Cad. No:69/86, Dükkan No: 56, 34854 Maltepe/İstanbul</div>
          <div>Tel & WhatsApp: 0544 918 6172 | E-posta: destek@beansbysam.com | Web: beansbysam.com</div>
        </div>
      </div>
    </div>
  );
}
