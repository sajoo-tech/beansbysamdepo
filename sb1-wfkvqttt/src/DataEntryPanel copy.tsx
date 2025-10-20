import { Plus, Trash2 } from 'lucide-react';
import { OrderItem, PRODUCTS, GRIND_TYPES } from '../types';

interface DataEntryPanelProps {
  recipientInfo: string;
  setRecipientInfo: (value: string) => void;
  items: OrderItem[];
  setItems: (items: OrderItem[]) => void;
  onPreview: () => void;
}

export function DataEntryPanel({
  recipientInfo,
  setRecipientInfo,
  items,
  setItems,
  onPreview
}: DataEntryPanelProps) {
  const addItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      product: PRODUCTS[0],
      weight: '',
      quantity: 1,
      grindType: GRIND_TYPES[0]
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Veri Giriş Paneli</h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Alıcı Bilgileri
        </label>
        <textarea
          value={recipientInfo}
          onChange={(e) => setRecipientInfo(e.target.value)}
          placeholder="Alıcı adı, adres, telefon vb. tüm bilgileri buraya yazın..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 min-h-[100px]"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Sipariş Özeti
          </label>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <Plus size={18} />
            Ürün Ekle
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Ürün</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Gramaj</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Adet</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Öğütülme Biçimi</th>
                <th className="border border-gray-300 px-3 py-2 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-2 py-2">
                    <select
                      value={item.product}
                      onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                    >
                      {PRODUCTS.map(product => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="text"
                      value={item.weight}
                      onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                      placeholder="250g"
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      min="1"
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select
                      value={item.grindType}
                      onChange={(e) => updateItem(item.id, 'grindType', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                    >
                      {GRIND_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Henüz ürün eklenmedi. "Ürün Ekle" butonuna tıklayarak başlayın.
          </div>
        )}
      </div>

      <button
        onClick={onPreview}
        className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-semibold"
      >
        Önizleme ve Yazdır
      </button>
    </div>
  );
}
