const getDateFormat = (currentDate: number) => {
  const date = new Date(currentDate);
  return [
      date.getDate(),
      (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
      date.getFullYear()].join('.') + ' ' +
    [date.getHours(),
      date.getMinutes(),
      date.getSeconds()].join(':');
};

export default getDateFormat;