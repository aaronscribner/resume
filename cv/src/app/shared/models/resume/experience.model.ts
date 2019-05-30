import { Detail } from './detail.model';

export class Experience {
  companyName: string;
  title: string;
  startDate: string;
  endDate: string;
  duties: Detail[];
  technologies: Detail[];
}
