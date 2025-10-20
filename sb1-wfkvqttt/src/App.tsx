import { useState } from 'react';
import HomeScreen from './HomeScreen';
import CoffeePassport from './CoffeePassport';
import CargoLabel from './CargoLabel';

type Screen = 'home' | 'coffee' | 'cargo';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === 'home') {
    return <HomeScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === 'coffee') {
    return <CoffeePassport onNavigateHome={() => handleNavigate('home')} />;
  }

  if (currentScreen === 'cargo') {
    return <CargoLabel onNavigateHome={() => handleNavigate('home')} />;
  }

  return null;
}

export default App;
