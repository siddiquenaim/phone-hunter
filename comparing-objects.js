// function objectsEqual(obj1, obj2) {
//   return JSON.stringify(obj1) === JSON.stringify(obj2);
// }

// const x = { a: 1, b: 2 };
// const y = { b: 2, a: 1 };

// if (objectsEqual(x, y)) {
//   console.log("The objects are equal");
// } else {
//   console.log("The objects are not equal");
// }

function objectsEqual(obj1, obj2) {
  // Check if the two objects have the same number of properties
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // Check if each property in obj1 exists in obj2 and has the same value (recursive call)
  for (const prop in obj1) {
    if (!(prop in obj2) || !objectsEqual(obj1[prop], obj2[prop])) {
      return false;
    }
  }

  return true;
}

const x = { a: 1, b: 2 };
const y = { b: 2, a: 1 };

if (objectsEqual(x, y)) {
  console.log("The objects are equal");
} else {
  console.log("The objects are not equal");
}
