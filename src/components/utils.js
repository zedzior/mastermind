const utils = {
  getRange: (min, max) => {
    const arr = [];
    for (let i = min; i < max + 1; i++) {
      arr.push(i);
    }
    return arr;
  },

  getRandomPairs: (min, max) => {
    const a = utils.getRange(min, max).concat(utils.getRange(min, max));
    console.log(a)
    return utils.shuffleArray(a);
  },

  shuffleArray: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
};
export default utils;