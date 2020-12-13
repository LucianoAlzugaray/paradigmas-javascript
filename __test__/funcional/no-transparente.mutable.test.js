/*
* Definición de reducer que no garantiza transparencia referencial.
* El resultado depende de su historia de invocaciones
*
* Ref: MONTERO, Lupo. "Introducción a programación funcional en JavaScript". Medium. Jul. 2018
* @href: https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-2-funciones-puras-b99e08c2895d
*
* */
const state = { count: 0 };

const reducer = (action) => {
    switch (action.type) {
        case 'INCREMENT':
            state.count++;
            break;
        case 'DECREMENT':
            state.count--;
            break;
    }
    return state;
};

describe('reducer()', () => {
    it('should handle increment and decrement actions', () => {
        expect(reducer({ type: 'INCREMENT' })).toEqual({ count: 1 });
        expect(reducer({ type: 'INCREMENT' })).toEqual({ count: 2 });
        expect(reducer({ type: 'DECREMENT' })).toEqual({ count: 1 });
    });

    it('should depend on prevous invocations (history) - unpredictable!', () => {
        // El estado va a depender de si se ha ejecutado el test
        // anterior o no!!
        expect(reducer({ type: 'INCREMENT' })).toEqual({ count: 2 });
    });
});