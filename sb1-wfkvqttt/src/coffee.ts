export interface Coffee {
  id: string;
  name: string;
  origin: string;
  prefix: string;
  description: string;
  tastingNotes: string[];
  altitude?: string;
  process?: string;
  variety?: string;
  acidity?: string;
  characteristics?: string;
  isHotBeverage?: boolean;
  tasteProfile?: string;
  ingredients?: string;
}

export interface DynamicData {
  lotNo: string;
  certificateNo: string;
}
