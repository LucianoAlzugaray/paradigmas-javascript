// const sum3 = (x, y, z) => x + y + z;
// console.log(sum3(1, 2, 3); // 6
// const sum3Curried = x => y => z => x + y + z;
// console.log(sum3Curried(1)(2)(3)); // 6

// const curry = fn => (...xs) => (
//     (xs.length >= fn.length)
//         ? fn(...xs)
//         : curry(fn.bind(null, ...xs))
// );
const curry = fn => (...xs) => (
    (xs.length >= fn.length)
        ? fn(...xs)
        : curry(partial(fn, ...xs))
);

describe('curry', () => {
    it('should ...', () => {
        const sum3 = (x, y, z) => x + y + z;
        const curried = curry(sum3);
        const a= 1;
    });
});