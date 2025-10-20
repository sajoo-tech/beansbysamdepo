interface DateControlProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  isHotBeverage?: boolean;
}

export default function DateControl({ selectedDate, onDateChange, isHotBeverage = false }: DateControlProps) {
  return (
    <div className="mb-4 p-4 bg-white rounded-xl border border-stone-200 shadow-sm text-center">
      <label htmlFor="roast-date-input" className="block text-lg font-semibold text-stone-700 mb-2">
        {isHotBeverage ? 'Üretim Tarihini Belirleyin' : 'Kavrulma Tarihini Belirleyin'}
      </label>
      <input
        type="date"
        id="roast-date-input"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="p-2 border border-stone-300 rounded-md shadow-sm focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
      />
    </div>
  );
}
