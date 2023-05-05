export const getTimeElapsed = (createdAt) => {

  const dateNow = new Date();
  const dateCreated = new Date(createdAt);

  const elapsed = dateNow.getTime() - dateCreated.getTime();
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `il y'a ${years} an${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `il y'a ${months} mois`;
  } else if (days > 0) {
    return `il y'a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `il y'a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `il y'a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `il y'a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
  }
}




export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
