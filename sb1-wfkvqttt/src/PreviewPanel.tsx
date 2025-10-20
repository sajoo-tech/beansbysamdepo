import { ArrowLeft, Printer } from 'lucide-react';
import { OrderItem } from '../types';
import { LabelPreview } from './LabelPreview';

interface PreviewPanelProps {
  recipientInfo: string;
  items: OrderItem[];
  onBack: () => void;
}

export function PreviewPanel({ recipientInfo, items, onBack }: PreviewPanelProps) {
  const handlePrint = () => {
    const printContent = document.getElementById('label-content');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Kargo Etiketi</title>
          <style>
            @page {
              size: 10cm 10cm;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Geri Dön
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Etiket Önizleme</h2>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          <Printer size={20} />
          Yazdır
        </button>
      </div>

      <div className="flex justify-center">
        <div className="border-2 border-gray-300 shadow-xl">
          <LabelPreview recipientInfo={recipientInfo} items={items} />
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Etiket boyutu: 10cm x 10cm (Yazdırma öncesi önizleme)
      </div>
    </div>
  );
}
