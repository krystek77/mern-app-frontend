export function fisherYatesShuffle(array) {
  for (var i = array.length - 1; i > 0; --i) {
    swap(array, i, (Math.random() * (i + 1)) | 0);
  }
  return array;
}

function swap(array, a, b) {
  var holder = array[a];
  array[a] = array[b];
  array[b] = holder;
}

export default fisherYatesShuffle;
