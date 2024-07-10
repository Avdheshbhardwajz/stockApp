const crypto = require("crypto");

const args = process.argv.slice(2);

function calc(operation, num1, num2) {
  switch (operation) {
    case "add":
      return num1 + num2;
    case "sub":
      return num1 - num2;
    case "mult":
      return num1 * num2;
    case "mult":
      return num1 * num2;
    case "divide":
      return num1 / num2;
    case "sin":
      return Math.sin(num1);
    case "cos":
      return Math.coz(num1);
    case "tan":
      return Math.tan(num1);

    default:
      return "unknown operation";
  }
}

if (args.length < 1) {
  console.log(`usage : calculator <operation> <num1> <num2>`);
  process.exit(1);
}

const [operation, num1str, num2str] = args;
const num1 = parseFloat(num1str);
const num2 = num2str !== undefined ? parseFloat(num2str) : undefined;

if (operation === "random") {
  if (!num1str) {
    console.log("provide length for the random number generation");
    process.exit(1);
  }

  const length = num1;

  if (isNaN(length) || length <= 0) {
    console.log("Invalid length for random number generation.");
    process.exit(1);
  }

  const randomByte = crypto.randomBytes(length).toString("binary");
  console.log(`random number: ${randomByte} `);
  process.exit(0);
}

if (isNaN(num1) || (num2str !== undefined && isNaN(num2))) {
  console.log("Please provide valid numbers for the operation.");
  process.exit(1);
}

const result = calc(operation, num1, num2);
console.log(`Result: ${result}`);
