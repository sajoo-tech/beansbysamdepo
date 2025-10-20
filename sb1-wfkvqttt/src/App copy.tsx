import { useState, useEffect } from 'react';
import Header from './components/Header';
import DateControl from './components/DateControl';
import CoffeeNavigation from './components/CoffeeNavigation';
import PassportCard from './components/PassportCard';
import { coffeeData } from './data/coffeeData';
import { Coffee } from './types/coffee';
import { generateDynamicData, getTodayDateString, formatDate } from './utils/passportUtils';

function App() {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee>(coffeeData[0]);
  const [roastDate, setRoastDate] = useState<string>(getTodayDateString());

  const dynamicData = generateDynamicData(selectedCoffee, new Date(roastDate));
  const formattedDate = formatDate(roastDate);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="antialiased text-gray-800 flex flex-col items-center justify-center min-h-screen p-4">
      <Header />

      <DateControl
        selectedDate={roastDate}
        onDateChange={setRoastDate}
        isHotBeverage={selectedCoffee.isHotBeverage}
      />

      <CoffeeNavigation
        coffees={coffeeData}
        currentCoffeeId={selectedCoffee.id}
        onSelectCoffee={setSelectedCoffee}
      />

      <div className="mb-6 text-center">
        <button
          onClick={handlePrint}
          className="bg-stone-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors shadow-md hover:shadow-lg"
        >
          Pasaportu Yazdır
        </button>
      </div>

      <PassportCard
        coffee={selectedCoffee}
        roastDate={formattedDate}
        lotNo={dynamicData.lotNo}
        certificateNo={dynamicData.certificateNo}
      />
    </div>
  );
}

export default App;
