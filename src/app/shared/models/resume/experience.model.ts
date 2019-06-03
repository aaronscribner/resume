import { Detail } from './detail.model';

export class Experience {
  public companyName: string;
  public title: string;
  public startDate: string;
  public endDate: string;
  public duties: Detail[];
  public technologies: Detail[];

  public static fromJson(json: any = {}): Experience | Experience[] {
    if (Array.isArray(json)) {
      return json.map(Experience.fromJson) as Experience[];
    }

    const { duties, technologies } = json;
    json.duties = Detail.fromJson(duties);
    json.technologies = Detail.fromJson(technologies);
    const payload = new Experience();
    Object.assign(payload, json);
    return payload;
  }
}
