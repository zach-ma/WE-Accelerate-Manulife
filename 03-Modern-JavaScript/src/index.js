console.log("Hello World!");
console.log("\n***** Variable Declaration & Scope *****");
console.log("\n** var **");

function variableTest() {
  var x = 1;
  console.log("var x - initial:", x);
  if (x === 1) {
    // let x = 2;
    // const x = 2;
    var x = 2; // orgininal will be overwritten
    console.log("var x - inside if block:", x);
  }
  //   x = 3;
  console.log("var x - outside if block:", x);
}
variableTest();

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
