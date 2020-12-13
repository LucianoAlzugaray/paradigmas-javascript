/*
* Paradigma Funcional en JavaScript
* ----------------------------------
* */

// Intersección de dos arrays, versión procedural vs funcional.
function interseccionProcedural(a, b) {
    var result = [];

    for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                result.push(a[i]);
                break;
            }
        }
    }
    return result;
}

const interseccionFuncional = (a, b) => a.filter(value => b.indexOf(value) > -1);

test('debe retornar la intersección', () => {
    expect(interseccionProcedural([1, 2, 3], [2, 3])).toEqual([2, 3]);
    expect(interseccionFuncional([4, 5, 6], [4, 5])).toEqual([4, 5]);
});

describe('asd', () => {
    // Una función que retorna una función (usando bloques y retorno).
    const _fn = () => {
        return () => {
            return true;
        };
    };
    // La misma función usando retornos implícitos
    const fn = () => () => true;


    it('should be a function that returns a function', () => {
        expect(typeof fn).toBe('function');
        expect(typeof fn()).toBe('function');
    });
    it('should return a function that returns true', () => {
        expect(fn()()).toBe(true);
    });
});

test('asd2', () => {
    const sum3 = (x, y, z) => x + y + z;
    const sum3Curried = x => y => z => x + y + z;

    expect(sum3(1, 2, 3)).toEqual(sum3Curried(1)(2)(3));
});

test('promesas', () => {
    const _promise = canResolve => new Promise(
resolve => reject => canResolve ?
                resolve({code: 200, message: 'OK'}) :
                reject({code: 400, message: 'Bad Request'})
    );

    _promise(true)
       .then((args) => code => message => expect(code, message).toEqual({code: 200, message: 'OK'}))
       .catch((args) => code => message => expect(code, message).toEqual({code: 400, message: 'Bad Request'}));

    _promise(false)
       .then((args) => code => message => expect(code, message).toEqual({code: 200, message: 'OK'}))
       .catch((args) => code => message => expect(code, message).toEqual({code: 400, message: 'Bad Request'}));
});

test('Aplicación parcial', () => {

    const login = (user, email) => [...{
            user: user,
            email: email,
            password:password
    }];

    



});