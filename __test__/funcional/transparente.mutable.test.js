/*
* Definición de reducer con transparencia referencial
* */
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