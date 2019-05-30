export class StringUtils {
  public static toHumanReadable(value: string): string {
    if ((typeof value) !== 'string') {
      return value;
    }
    value = value.split(/(?=[A-Z])/).join(' ');
    value = value[0].toUpperCase() + value.slice(1);
    return value;
  }

  public static toPascalCase(value: string): string {
    if ((typeof value) !== 'string') {
      return value;
    }
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  }

  public static trimLeft(value: string): string {
    return value.replace(/^\s+/, '');
  }
  
  public static trimRight(value: string): string {
    return value.replace(/[\s]+$/, '');
  }
}
