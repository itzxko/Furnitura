const multiply = (callback, a, b) => {
  let result = 0;
  setTimeout(() => {
    result = a * b;
    callback(result);
  }, 2000);
};

const displayResult = (result) => {
  console.log(result);
};

multiply(displayResult, 3, 4);

// function first(callback) {
//   setTimeout(() => {
//     console.log("1st");
//     callback();
//   }, 2000);
// }

// function second() {
//   console.log("2nd");
// }

// first(second);
