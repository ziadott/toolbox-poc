export interface Template {
    id: string;
    name: string;
    description: string;
    status: TemplateStatus;
    userType: UserType;
    lastModified: string;
    metadataTag?: string;
  }
  
  export type TemplateStatus =
    'Draft' |
    'Active' |
    'PublishedToStaging' |
    'PublishedToProduction' |
    'Archived';
  
  export type UserType = 'Premium' | 'Freemium' | 'Both';
  
