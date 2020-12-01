const { expect, it } = require('@jest/globals');

describe('Asignaciones', () => {
    it('Debe asignarse una variable en valor en otro', () => {
        let a = 4;
        a = 3;
        expect(a).toBe(3);
    });

    it('Debe asignarse en cadena', () => {
        let a,b,c;
        a = 4;
        b = 5;
        c = 9;

        a = b = c;
        expect(a).toBe(c);
    });

    it('Debe asignarse con un incremento', () => {
        let a = 5;
        let b = 9;
        a += b;
        expect(a).toBe(14);
    });


    it('Debe asignarse un array desestructurado', () => {
        let a = ['primero', 'segundo'];

        const [primero, segundo] = a;

        expect(primero).toBe('primero');
        expect(segundo).toBe('segundo');
    });
});


describe('Operadores lógicos', () => {
    it('Los valores son falsy', () => {
        let a = undefined;
        let b = NaN;
        let c = null;
        let d = "";
        let e = 0;

        expect(a).toBeFalsy();
        expect(b).toBeFalsy();
        expect(c).toBeFalsy();
        expect(d).toBeFalsy();
        expect(e).toBeFalsy();
    });

    it('Los operadores lógicos devuelven el segundo valor', () => {
        const a = false || 'a';
        const b = true && 'b';

        expect(a).toBe('a');
        expect(b).toBe('b');
    });

    it('Los operadores lógicos cortan en cortocircuito', () => {
        let a_externo = false;
        let b_externo = false;
        let c_externo = false;
        let d_externo = false;
        
        const cambiarAVerdaderoA = () => {
            a_externo = true;
        }

        const cambiarAVerdaderoB = () => {
            b_externo = true;
        } 

        const cambiarAVerdaderoC = () => {
            c_externo = true;
        }

        const cambiarAVerdaderoD = () => {
            d_externo = true;
        }

        const a = true || cambiarAVerdaderoA();
        const b = false && cambiarAVerdaderoB();
        const c = false || cambiarAVerdaderoC();
        const d = true && cambiarAVerdaderoD();

        expect(a_externo).toBe(false);
        expect(b_externo).toBe(false);
        expect(c_externo).toBe(true);
        expect(d_externo).toBe(true);
    });
});
