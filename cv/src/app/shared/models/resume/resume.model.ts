import { Detail } from './detail.model';
import { ContactInfo } from './contact-info.model';
import { Resource } from '../resource.model';

export class Resume extends Resource {
  id: string;
  name: string;
  title: string;
  about: string;
  contactInfo: ContactInfo;
  experience: Detail[];
  certifications: Detail[];
}
