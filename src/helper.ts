/**
 * Clamp number between min value and max value
 * @param num number
 * @param min min value
 * @param max max value
 */
export function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num;
}

export function isObjKey<T>(key: string | number | symbol, obj: T): key is keyof T {
  return key in obj;
}
