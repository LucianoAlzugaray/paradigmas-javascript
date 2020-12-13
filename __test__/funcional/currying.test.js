// const sum3 = (x, y, z) => x + y + z;
// console.log(sum3(1, 2, 3); // 6
// const sum3Curried = x => y => z => x + y + z;
// console.log(sum3Curried(1)(2)(3)); // 6

// const curry = fn => (...xs) => (
//     (xs.length >= fn.length)
//         ? fn(...xs)
//         : curry(fn.bind(null, ...xs))
// );

describe('fn', () => {
    const fn = () => () => true;
    it('should be a function that returns a function', () => {
        expect(typeof fn).toBe('function');
        expect(typeof fn()).toBe('function');
    });
    it('should return a function that returns true', () => {
        expect(fn()()).toBe(true);
    });
});

describe('curry', () => {
    it('should ...', () => {
        const partial = (fun, ...args) =>
            (...newArgs) => fun(...args.concat(newArgs));

        const curry = fn => (...xs) => (
            (xs.length >= fn.length)
                ? fn(...xs)
                : curry(partial(fn, ...xs))
        );

        const sum3 = (x, y, z) => x + y + z;
        const curried = curry(sum3(1, 2, 3));
        const a= 1;

    });
});