function generateCode(num) {
  let res = "";
  console.log("hello world");
  for (let i = 0; i < num; i++) {
    res += Math.floor(Math.random() * 10).toString();
  }
  return res;
}

module.exports = generateCode;
