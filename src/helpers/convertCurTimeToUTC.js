export const convertCurTimeToUTC = (dateStr) => {
  const nowUTC = new Date(dateStr);
  const timezoneOffset = nowUTC.getTimezoneOffset(); // Негативний для східних зон
  const localDate = new Date(nowUTC.getTime() + timezoneOffset * 60 * 1000);

  return localDate.toISOString().slice(0, -1) + '+0000';
};
