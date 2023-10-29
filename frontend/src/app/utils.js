const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getBgClass = task => {
  if (task.type === 0) return "cardImportanceLow";
  if (task.type === 1) return "cardImportanceMedium";
  if (task.type === 2) return "cardImportanceHigh";
  return "";
}

export default {
  random,
  getBgClass
};
