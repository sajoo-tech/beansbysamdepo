import { Coffee, Package } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: 'coffee' | 'cargo') => void;
}

function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <img
            src="/logo.jpg"
            alt="Sam's Coffee Logo"
            className="mx-auto mb-6 h-32 w-auto object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-4xl font-bold text-stone-800 mb-2">
            Sam's Coffee Uygulamaları
          </h1>
          <p className="text-stone-600 text-lg">
            Lütfen bir işlem seçin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('coffee')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-amber-400"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Coffee className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-800 mb-2">
                  Coffee Passport
                </h2>
                <p className="text-stone-600">
                  Kahve pasaport kartları oluştur ve yazdır
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('cargo')}
            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-stone-400"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-stone-600 to-stone-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-stone-800 mb-2">
                  Kargo Etiketi
                </h2>
                <p className="text-stone-600">
                  Kargo etiketleri oluştur ve yazdır
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="text-center mt-8 text-stone-500 text-sm">
          <p>© 2025 Sam's Coffee - Tüm hakları saklıdır</p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
