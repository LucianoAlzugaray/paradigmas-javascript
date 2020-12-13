/*
* Definición de reducer con transparencia referencial
*
* Ref: MONTERO, Lupo. "Introducción a programación funcional en JavaScript". Medium. Jul. 2018
* @href: https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-2-funciones-puras-b99e08c2895d
*
* * */
const reducer = (state = { count: 0 }, action) => {
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
    it('should not be affected by previous calls', () => {
        expect(reducer(undefined, { type: 'INCREMENT' })).toEqual({ count: 1 });
        expect(reducer(undefined, { type: 'INCREMENT' })).toEqual({ count: 1 });
        expect(reducer(undefined, { type: 'DECREMENT' })).toEqual({ count: -1 });
    });

    it('should handle increment action', () => {
        const state1 = reducer(undefined, { type: 'INCREMENT' });
        const state2 = reducer(state1, { type: 'INCREMENT' });
        // Todas las referencias a state apuntan al mismo objeto que
        // hemos ido mutando!!!
        expect(state1).toEqual({ count: 2 });
        expect(state2).toEqual({ count: 2 });
        expect(state1).toBe(state2);
    });
});