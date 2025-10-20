import { useState, useMemo, useEffect } from 'react';
import { Home } from 'lucide-react';
import { coffeeData } from './coffeeData';
import { generateDynamicData, getTodayDateString, formatDate } from './passportUtils';
import { coffeeDB } from './db';
import Header from './Header';
import CoffeeNavigation from './CoffeeNavigation';
import DateControl from './DateControl';
import PassportCard from './PassportCard';

interface CoffeePassportProps {
  onNavigateHome: () => void;
}

function CoffeePassport({ onNavigateHome }: CoffeePassportProps) {
  const [currentCoffee, setCurrentCoffee] = useState(coffeeData[0]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedState = await coffeeDB.loadState();
        if (savedState) {
          const coffee = coffeeData.find(c => c.id === savedState.coffeeId);
          if (coffee) setCurrentCoffee(coffee);
          setSelectedDate(savedState.selectedDate);
        }
      } catch (error) {
        console.error('Failed to load saved state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedState();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      coffeeDB.saveState(currentCoffee.id, selectedDate).catch(error => {
        console.error('Failed to save state:', error);
      });
    }
  }, [currentCoffee, selectedDate, isLoading]);

  const dynamicData = useMemo(() => {
    const date = new Date(selectedDate);
    return generateDynamicData(currentCoffee, date);
  }, [currentCoffee, selectedDate]);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log('Service Worker aktif - Uygulama çevrimdışı çalışabilir');
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50 flex items-center justify-center">
        <div className="text-stone-600 text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-amber-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="print:hidden mb-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Ana Menü</span>
          </button>
        </div>

        <Header />

        <div className="mb-6 print:hidden">
          <CoffeeNavigation
            coffees={coffeeData}
            currentCoffeeId={currentCoffee.id}
            onSelectCoffee={setCurrentCoffee}
          />
        </div>

        <div className="mb-6 print:hidden">
          <DateControl
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            isHotBeverage={currentCoffee.isHotBeverage}
          />
        </div>

        <div className="mb-6">
          <PassportCard
            coffee={currentCoffee}
            roastDate={formatDate(selectedDate)}
            lotNo={dynamicData.lotNo}
            certificateNo={dynamicData.certificateNo}
            selectedDateISO={selectedDate}
          />
        </div>

        <div className="text-center print:hidden">
          <button
            onClick={handlePrint}
            className="px-8 py-3 bg-stone-800 text-white rounded-lg font-semibold hover:bg-stone-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Pasaport Kartını Yazdır
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeePassport;
