export class Education {
  public schoolName: string;
  public degree: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public gpa: number;

  public static fromJson(json: any = {}): Education | Education[] {
    if (Array.isArray(json)) {
      return json.map(Education.fromJson) as Education[];
    }

    const payload = new Education();
    Object.assign(payload, json);
    return payload;
  }
}
