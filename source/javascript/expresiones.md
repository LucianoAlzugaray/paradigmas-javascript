# Expresiones
Javascrit posee varios tipos de operadores, entre ellos tenemos operadores unarios, binarios y un único operador terciario.

## Operadores de asignación

Los operadores de asignación asigna un valor a su operando izquierdo basandose en el valor del operando derecho. Las operaciones pueden ser las siguientes:

**Asignación básica**: Asigna el valor computado del operador derecho al operador izquierdo. Esta operación tiene un valor de retorno que es el del valor derecho computado. En el siguiente ejemplo vemos el comportamiento de esta operación:

```javascript
// asigna a la variable foo la suma de dos más tres.
const foo = 2 + 3;

// Asigna a z el valor de la derecha del operador de asignación, en este caso, a z se le asigna 5 + 4.
const z = (x = 5 + 4)
```

**Asignación con operandos numéricos**:Luego, Para operandos numéricos, está la siguiente lista de operaciones:

- *Asignación de adición* (a += b)
- *Asignación de resta* (a -= b)
- *Asignación de multiplicación* (a *= b)
- *Asignación de división* (a /= b)
- *Asignación de residuo* (a %= b)
- *Asignación de exponenciación* (a **= b)
- *Asignación de desplazamiento a la izquierda* (a <<= b)
- *Asignación de desplazamiento a la derecha* (a >>= b)
- *Asignación de desplazamiento a la derecha sin signo* (a >>>= b)
- *Asignación AND bit a bit* (a &= b)
- *Asignación XOR bit a bit* (a ^= b)
- *Asignación OR bit a bit* (a |= b)

**Asignación con operandos lógicos**: Para operandos lógicos, las operaciones de asignación disponibles son:

- *Asignación AND lógico* (a &&= b)
- *Asignación OR lógico* (a ||= b)
- *Asignación de anulación lógica* (x ??= b)

**Desestructuración**: Para asignaciones de mayor complejidad, se puede utilizar la asignación desestructuración, la cual tiene como objetivo extraer datos de arreglos u objetos usando una sintaxis más parecida a la construcción de los mismos.

```javascript
const arreglo = ['uno', 'dos', 'tres'];

// sin desestructurar
var uno   = arreglo[0];
var dos   = arreglo[1];
var tres = arreglo[2];

// con desestructuración
var [uno, dos, tres] = arreglo;

const objeto = {nombre: 'Juan', apellido:'Gomez'};

//sin desestructurar
const nombre = objeto.nombre;
const apellido = objeto.apellido;

// Con desetructuración. nombre y apellido ahora son constantes con los valores Juan y Gomez.
const {nombre, apellido} = objeto;
```
## Operadores de comparación

Javascript te provee de la siguiente lista de operadores de comparación.

- *Igualdad* (==):	Devuelve true si los operandos son iguales.
- *Desigualdad* (!=): Devuelve true si los operandos no son iguales.
- *Igualdad estricta* (===): Devuelve true si los operandos son iguales y del mismo tipo.
- *Desigualdad estricta* (!==):	Devuelve true si los operandos son del mismo tipo pero no iguales, o son de diferente tipo.
- *Mayor que* (>)	Devuelve true si el operando izquierdo es mayor que el operando derecho.
- *Mayor o igual que* (>=)	Devuelve true si el operando izquierdo es mayor o igual que el operando derecho.
- *Menor que* (<): Devuelve true si el operando izquierdo es menor que el operando derecho.
- *Menor o igual* (<=)	Devuelve true si el operando izquierdo es menor o igual que el operando derecho.

## Operadores lógicos
Para los operadores lógicos, necesitamos conocer como javascript toma los valores verdaderos o falsos. Dentro de este lenguaje se maneja el concepto de truthy values o falsy values, ya que los operadores se manejan con este concepto.

Javascript puede realizar conversiones de valores de sus variables a un valor booleano, según si tienen los siguientes valores:

- undefined
- NaN
- null
- false
- "" (cadena vacia)
- 0 (0 es un alias de +0)
- -0
- 0n (de tipo BigInt)

