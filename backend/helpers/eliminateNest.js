const eliminateNest = function (arr) {
  let res = eliminate(arr);
  if (!Array.isArray(res)) {
    res = [res];
  }
  return res;
};

function eliminate(arr) {
  if (arr.length === 0) {
    return;
  }
  if (!Array.isArray(arr)) {
    return arr;
  }
  const arr1 = eliminate(arr[0]);
  const arr2 = eliminate(arr.slice(1, arr.length));
  if (!arr2) {
    return arr1;
  }
  return Array.prototype.concat.call(arr1, arr2);
}

module.exports = eliminateNest;
