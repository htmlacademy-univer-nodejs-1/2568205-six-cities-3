export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  //console.log(items)
  return items[generateRandomValue(0, items.length - 1)];
}
export function getRandomEnumValue<T>(enumObj: any): T | undefined
{
  const enumValues = Object.keys(enumObj).filter(key => isNaN(parseInt(key)));
  //console.log(enumValues)


  if (enumValues.length === 0)
    return undefined;


  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as T;
}
export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
