import { useState } from 'react';
import { Plus, Trash2, Printer, Home } from 'lucide-react';
import { PRODUCTS, GRIND_TYPES, OrderItem, LabelData } from './types';
import { supabase } from './supabaseClient';

interface CargoLabelProps {
  onNavigateHome: () => void;
}

function CargoLabel({ onNavigateHome }: CargoLabelProps) {
  const [labelData, setLabelData] = useState<LabelData>({
    recipientInfo: '',
    items: []
  });

  const addItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      product: PRODUCTS[0],
      weight: '250',
      quantity: 1,
      grindType: GRIND_TYPES[0]
    };
    setLabelData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    setLabelData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
    setLabelData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const isHotBeverage = (product: string) => {
    const hotBeverages = ['Sıcak Çikolata', 'Hot Chocolate', 'Sams Salep', 'Sams Chai Tea Latte'];
    return hotBeverages.includes(product);
  };

  const handlePrint = async () => {
    try {
      const { error } = await supabase
        .from('cargo_labels')
        .insert({
          recipient_info: labelData.recipientInfo,
          items: labelData.items,
        });

      if (error) {
        console.error('Error saving cargo label:', error);
      }
    } catch (err) {
      console.error('Failed to save cargo label:', err);
    }

    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="print:hidden mb-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Ana Menü</span>
          </button>
          <h1 className="text-3xl font-bold text-stone-800">Kargo Etiketi</h1>
          <div className="w-32"></div>
        </div>

        <div className="print:hidden bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Alıcı Bilgileri
            </label>
            <textarea
              value={labelData.recipientInfo}
              onChange={(e) => setLabelData(prev => ({ ...prev, recipientInfo: e.target.value }))}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              rows={4}
              placeholder="Alıcı adı, adres, telefon vb."
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-stone-800">Ürünler</h2>
              <button
                onClick={addItem}
                className="flex items-center space-x-2 px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ürün Ekle</span>
              </button>
            </div>

            <div className="space-y-4">
              {labelData.items.map((item, index) => (
                <div key={item.id} className="border border-stone-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-semibold text-stone-800">Ürün {index + 1}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Ürün
                      </label>
                      <select
                        value={item.product}
                        onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500"
                      >
                        {PRODUCTS.map(product => (
                          <option key={product} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>

                    {!isHotBeverage(item.product) && (
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Öğütüm Tipi
                        </label>
                        <select
                          value={item.grindType}
                          onChange={(e) => updateItem(item.id, 'grindType', e.target.value)}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500"
                        >
                          {GRIND_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Ağırlık (gr)
                      </label>
                      <input
                        type="text"
                        value={item.weight}
                        onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        Adet
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {labelData.items.length === 0 && (
                <div className="text-center py-8 text-stone-500">
                  Henüz ürün eklenmedi. "Ürün Ekle" butonuna tıklayın.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handlePrint}
              disabled={labelData.items.length === 0}
              className="flex items-center space-x-2 px-8 py-3 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer className="w-5 h-5" />
              <span>Yazdır</span>
            </button>
          </div>
        </div>

        <div className="hidden print:block bg-white p-0 m-0">
          <div className="border-4 border-black">
            <img src="/Pc giris sliderler  copy copy.jpg" alt="Beans by Sam" className="w-full h-auto block" />

            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2 border-b-2 border-black pb-1">ALICI BİLGİLERİ</h2>
                <div className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                  {labelData.recipientInfo || 'GFGG'}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 border-b-2 border-black pb-1">ÜRÜNLER</h2>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left py-2 px-2 font-bold">Ürün</th>
                      <th className="text-center py-2 px-2 font-bold">Öğütüm</th>
                      <th className="text-center py-2 px-2 font-bold">Ağırlık</th>
                      <th className="text-center py-2 px-2 font-bold">Adet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labelData.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-300">
                        <td className="py-2 px-2">{item.product}</td>
                        <td className="text-center py-2 px-2">{isHotBeverage(item.product) ? '-' : item.grindType}</td>
                        <td className="text-center py-2 px-2">{item.weight}gr</td>
                        <td className="text-center py-2 px-2">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t-2 border-black pt-4">
                <p className="font-bold text-base mb-2">BEANSBYSAM</p>
                <p className="text-xs leading-relaxed text-gray-700">
                  Telefon & WhatsApp (7/24): 0544 918 61 72 | E-posta: destek@beansbysam.com | Web: beansbysam.com | Adres: Aydın Evler Mah. Selçukbey Cad. No:69/86, Dükkan No: 56, 34854 Maltepe / İstanbul
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CargoLabel;
