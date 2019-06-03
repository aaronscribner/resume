export class Detail {
  public description: string;

  public static fromJson(json: any = {}): Detail | Detail[] {
    if (Array.isArray(json)) {
      return json.map(Detail.fromJson) as Detail[];
    }

    const payload = new Detail();
    Object.assign(payload, json);
    return payload;
  }
}
