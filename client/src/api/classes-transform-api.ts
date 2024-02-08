import { UserClass } from '../interfaces/class.interface';

export function prepareClassData(data: Partial<UserClass>) {
  const { name, price, schedule } = data;
  let classData = {};

  name && (classData = { ...classData, name });
  price && (classData = { ...classData, price });
  schedule && (classData = { ...classData, schedule });

  return classData;
}
