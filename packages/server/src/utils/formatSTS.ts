// data = :sts128,tem30.1,hum44.4
export const formatSTS = (data: string) => {
  // only format if it is sts
  // when port is connect, will get return "0SHT3x ok."
  if (!data.includes('sts')) return;
  const arr = data.split(',');
  //   const systemStatus = data.slice(4, 7);
  const systemStatus = arr[0].replace(':sts', '');
  //   const temp = data.slice(11, 15);
  const temp = arr[1].replace('tem', '');
  //   const hum = data.slice(19, 23);
  const hum = arr[2].replace('hum', '');
  return { systemStatus, temp, hum };
};
