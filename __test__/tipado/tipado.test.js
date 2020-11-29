

test('asd', () => {
    var foo = '5';
    expect(typeof parseInt(foo)).toEqual(typeof +foo);
    expect(typeof parseInt(foo)).toEqual(typeof(foo / 1));
   // typeof parseInt(foo) == typeof +foo;
// true

    // typeof parseInt(foo) == typeof(foo / 1);
});

test('', () => {
    var foo = '2';
    var bar = 1;

    expect(foo - bar).toEqual(1);
    expect(foo + bar).toEqual('21');

//     console.log(foo - bar);
// // 1
//     console.log(foo + bar);
// // '21'
});

test('', () => {
    var foo = 1;
    expect(typeof foo).toEqual('number');

    foo = 'cadena';
    expect(typeof foo).toEqual('string');
});

