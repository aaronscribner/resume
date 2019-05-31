export class Certification {
  public detail: string;
  public imageUrl: string;

  public static fromJson(json: any = {}): Certification | Certification[] {
    if (Array.isArray(json)) {
      return json.map(Certification.fromJson) as Certification[];
    }

    const payload = new Certification();
    Object.assign(payload, json);
    return payload;
  }
}
