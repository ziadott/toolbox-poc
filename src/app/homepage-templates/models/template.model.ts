export interface Template {
  id: number;
  name: string;
  description: string;
  userType: 'Premium' | 'Freemium' | 'Both';
  lastModified: string;
  sections: Section[];
}

export interface Section {
  id: number;
  type: ComponentType;
  config: any; // will vary depending on the component type
}

export type ComponentType =
  | 'carousel'
  | 'playlist'
  | 'song'
  | 'grid'
  | 'banner'
  | 'header';
