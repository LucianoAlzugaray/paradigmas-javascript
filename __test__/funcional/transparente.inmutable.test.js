/*
*   Transparencia Referencial
*   -------------------------
* */

/*
* Transparencia Referencial e inmutabilidad
* -----------------------------------------
* */

const reducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        case 'DECREMENT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};

describe('reducer()', () => {
    it('should not be affected by previous call', () => {
        expect(reducer(undefined, { type: 'INCREMENT' })).toEqual({ count: 1 });
        expect(reducer(undefined, { type: 'INCREMENT' })).toEqual({ count: 1 });
        expect(reducer(undefined, { type: 'DECREMENT' })).toEqual({ count: -1 });
        expect(reducer({ count: 99 }, { type: 'INCREMENT' }))
            .toEqual({ count: 100 });
    });

    it('should handle increment and decrement actions without mutating state', () => {
        const state1 = reducer(undefined, { type: 'INCREMENT' });
        const state2 = reducer(state1, { type: 'INCREMENT' });
        const state3 = reducer(state2, { type: 'DECREMENT' });
        expect(state1).toEqual({ count: 1 });
        expect(state2).toEqual({ count: 2 });
        expect(state3).toEqual({ count: 1 });
        expect(state1).not.toBe(state2);
        expect(state1).not.toBe(state3);
        expect(state2).not.toBe(state3);
    });

    it('should return the state as it came in when unknown action', () => {
        const state = { count: 10 };
        expect(reducer(state, {})).toBe(state);
    });
});