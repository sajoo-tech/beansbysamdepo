import { useState } from 'react';
import { DataEntryPanel } from './components/DataEntryPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { OrderItem } from './types';

function App() {
  const [recipientInfo, setRecipientInfo] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Kargo Etiketi Uygulaması
          </h1>
          <p className="text-gray-600">Beans by Sam - 10cm x 10cm Etiket Yazdırma</p>
        </div>

        {!showPreview ? (
          <DataEntryPanel
            recipientInfo={recipientInfo}
            setRecipientInfo={setRecipientInfo}
            items={items}
            setItems={setItems}
            onPreview={() => setShowPreview(true)}
          />
        ) : (
          <PreviewPanel
            recipientInfo={recipientInfo}
            items={items}
            onBack={() => setShowPreview(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
