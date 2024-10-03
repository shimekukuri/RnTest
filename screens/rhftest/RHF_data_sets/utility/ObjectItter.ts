export function ObjectIter<T>(value: T): T[] {
  let temp: T[] = [];

  for (let i in value) {
    //@ts-ignore
    temp.push(value[i] as T);
  }
  return temp;
}
