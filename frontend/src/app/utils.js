const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getBgClass = (task) => {
  if (task.type === 0) return "bgPatternOrange";
  if (task.type === 1) return "bgPatternPurple";
  if (task.type === 2) return "bgPatternPink";
  return "";
};

export { random, getBgClass };
