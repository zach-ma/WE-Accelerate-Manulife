console.log("Hello World!");

console.log("\n==== Variable Declarations & Scope ====");

console.log("\n---- var ----");

// Function scope
/* 2 ways of creating a function
  declaration/statemt
    - can be hoisted
  expression
    - cannot be hoisted
*/

function varTest() {
  var x = 1;
  console.log("var x - initial: ", x);

  // remember type coercion?
  if (x === 1) {
    var x = 2; // function-scoped, so x from above is re-assigned to 2
    // can change the type to let and const to demo the differences
    console.log("var x - inside block: ", x); // x = 2
  }

  console.log("var x - outside of block: ", x); // x = 2, was changed in the 'if block'
}
varTest();

// Global scope
var x_global = 1;
console.log("var x_global - initial:", x_global); // x_global = 1

if (x_global === 1) {
  var x_global = 2;
  console.log("var x_global - inside block: ", x_global); // x_global = 2;
}

console.log("var x_global - outside of block: ", x_global); // x_global = 2 was changed inside the if block

console.log("\n---- let ----");

// can be skipped
function letTest() {
  let y = 1;
  console.log(`var y - initial: ${y}`); // y = 1, introduce String Template Literal Syntax

  if (y === 1) {
    let y = 2; // let is block-scoped
    console.log(`let y - inside block: ${y}`); // y = 2
  }

  console.log(`let y - outside block ${y}`); // y = 1, y in the function scope is unaffected
}
letTest();

console.log("\n---- const ----");

//can be skipped
function constTest() {
  const z = 1;
  console.log(`const z - initial: ${z}`);

  if (z === 1) {
    const z = 5; // const is block-scoped
    console.log(`const z - inside block: ${z}`); // z = 5;
  }
  console.log(`const z - outside block: ${z}`); // z = 1, unchanged

  // Re-assignment not possible with `const`
  // 2 lines below will fail with error (try it)
  z = 2;
  console.log(`const z - reassigning: ${z}`);

  // wrap in try-catch block so we can see the error but also move on and keep running the program
  // NOTE
  try {
    z = 2;
  } catch (err) {
    console.log("const z - error when re-assigning value: ");
    console.error(err);
    console.log("\n");
  }
}
constTest();

/* benefits: allowed access function/var before declared
 reason: due to JS interpreter's 2-step process implemetation  */
console.log("\n==== Hoisting ====");
console.log(`hoisting - var: ${hoistedVar}`); // hoistedVar: undefined
var hoistedVar = 10;
console.log(`hoisting - var, after assigning: ${hoistedVar}`); // hoistedVar: 10

// below will fail with error, because the variable will be hoisted but uninitialized (try it)
console.log(`hoisting - let: ${number}`);
let number = 11;

// wrap in try-catch block so we can log the error and keep the program running
try {
  console.log(`let number: reference error - ${number}`);
} catch (err) {
  console.error(err);
}
let number = 11; // same thing happens with const

// Another example of scope + hoisting
for (var i = 0; i < 3; i++) {
  console.log(`var i - inside for block: ${i}`); // i = 0, i = 1, i = 2
}
console.log(`var i - outside for block: ${i}`); // i = 3

for (let j = 0; j < 3; j++) {
  console.log(`let j - inside for block: ${j}`); // j = 0, j = 1, j = 2
}

// below will result in error
// console.log(`let j - outside for block: ${j}`); j = ?

// so wrap in try-catch
try {
  console.log(`let j - outside for block: ${j}`); // j = uninitialized, will result in ReferenceError
} catch (err) {
  console.log("let j - reference error:");
  console.log(err);
  console.log("\n");
}

// Recommend using `let` and `const`, and convention is to declare variables at the top of its scope before accessing

console.log("\n==== Objects ====");
const employee = {
  firstName: "Junting",
  lastName: "Guo",
};

console.log("employee: ", employee); // so use this notation instead

/* alternatively below as modern syntax with backtick but this way it will force to display object as string thus we will need JSON.stringify() to convert the object into string  */
// console.log(`Employee: ${employee}`)
// console.log(`Employee: ${JSON.stringify(employeeWithInfo)}`);

// spread operator (...)
const employeeWithInfo = {
  ...employee,
  jobTitle: "Software Engineer",
  office: "500 King",
};
console.log("employee with info: ", employeeWithInfo);

// Destructuring (all examples below build off each other. commented out examples are to show each step, for reference)
// so instead of:
const firstName = employeeWithInfo.firstName;

// we have the following:
// -- simple
const { firstName, lastName, jobTitle, office } = employeeWithInfo;
console.log(
  `${firstName} ${lastName} is a ${jobTitle} who works out of ${office}.`
); // Food for thought: WHY we don't need JSON.stringify() here???

