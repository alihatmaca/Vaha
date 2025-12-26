export enum FeatureType {
  NEWS = 'NEWS',
  QUOTE = 'QUOTE',
  FRIENDS = 'FRIENDS',
  SCENES = 'SCENES',
}

export interface NewsData {
  headline: string;
  summary: string;
  location?: string;
}

export interface QuoteData {
  text: string;
  author: string;
}

export interface ImageData {
  url: string; // Base64 data URL
  description: string;
}

export type FeatureData = NewsData | QuoteData | ImageData | null;

export interface AppState {
  activeFeature: FeatureType | null;
  data: FeatureData;
  isLoading: boolean;
  error: string | null;
}