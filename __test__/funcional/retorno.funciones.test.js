const fn = () => {
    return () => {
        return true;
    };
};
// La misma función usando retornos implícitos
const fn2 = () => () => true;

describe('fn', () => {
    it('should be a function that returns a function', () => {
        expect(typeof fn).toBe('function');
        expect(typeof fn2()).toBe('function');
    });
    it('should return a function that returns true', () => {
        expect(fn()()).toBe(true);
    });
});

// // Sin aplicación parcial
// const greet = (greeting, name) => `${greeting}, ${name}`;
// // Usando aplicación parcial para fijar el primer argumento
// const greetPart = greeting => name => `${greeting}, ${name}`;
// const greetHello = greetPart('Hello');
// greetHello('Heidi') // => 'Hello, Heidi'
//
// // Recibe la función a la que le queremos "aplicar" argumentos
// // y los argumentos que queremos "aplicar".
// const partial = (fun, ...args) =>
//     (...newArgs) => fun(...args.concat(newArgs));
// // Una función genérica que recibe varios argumentos
// const greeter = (greeting, separator, emphasis, name) =>
//     `${greeting}${separator}${name}${emphasis}`;
// // Creamos una nueva función con los primeros 3 argumentos aplicados
// const greetHello = partial(greeter, 'Hello', ', ', '.');
// // Invocamos la función parcialmente aplicada pasando el último
// // argumento.
// greetHello('Heidi');
// // => 'Hello, Heidi.'

const toUpper = str => str.toUpperCase();
const replaceSpacesWithDashes = str => str.replace(/\s/g, '-');
const addBox = str => [
    '-'.repeat(str.length + 4),
    `| ${str} |`,
    '-'.repeat(str.length + 4),
].join('\n');

test('Add box', () => {
    console.log(
        addBox(
            replaceSpacesWithDashes(
                toUpper('hello world')
            )
        )
    );
});

const processString = str => addBox(
    replaceSpacesWithDashes(
        toUpper('hello world')
    )
);

const compose =
    (...fns) =>
        (...args) =>
            fns.slice(0, -1).reverse().reduce(
                (memo, fn) => fn(memo),
                fns[fns.length - 1](...args),
            );




test('asd', () => {
    const composed = compose(addBox, replaceSpacesWithDashes, toUpper);
    console.log(composed('hello world'));
});
