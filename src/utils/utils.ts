// Конвертер времени
export const convertToHours = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours && minutes) {
    return `${hours} ч ${minutes} мин`;
  } else {
    return `${minutes} мин`;
  }
};
