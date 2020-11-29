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


/**
 * Tipos de funciones. Tipos de retorno
 * ------------------------------------
 */

//
// Con el keyword `function`
//
// Declarando una función clásica "con nombre"
function double1(a) {
    return a * 2;
}
// Usando una expresión de función "con nombre"
const fn = function double2(a) {
    return a * 2;
};
// Usando una expresión de función "anónima"
const double3 = function (a) {
    return a * 2;
};
//
// Con funciones flecha (arrow functions)
//
// Con retorno explícito
const double4 = (a) => {
    return a * 2;
};
// Con retorno implícito y sin paréntesis opcionales en argumentos
// (ya que solo hay uno)
const double5 = a => a * 2;

test('Declaración de funciones', () => {
   expect(double1(2)).toBe(4);
   expect(fn(2)).toBe(4);
   expect(double3(2)).toBe(4);
   expect(double4(2)).toBe(4);
   expect(double5(2)).toBe(4);
});