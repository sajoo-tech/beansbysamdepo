import { Coffee, DynamicData } from '../types/coffee';

export function generateDynamicData(coffee: Coffee, date: Date): DynamicData {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const lotNo = `${coffee.prefix}-SO-${year}-${month}${day}`;

  const isHotBeverage = coffee.isHotBeverage || false;
  let certificateNo: string;

  if (isHotBeverage) {
    const batchPeriod = Math.floor((date.getMonth()) / 2) + 1;
    const batchNumber = `${year}${batchPeriod.toString().padStart(2, '0')}`;
    const randomSerialSuffix = Math.floor(1000 + Math.random() * 9000);
    certificateNo = `${coffee.prefix}-${batchNumber}-${randomSerialSuffix}`;
  } else {
    const randomCertSuffix = Math.floor(10000 + Math.random() * 90000);
    certificateNo = `${coffee.prefix}-SO-${year}${month}-${randomCertSuffix}`;
  }

  return { lotNo, certificateNo };
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
}
