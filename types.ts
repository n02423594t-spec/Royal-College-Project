
export enum FertilityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface NutrientProfile {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface SoilAnalysis {
  id: string;
  timestamp: number;
  image: string; // base64
  fertilityLevel: FertilityLevel;
  confidence: number;
  soilType: string;
  organicMatterEstimate: string;
  recommendations: {
    fertilizerType: string;
    dosage: string;
    notes: string;
  };
  nutrientProfile: NutrientProfile;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface AnalysisState {
  isAnalyzing: boolean;
  error: string | null;
  currentResult: SoilAnalysis | null;
  history: SoilAnalysis[];
}
