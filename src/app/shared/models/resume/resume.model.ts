import { Detail } from './detail.model';
import { ContactInfo } from './contact-info.model';
import { Resource } from '../resource.model';
import { Experience } from './experience.model';
import { Certification } from './certification.model';
import { Education } from './education.model';

export class Resume extends Resource {
  public id: string;
  public name: string;
  public title: string;
  public facebookUrl: string;
  public linkedInUrl: string;
  public twitterUrl: string;
  public about: string;
  public contactInfo: ContactInfo;
  public experience: Experience[];
  public certifications: Certification[];
  public skills: Detail[];
  public education: Education[];

  public static fromJson(json: any = {}): Resume | Resume[] {
    if (Array.isArray(json)) {
      return json.map(Resume.fromJson) as Resume[];
    }

    const { contactInfo, experience, certifications, skills, education } = json;
    json.contactInfo = ContactInfo.fromJson(contactInfo);
    json.experience = Experience.fromJson(experience);
    json.certifications = Certification.fromJson(certifications);
    json.skills = Detail.fromJson(skills);
    json.education = Education.fromJson(education);
    const payload = new Resume();
    Object.assign(payload, json);
    return payload;
  }
}
