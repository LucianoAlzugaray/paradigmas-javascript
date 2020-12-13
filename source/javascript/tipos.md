# Tipos de Datos

Javascript es un lenguaje de tipado dinámico y debilmente tipado. Esto significa, en la declaración de sus variables no se necesita proveer el tipo de la creación, y luego puede cambiar el tipo de acuerdo al contenido de las variables, pudiendo reasignar a una variable de un tipo un valor de otro tipo, cambiando así el tipo de la misma.

```javascript

let variable = 42;    // variable ahora es un número
variable     = 'bar'; // variable ahora es un string
variable     = true;  // variable ahora es un booleano

```

El último estandar de ECMAScript define nueve tipos de datos, los cual enumeraremos a continuación:

Seis tipos de datos primitivos, controlados por el operador typeof
- **Undefined**: typeof instance === "undefined"
- **Boolean**: typeof instance === "boolean"
- **Number**: typeof instance === "number"
- **String**: typeof instance === "string"
- **BigInt**: typeof instance === "bigint"
- **Symbol**: typeof instance === "symbol"

El tipo de dato Null. Tipo primitivo especial que tiene un uso adicional para su valor: si el objeto no se hereda, se muestra null.

El tipo de dato Object: Tipo estructural especial que no es de datos pero para cualquier instancia de objeto construido que también se utiliza como estructuras de datos: new Object, new Array, new Map, new Set, new WeakMap, new WeakSet, new Date y casi todo lo hecho con la palabra clave new.

El tipo de dato Function: una estructura sin datos, aunque también responde al operador typeof: typeof instance === "function". Esta simplemente es una forma abreviada para funciones, aunque cada constructor de funciones se deriva del constructor Object.

## Valores primitivos

Ahora vamos a dar una explicación un poco más extensa del comportamiento de los distintos tipos de datos primitivos:

**Boolean**: Representa una valor lógico y puede tener dos valores: true y false.

**Null**: Tiene exactamente un valor: null

**Undefined**: Una variable a la que no se le ha asignado un valor tiene el valor undefined

**Number**: ECMAScript define dos tipos numéricos integrados dentro de este tipo: Number y BigInt.

El tipo Number es un valor en formato binario de 64 bits de doble precisión IEEE 754 (números entre -(253 - 1) y 253 - 1). Además de representar números de punto flotante, el tipo Number tiene tres valores simbólicos: +Infinity, -Infinity y NaN ("Not a Number" o su traducción, no es un número).

En este tipo, el valor 0 tiene dos representaciones: +0 y -0. Cuando uno asigna 0 a una variable sin signo, 0 se reconoce como un alias de +0.

El tipo BigInt es un primitivo numérico en JavaScript que puede representar números enteros con precisión arbitraria. Con BigInts, puedes almacenar y operar de forma segura en números enteros grandes incluso más allá del límite seguro de enteros para Numbers.

Un BigInt se crea agregando n al final de un número entero o llamando al constructor.

**String**: El tipo String de JavaScript se utiliza para representar datos textuales. Es un conjunto de "elementos" de valores enteros sin signo de 16 bits. Cada elemento del String ocupa una posición en la cadena. El primer elemento está en el índice 0, el siguiente en el índice 1, y así sucesivamente. La longitud de una cadena es el número de elementos que contiene.

A diferencia de algunos lenguajes de programación, las cadenas de JavaScript son inmutables. Esto significa que una vez que se crea una cadena, no es posible modificarla.

**Symbol**: Un símbolo es un valor primitivo único e inmutable y se puede utilizar como clave de una propiedad de objeto.