// -- with default value (`employee` variable doesn't have jobTitle or office properties)
const {
  firstName,
  lastName,
  jobTitle = "Manulife employee",
  office = "500 King St Waterloo",
} = employee;
console.log(
  `${firstName} ${lastName} is a ${jobTitle} who works out of ${office}.`
);

--renaming;
const {
  firstName: first_name,
  lastName: last_name,
  jobTitle = "Manulife employee",
  office = "500 King St Waterloo",
} = employee;
console.log(
  `${first_name} ${last_name} is a ${jobTitle} who works out off ${office}.`
);

// -- renaming + default
const {
  firstName: first_name,
  lastName: last_name,
  jobTitle: job_title = "Manulife employee",
  office: office_address = "500 King St Waterloo",
} = employee;
console.log(
  `${first_name} ${last_name} is a ${job_title} who works out off ${office_address}.`
);

// -- overwriting properties
const updatedEmployee = {
  ...employeeWithInfo,
  office: "500 King St Waterloo, ON Canada",
}; // creates a new object
console.log("updatedEmployee: ", updatedEmployee);

console.log("\n==== Arrays ====");

const array1 = [1, 2, 3, 4];
// console.log(`Array 1: ${array1}`); // turns the array into a string because using string template literal notation
console.log("Array 1: ", array1); // use this notation instead

// Spread operator
const array2 = [0, ...array1, 5];
console.log("Array 2 - using spread operator): ", array2);

// Rest parameter
function sumTwo(n1, n2, ...rest) {
  console.log("\n---- rest parameter ----");
  console.log("n1: ", n1);
  console.log("n2: ", n2);
  console.log("rest: ", rest);
  return n1 + n2;
}

console.log(`sumTwo: ${sumTwo(...array1)}`);

console.log("\n==== Functions: Regular and Arrow Notation ====");

// regular function notation
function regularFunctionCalcArea(height, width) {
  return height * width;
}

console.log(`function - regular notation: ${regularFunctionCalcArea(3, 5)}`);

// arrow function notation - block body
const arrowFunctionCalcArea = (height, width) => {
  return height * width;
};

console.log(`function - arrow notation: ${arrowFunctionCalcArea(3, 5)}`);

// arrow function notation - concise body (one-line)
const arrowFunctionOneLineCalcArea = (height, width) => height * width;

console.log(
  `function - arrow one-line notation: ${arrowFunctionOneLineCalcArea(3, 5)}`
);

console.log("\n==== Array Methods ====");
console.log("Original array: ", array1);

// map
// with regular function notation:
// const array1_map = array1.map(function(value) {
//   return value * 2;
// });
const array1_map = array1.map((i) => i * 2); // arrow notation, more concise
console.log("Array 1 Map: ", array1_map);

// filter
const array1_filter = array1.filter((i) => i > 2);
console.log("Array 1 Filter: ", array1_filter);

// chained
console.log(
  "Array 1 Map + Filter Chained: ",
  array1.map((i) => i * 2).filter((i) => i > 2)
);
console.log("Array Unchanged: ", array1);

// find
// different from "filter", "find" returns the first value that matches from the collection. Once it matches the value in findings, it will not check the remaining values in the array collection
// filter will return an array
// find will return an element
const employees = [
  { id: 1, name: "Sanjay" },
  { id: 2, name: "Hai" },
  { id: 3, name: "Naveed" },
  { id: 1, name: "Junting" }, // add this for demoing difference b/w filter & find
];
console.log(
  "Array Find: ",
  employees.find((employee) => employee.id === 1)
); // { id: 1, name: "Sanjay"}

// push
employees.push({ id: 5, name: "Karina" });
console.log("Array Push: ", employees);

// reduce
// first let's go over a basic example of wanting to take the sum of all elements in an array. i.e. we want to *reduce* an array of multiple elements to one value.
const arrayToSum = [1, 2, 3, 4, 5];
let sum = 0;
for (let num of arrayToSum) {
  sum += num;
}
console.log(`Sum using for loop: ${sum}`);

/*
 - now let's convert that to the Array.reduce function
 - *reduce* an array of multiple elements to one value by summing up all the array element or concatenating for     non-numeric values
 - The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value
 - Takes a callback function and an initial value which can be a numeric number or an object
 - The reducer function takes four arguments:
			1. Accumulator
			2. Current Value
			3. Current Index
			4. Source Array
 - Your reducer function's returned value is assigned to the accumulator, whose value is remembered across each iteration throughout the array, and ultimately becomes the final, single resulting value
 - alternative to for loop
 */
const reducerFcn = (accumulator, currentNumber) => accumulator + currentNumber;
const sumUsingReduce = arrayToSum.reduce(reducerFcn, 0);
console.log(`Sum with Array Reduce: ${sumUsingReduce}`);