Todos los valores anteriores se conocen como falsy values, lo que significa que si es evaluada en una expresión booleana, estos mismos serán tomados como valores falsos.

La siuguiente es una lista de los operadores lógicos disponibles en javascript:

- *AND Lógico* (&&): Operador binario que devuelve el primer operando si se puede convertir a false; de lo contrario, devuelve el segundo. Por lo tanto, cuando se usa con valores booleanos, && devuelve true si ambos operandos son true; de lo contrario, devuelve false.

- *OR lógico* (||): Operador binario que  devuelve el primer operando si se puede convertir a true; de lo contrario, devuelve el segundo. Por lo tanto, cuando se usa con valores booleanos, || devuelve true si alguno de los operandos es true; si ambos son falsos, devuelve false.

- *NOT lógico* (!): Operador unario que devuelve false si su único operando se puede convertir a true; de lo contrario, devuelve true.

## Operadores de cadena
Javascript soporta las siguientes operaciones de cadena:

- *Concatenación* (+) : Concatena la cadena del primer operando con la segunda.


- *Concatenación con asignación* (+=) : Concatena la cadena del primer operando con la segunda y guarda su resultado en el primer operando.

## Otros operadores

Javascript te provee algunos otros operadores para realizar distintas tareas especificas. Estos son:

*Operador condicional*: Es el único operador terciario de javascript. Su sintaxis es la siguiente

```javascript
condicion ? valor1 : valor2
```

Evalua la variable condición como un operador lógico, y devuelve valor1 en el caso que sea verdadero y valor2 en el caso contrario.

*delete*: Operador unario que elimina una propiedad de un objeto. Ejemplos de uso son:

```javascript
delete objeto.propiedad;
delete objeto[clave];
delete arreglo[indice];
delete property;
```

*typeof*: El operador typeof devuelve una cadena que indica el tipo de operando no evaluado. En el ejemplo siguientes se puede observar su funcionamiento:


```javascript
var miFuncion = new Function('5 + 2');
var figura = 'circulo';
var tamanio = 1;
var arreglo = ['Apple', 'Mango', 'Orange'];
var hoy = new Date();

typeof miFuncion;       // devuelve "function"
typeof figura;          // devuelve "string"
typeof tamanio;         // devuelve "number"
typeof arreglo;         // devuelve "object"
typeof hoy;             // devuelve "object"
typeof noEstaDeclarado; // devuelve "undefined"
```

## Precedencia de operadores
Javascript respeta la siguiente precedencia de operadores, teniendo como prioridad los operadores en el orden de esta lsita de arriba a abajo.

|  Tipo de operador |  Operadores individuales | 
|-------------------|--------------------------|
| miembro	        |           . []           |
| llamar / crear instancia | () new |
| negación / incremento | ! ~ - + ++ -- typeof void delete |
| multiplicar / dividir | * / % |
| adición / sustracción | + - |
| desplazamiento bit a bit | << >> >>> |
| relacional | < <= > >= in instanceof |
| igualdad | == != === !== |
| AND bit a bit | & |
| XOR bit a bit | ^ |
| OR bit a bit | | |
| AND lógico | && |
| OR lógico | \|\| |
| condicional	| ?: |
| asignación | = += -= *= /= %= <<= >>= >>>= &= ^= \|= &&= \|\|= ??= |
| coma | , |

## Evaluación de cortocircuito

Debido a que las expresiones lógicas se evalúan de izquierda a derecha, se prueban para una posible evaluación de "cortocircuito" utilizando las siguientes reglas:

- false && expresion se evalúa en cortocircuito como false.
- true || expresion se evalúa en cortocircuito como true.

Este comportamiento puede dar como resultado lógicas como la siguiente:

```javascript
let edad = 20;

function puedeVotar() {
    console.log();
}

edad >= 18 && puedeVotar()
```
El ejemplo anterior ejecuta la funcion puedeVotar solo si la variable edad es mayor a 18. Si es 20, ejecuta la función, pero en cambio, si es por ejemplo 16, la evaluación de cortocircuito corta  al devolver falso y no ejecuta jamas la funcion puedeVotar.