
test('asd', () => {
    const asd = {};
    const asd2 = Object.create(Object);
    const asd3 = new Object();
    const asd4 = function(){}

    expect(asd).toEqual(asd2);
    expect(asd).toEqual(asd3);
    expect(asd).toEqual(asd4);
});