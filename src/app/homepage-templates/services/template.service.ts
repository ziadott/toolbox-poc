import { Injectable } from '@angular/core';
import { Template } from '../models/template.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private readonly templates: Template[] = [
    {
      id: '1',
      name: 'Standard Discovery Layout',
      description: 'A balanced layout emphasizing new music and personalized recommendations.',
      status: 'PublishedToStaging',
      userType: 'Premium',
      lastModified: '2023-10-26 14:30',
      metadataTag: 'Metadata'
    },
    {
      id: '2',
      name: 'Artist Spotlight',
      description: 'Highlights a single artist with their discography and related content.',
      status: 'Draft',
      userType: 'Freemium',
      lastModified: '2023-10-25 10:00'
    },
    {
      id: '3',
      name: 'Genre Focus',
      description: 'Showcases content based on a user\'s preferred genres.',
      status: 'PublishedToProduction',
      userType: 'Freemium',
      lastModified: '2023-10-24 16:15'
    },
    {
      id: '4',
      name: 'New Releases Carousel',
      description: 'Features a prominent carousel for the latest music releases.',
      status: 'Active',
      userType: 'Both',
      lastModified: '2023-10-23 09:00'
    },
    {
      id: '5',
      name: 'Podcast Hub',
      description: 'Dedicated layout for discovering and managing podcasts.',
      status: 'Archived',
      userType: 'Premium',
      lastModified: '2023-10-22 11:45'
    },
    {
      id: '6',
      name: 'Curated Playlists',
      description: 'Focuses on displaying a wide range of curated playlists.',
      status: 'Active',
      userType: 'Both',
      lastModified: '2023-10-21 13:00'
    }
  ];

  getTemplates(): Template[] {
    return this.templates;
  }

  getTotal(): number {
    return this.templates.length;
  }
}
