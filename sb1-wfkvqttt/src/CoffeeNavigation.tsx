import { Coffee } from '../types/coffee';

interface CoffeeNavigationProps {
  coffees: Coffee[];
  currentCoffeeId: string;
  onSelectCoffee: (coffee: Coffee) => void;
}

export default function CoffeeNavigation({ coffees, currentCoffeeId, onSelectCoffee }: CoffeeNavigationProps) {
  return (
    <div className="mb-4 text-center">
      <h2 className="text-xl font-semibold text-stone-700 mb-3">Farklı bir çekirdeği keşfedin:</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {coffees.map((coffee) => (
          <button
            key={coffee.id}
            onClick={() => onSelectCoffee(coffee)}
            className={`px-9 py-1.5 rounded-full text-sm font-semibold border border-stone-300 shadow-sm transition-all hover:transform hover:-translate-y-0.5 hover:shadow-md ${
              coffee.id === currentCoffeeId
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-700'
            }`}
          >
            {coffee.name}
          </button>
        ))}
      </div>
    </div>
  );
}
