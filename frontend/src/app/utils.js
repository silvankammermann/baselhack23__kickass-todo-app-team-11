const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getBgClass = task => {
  if (task.type === 0) return "bg0";
  if (task.type === 1) return "bg1";
  if (task.type === 2) return "bg2";
  return "";
}

export default {
  random,
  getBgClass
};
