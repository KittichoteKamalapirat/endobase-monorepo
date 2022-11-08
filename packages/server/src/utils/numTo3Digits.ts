export const numTo3Digits = (n: number, length: number) => {
  let len = length - ('' + n).length;
  return (len > 0 ? new Array(++len).join('0') : '') + n;
};