// optional depending on timing
// Using reduce to return an object: example: counting a tally of items in the collection
const fruitsBasket = [
  "banana",
  "cherry",
  "orange",
  "apple",
  "cherry",
  "orange",
  "apple",
  "banana",
  "cherry",
  "orange",
  "fig",
];

// we want: { banana: 2, cherry: 3, orange: 3, apple: 2, fig: 1 }

const counts = fruitsBasket.reduce((fruitCounts, fruit) => {
  fruitCounts[fruit] = (fruitCounts[fruit] || 0) + 1;
  return fruitCounts;
}, {});

console.log(`Fruits Basket Counts: `, counts);

console.log("\n==== Classes ====");

class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // getter, introduced ES6 specific, binds the object property to a function which will be called when the object is looked up.
  get area() {
    return this.height * this.width;
  }
}

const polygon = new Polygon(5, 4);
console.log(`Polygon class area: ${polygon.area}`);
//alternatively without getter, then invoke it as a function i.e. ploygon.area()
// console.log(`Polygon class area: ${polygon.area()}`);

// inheritance
class Square extends Polygon {
  constructor(length) {
    super(length, length);
  }
}

const square = new Square(3);
console.log(`Square class: ${square.area}`);

/* depending on timing, talk about import/export & babel */

// ++++++++++++++++++++++
//
//        PROMISE
//
// ++++++++++++++++++++++

console.log("\n==== Promises ====");
/* warm-up */
/* Step 1: create/initialize a promise with the pending state i.e. without resolve or reject
explain the 3 states: pending, resolved/fulfilled/rejected */
const promise = new Promise((resolve, reject) => {});
console.log(promise);

/* Step 2: resolve the promise wiht value */
const promise = new Promise((resolve, reject) => {
  resolve("promise resolved");
});
console.log(promise);

/* Step 3: resolve the promise with value with async simulation */
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("promise resolved"), 2000);
});

// After creating/initializing the promise we now need to comsume it. In reality it is much more common to consume promises than create them
promise.then((response) => {
  console.log(response);
});
console.log(
  "executing some other code while waiting for the promise to be resolved...."
);

/* ADVANCED with reject and within the function context i.e. promised based function */
/* Step 1: create the function which returns a promise */
function mySum(num1, num2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num1 == "number" && typeof num2 == "number") {
        resolve(num1 + num2);
      } else {
        reject("Please provide valid numbers");
      }
    }, 2000);
  });
}

/* Step 2: consume the promise, AGAIN, in reality it is much more common to consume promises than create them */
const myPromise = mySum(5, 10);
myPromise.then((result) => {
  console.log(`Promise result: ${result}`);
});
console.log("Promise function invoked");
console.log("executing other code in the meantime....");

/* Step 3: consume the chained promises with rejection by catching the error */
const myPromise = mySum(5, 10);
myPromise
  .then((result) => {
    console.log(`Promise result: ${result}`);
    return mySum(result, null);
  })
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
console.log("Promise function invoked");
console.log("executing other code in the meantime....");

// ++++++++++++++++++++++
//
//        Async/Await
//
// ++++++++++++++++++++++

/* We are leveraging the promised-based function mySum().... And we will ONLY focus consuming the promise */
console.log("\n==== Async/Await ====");
// Async/Await
async function myAsyncAwait() {
  try {
    const result = await mySum(5, 10);
    console.log(`Async/await result: ${result}`);
  } catch (err) {
    console.error(err);
  }
}
myAsyncAwait();
console.log("Async function invoked");
console.log("executing some other code in the meantime....");

// import node-fetch module (starting form Node v15 it's included??)
// A light-weight module that brings window.fetch to Node.js
const fetch = require("node-fetch");

// here is a list of public APIS: https://github.com/davemachado/public-api
const url = "http://jsonplaceholder.typicode.com/users/1";
// const url = 'http://dummy.restapiexample.com/api/v1/employee/1'

/* Fetch operation is a two-part process, and therefore requires chaining then. The fetch request is sent to the URL, which asynchronously waits for a response. The first then passes the response to an anonymous function that formats the response as JSON data, then passes the JSON representation of the data to a second then that logs the data to the console. The catch statement logs any error to the console */

console.log("1. start fetching the url...");
const myPromise = fetch(url);

myPromise
  .then((response) => {
    console.log("3. data fetched!");
    return response.json();
  })
  .then((data) => console.log("4. here is the data:", data))
  .catch((error) => console.log("3. error", error));

console.log("2. doing something else while waiting...");

// same thing now via the Async/Await apporach
async function myAsyncFunc() {
  try {
    console.log("1. start fetching the url...");
    const response = await fetch("url");
    console.log("3. data fetched!");
    const data = await response.json();
    console.log("4. here is the data:", data);
  } catch (error) {
    console.log("error:", error);
  }
}
myAsyncFunc();
console.log("2. doing something else while waiting...");
