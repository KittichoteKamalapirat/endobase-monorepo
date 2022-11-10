import dayjs from "dayjs";

export const pgDateToReadable = (date: string) => {
  const formatted = dayjs(date).format("DD/MM/YYYY HH:mm");
  return formatted;
};
