function funcionQuePuedeFallar() {
    const error = Object.create(EvalError);
    throw error;
}
function funcionQuePuedeFallar2() {
    const asd = 1;
    throw EvalError;
}

test('asd', () => {
    expect({}).toEqual(new Object());
    expect({}).toEqual(Object.create(Object));


    // const myCar = {};
    // myCar.make = "Ford";
    // myCar.model = "Mustang";
});

test('', () => {

    const asd = 1;
    try {
        funcionQuePuedeFallar();
    } catch (e) {
        expect(e).toBeInstanceOf(EvalError);
    }

    try {
        funcionQuePuedeFallar2();
    }catch (e) {
        const err = e();
        expect(err).toBeInstanceOf(EvalError);
    }
});

test('', () => {

    try {
        const asd = 'asd';
        funcionQuePuedeFallar();
    } catch (e){
        const asd2 = 'asd';
        if (e instanceof EvalError) {
            console.error(e.name + ': ' + e.message);
        } else if (e instanceof RangeError) {
            console.error(e.name + ': ' + e.message);
        }
    }
});
