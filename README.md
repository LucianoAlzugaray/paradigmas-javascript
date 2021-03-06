# Trabajo de Investigación - JavaScript

**Profesores**
-	Lic. Romina Stickar
-	Lic. Lautaro Pecile

**Alumnos**
-	Luciano Alzugaray
-	Lucas Krmpotic


## Introducción
Este documento es el resultado de una investigación propuesta por la cátedra *Paradigmas y Lenguajes de Programación* sobre un lenguaje de programación y sus caracteristicas. 

El objetivo de este trabajo es elegir un lenguaje, en este caso *JavaScript*, investigar algunos aspectos estudiados en la cátedra sobre el mismo, y desarrollar un informe.

## Breve historia del lenguaje
JavaScript surgió como un lenguaje enteramente destinado a la web. A mediados de los '90 comenzaban a desarrollarse las primeras aplicaciones web con la incorporación de formularios relativamente complejos. 

Sin embargo la velocidad promedio de los modems con los que se conectaban los usuarios, no superaba los 28.8 kbps. Por ello las compañías proveedoras de navegadores, comenzaron a trabajar sobre alternativas basadas en la ejecución de código en el navegador. 

Así fue como Netscape, de la mano de Brendan Eich, incluyó la primera versión el intérprete de LiveScript, luego rebautizado por Sun Microsystems como JavaScript. 

Poco tiempo después Microsoft lanzó Internet Explorer 3 que incluía un intérprete de JScript, que fue considerado una copia de JavaScript por buena parte de la industria. Debido a ello, en búsqueda de la estandarización del lenguaje, NetScape envió las especificaciones de JavScript 1.1 a la European Computer Manufacturers Association (ECMA). La ECMA creó el comité TC39 con el objetivo de "estandarizar de un lenguaje de script multiplataforma e independiente de cualquier empresa". 

Poco tiempo después vió la luz el primer estándar internacional de JavaScript, el ECMA-262, que fue incorporado por la ISO en la norma ISO/IEC-16262. 

Hoy, a 25 años de su surgimiento, JavaScript se ha convertido en un lenguaje de programación multipropósito. No solo ha crecido exponencialmente su potencia del lado del navegador, sino que ha migrado al servidor constituyendo una solución interesante para aplicaciones de entrada/salida intensivas gracias a las bondades del event loop. Además desde hace varios años es fuertemente utilizado para la construcción de aplicaciones móviles híbridas e incluso aplicaciones desktop de la mano de frameworks como ElectronJs entre otros.     
 

## Paradigma

Javascript es un lenguaje multiparadigma. Admite tanto la implementación de programas basados en el paradigma Orientado a Objetos como en el paradigma Funcional. Sin embargo no es posible hablar de una implementación pura de ninguno de ellos. 

Si bien es cierto que JavaScript puede utilizarse como lenguaje procedural y de scripting, creemos que son el paradigma Funcional y el Orientado a Objetos los que se destacan en el diseño actual del lenguaje y por lo tanto los que más vale la pena analizar en este breve trabajo.
De hecho los frameworks más populares para la construcción de aplicaciones frontend en JavaScript, Angular y React, han sido desarrollados precisamente en base a los paradigmas Orientado a Objetos y Funcional respectivamente.   

En los próximos apartados analizaremos cada uno de estos paradigmas en JavaScript, poniendo énfasis en ejemplificar su implementación por un lado y mencionar los aspectos que lo alejan de las implementaciones puras por otro.

### Paradigma Funcional
Para analizar la escritura de programas funcionales en JavaScript nos apoyaremos en *Lupo Montero* y su serie [Introducción a la Programación Funcional en JavaScript]('https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-2-funciones-puras-b99e08c2895d'). 
En el directorio `__test__/funcional` se proporcionan varios casos de prueba propuestos por el autor (mas unos pocos propios) que acompañan los siguientes párrafos.

Un ejemplo simple de sintaxis procedural vs. funcional en Javascript. Construcción de la función intersección procedural y funcionalmente.

**Procedural**
```javascript
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
```

**Funcional**
```javascript
const interseccionFuncional = (a, b) => a.filter(value => b.indexOf(value) > -1);
``` 
En los siguientes apartados se analizan las características principales del paradigma funcional y su implementación en JavaScript.  

#### Semántica de valores
Como veremos en apartados posteriores, JavaScript no solo soporta asignación de variables sino que además delega en el programador el cuidado de efectos colaterales derivados de la cuestión del *scope*.
En este sentido se aparta notablemente de lenguajes funcionales puros. 

Sin embargo también es cierto que desde hace varios años tanto desde quienes mantienen el lenguaje en sí como desde la comunidad, vienen creciendo herramientas, prácticas y patrones para favorecer la inmutabilidad. Como referencia podemos mencionar al popular patrón Redux y a la incorporación de la sintaxis de des estructuración de objetos, que resulta central para lograr inmutabilidad y semántica de valores en la composición de funciones. 

#### Transparencia Referencial

Garantizar transparencia referencial en JavaScript es responsabilidad del programador. En definitiva se trata de evitar el uso de nombres declarados fuera del ámbito de la función, para garantizar la ausencia de efectos colaterales. 

En la medida en que el lenguaje soporta asignación, el uso de variables declaradas fuera del ámbito de la función, en tanto referencias a locaciones de memoria, rompe la transparencia referencial, ya que la imagen de la función deja de estar completamente determinada por los parámetros de la invocación.

El efecto resultante es que el valor al que se ligará la función deja de ser predecible y por lo tanto testeable. El ejemplo típico es el de una función cuyo valor de retorno varía en función del historial de invocaciones, o con dependencia de la invocación previa de otra función.

Respecto del tema de la Transparencia Referencial Montero propone el recorrido de un reducer sin transparencia referencial ni inmutabilidad del estado hacia uno transparente y con estado inmutable.

Así, como se puede apreciar ejecutando el test `no-transparente.mutable.test.js`, la definición inicial de la función reducer, no garantiza transparencia referencial en tanto su imagen depende del valor de `state`.

```javascript
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
```

Así el test `should depend on prevous invocations (history) - unpredictable!` falla o pasa dependiendo de si fue o no ejecutado el test previo.

Para resolver el problema de la dependencia del historial de invocaciones, se introduce  `state` como párametro de invocación. 

```javascript
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
```
Esta segunda versión del reducer garantiza que la imagen de la función está completamente determinada por los parámetros de invocación, sin embargo modifica la variable `state` rompiendo la inmutabilidad. 

El ejemplo que elige Lupo Montero es la implementación típica del patrón `Redux` para aplicaciones frontend JavaScript.

#### Composición de funciones

##### Funciones de órden superior

> "Las funciones que tienen parámetros que son funciones o
que producen un resultado que es una función se llaman
funciones de orden superior" - *LPyL, apunte de cátedra 2018 Prof: Lic. Romina Stickar*

En JavaScript es típico recibir y/o retornar funciones. El caso de las promesas resulta un ejemplo apropiado. La definición de una promesa tiene la siguiente estructura:

```javascript
// Definicion de la promesa
new Promise(
    resolve => resolve('Success')
).then(
    message => `Message is: ${message}`
);
```

Una promesa naturalmente puede recibir una segunda función como argumento para resolver el caso de error.
```javascript
// Definicion de la promesa
const _promise = new Promise(
    (resolve, reject) => 
            flag ? resolve('Success') : reject('Error') 
);

_promise(true)
    .then(message => `Message is: ${message}`)
    .catch(message => `Error message is: ${message}`);
```

Como vemos, el lenguaje brinda una sintaxis muy práctica para la definición de funciones de órden superior. 

Un ejemplo un poco mas avanzado con promesas y aplicación parcial:

```javascript
test('promesas', () => {
    const _promise = canResolve => new Promise(
        resolve => reject => canResolve ?
            resolve({code: 200, message: 'OK'}) :
            reject({code: 400, message: 'Bad Request'})
    );

    _promise(true)
        .then(
            args => code => message => 
                expect(code, message).toEqual({code: 200, message: 'OK'})
        ).catch(
            args => code => message => 
                expect(code, message).toEqual({code: 400, message: 'Bad Request'})
        );
});
```

La sintaxis de funciones en JavaScript nos provee herramientas para facilitar el uso de la *aplicación parcial*

##### Aplicación parcial

La *aplicación parcial* es un mecanismo refactorización de una función de *n* argumentos en *n* funciones de un argumento. El uso de la aplicación parcial permite extender funcionalidad fijando uno o algunos de los argumentos de la función original.



##### Currying
Para concluir, no podemos dejar de mencionar currying, que consiste en reemplazar una función que toma varios argumentos con una secuencia de funciones, cada una con un solo argumento. Podríamos decir que el currying es un caso de aplicación parcial en el que siempre rompemos todos los argumentos en una cadena de invocaciones, uno por uno, mientras que en la aplicación parcial normalmente solo fijamos el primer argumento, o un número fijo. Se trata de mecanismos similares pero sutilmente distintos.


### Paradigma Orientado a Objetos
#### Requerimientos mínimos
* Oscurecimiento de la información
* Abstracción de datos
* Clasificación (Herencia - Relación)
* Polimorfismo y Vinculación Dinámica.

#### Oscurecimiento de la información
* El estado interno de un objeto solo puede ser accedido y modificado como
respuesta a un mensaje.

* La representación física de cada clase y la implementación de las operaciones,
no es visible desde el exterior y por lo tanto puede ser modificada sin alterar el
resto de las clases.

#### Abstracción de datos
* Una clase define un patrón de comportamiento a partir del cual es posible
crear varias instancias

#### Clasificacion - herencia


new vs Object.create
Object.create crea un nuevo objeto vacío y además le asigna a este el prototipo que nosotros querramos, si le pasamos un argumento, sino le asigna Object como prototipo
new en cambio, es una llamada a una función constructora (ó Factory Function), la cual también puede recibir argumentos, pero en este caso son para setear otras propiedades del objeto y no su prototipo
En este caso, el prototipo del nuevo objeto se obtiene a partir de la propiedad prototipe (objeto) de la función, a la cual se setea una referencia en la propiedad __proto__ del nuevo objeto
Por último, con Object.create podemos crear un objeto que no herede de nadie (no tenga prototipo), usando Object.create(null); mientras que, si seteamos SomeConstructor.prototype = null, el nuevo objeto va a heredar de Object.prototype

#### Polimorfismo


## Criterios de Evaluación

## Tipado

Javascript es un lenguaje **débilmente tipado**, y de **tipado dinámico**, lo cual lo hace súmamente flexible pero muy inseguro. Además, algunas características particulares, que se detallan en otros apartados y que producen que las variables se liguen a valores inesperados, imponen fuertes dificultades para el *debugging* sobre todo de aplicaciones front-end. A raíz de esto es que desde hace tiempo vienen surgiendo herramientas para apoyar a los programadores en la detección de errores en código que corre en los navegadores. 

El estándar EcmaScript 6 a incluído avances importantes en este sentido como la posibilidad de declarar constantes y de limitar el scope de las variables declarandolas con **let** en lugar de **var**. A su vez los frameworks intentan aportar lo propio ofreciendo arquitecturas probadas. Incluso ha surgido TypeScript, un superconjunto de JavaScript, que incorpora la posibilidad de declarar (y por lo tanto detectar errores de) tipos de variables. TypeScript se basa en un "transpilador" que interfacea entre la sintaxis de éste pseudolenguaje y la sintáxis propia del estándar EcmaScript 6. 

Si bien este trabajo no ahondará demasiado en esto, nos parecía fundamental mencionarlo ya que es justamente su sistema de tipos lo que ha sido más masivamente criticado en JavaScript.

### Débilmente Tipado

Tal como surge de los apuntes de cátedra la difefencia central entre un lenguaje con tipado débil y uno con tipado fuerte es la necesidad o no de utilizar reglas de conversión explícitas en las expresiones con operaciones que involucran distintos tipos de datos.

Por supuesto que JavaScript tiene reglas explícitas de conversión de tipos, pero también, como todo lenguaje de tipado débil, aplica reglas de equivalencia y coerción. Para ello se basa en los operadores de la expresión que brindan el contexto a partir del cual se resuelve la conversión de tipos.

```javascript
var foo = '5'; 
typeof parseInt(foo) == typeof +foo;
// true 

typeof parseInt(foo) == typeof(foo / 1))
//true
```
Como vemos el operador es el que le permite a JavaScript determinar la conversión correcta.

Es interesante el caso del primer ejemplo, ya que es el operador unario **"+"** el que está generando la conversión del tipo string a int, sin embargo esto requiere tener presente la cuestión de la sobrecarga de operadores. Ya que si hay un operador sobrecargado en varios lenguajes de programación, es el viejo y querido **"+"**. En el siguiente ejemplo se puede ver los problemas que puede traer el no tener en cuenta la sobrecarga de operadores.

```javascript
var foo = '2';
var bar = 1;

console.log(foo - bar);
// 1 
console.log(foo + bar);
// '21'
```
En efecto, la sobrecarga de **"+"** como operador aritmético y de concatenación de strings genera que en un caso *foo* sea casteada a int, mientras que en el otro *bar* sea casteada a string. Por lo tanto se impone la necesidad de cuidados adicionales a la hora de trabajar con coerción de tipos en JavaScript.

### Tipado Dinámico. 

En JavaScript la vinculación o ligadura de una variable con su tipo se da en *runtime* y puede cambiar durante la ejecución del programa. Esto en cierta bibliografía se explica como que el tipo está ligado al *valor* de la variable y no a la variable como concepto de locación de celda de memoria.

```javascript
var foo = 1;
typeof foo; 
// 'number'

foo = 'cadena';
typeof foo; 
// 'string'
```
Además JavaScript incorpora el valor *"undefined"* para las variables declaradas pero no ligadas a ningún valor. 

El valor *"undefined"* también se retorna al preguntar por el tipo de una variable no ligada a un valor. 

Es decir:

```javascript
var foo;
console.log(foo); 
// 'undefined'

typeof foo; 
// 'undefined'
```

Nos parece pertinente una referencia mas sobre la función *typeof* y su relación con las variables globales y las ligaduras de tipos en JavaScript. 

Debido a que el lenguaje surgió, como ya se dijo, para brindar dinamismo a las páginas web, desde sus inicios los programas escritos en él se caracterizaron por trabajar mucho con variables globales (muchas que identificaban especificidades de los navergdores). Si bién esto ha mejorado mucho por ejemplo con la incorporación en el estándar EcmaScript 6 de la posibilidad de declarar **constantes**, sigue siendo frecuente que los programadores de librerías o módulos deban manipular variables que no fueron declaradas por ellos mismos. 

Por todo esto la función *typeof* incorpora un comportamiento particular para incorporar mayor seguridad ante posibles referencias a variables no declaradas: 

```javascript
if (foo) {
    console.log("hacer algo")
} else {
    console.log("hacer otra cosa")
}
// ReferenceError: foo is not defined
``` 

Sin embargo *typeof* brinda una solución posible al retornar *"undefined"* aún en caso de que la variable no esté declarada:

```javascript
if (typeof foo != "undefined") {
    console.log("hacer algo")
} else {
    console.log("hacer otra cosa")
}
// 'hacer otra cosa'
```

### Alcance de una variable

El *scope* en JavaScript también ha sido otro de los aspectos que contribuyó a la inseguridad o la poca confiabilidad del lenguaje. 

Por ser un tema tan amplio no será posible ahondar demasiado en este trabajo. No obstante es interesante mencionar el avance que significó la incorporación del calificador **let** en el estándar EcmaScript 6.

También hablaremos de las *funciones anónimas autoejecutables* como forma de aislar el scope de una unidad determinada. Sin embargo este tema si bien guarda relación con el scope lo abordaremos en el apartado referido al pasaje de parámetros por razones que allí se explicarán.


#### La incorporación de "let"
Antes de la aparición del nuevo estándar JavaScript permitía cosas como esta:

```javascript
// el calificador "var" no es necesario pero ilustra mejor este ejemplo
for (var i = 0; i<10; i++) {
    //hacer algo
}
console.log(i);
// 10
```
Es decir que toda variable declarada dentro de un bloque quedaba automáticamente referenciable desde fuera de él. 

Nótese además que el valor de **i** es el 10, es decir que el último incremento se produjo igual, aunque las sentencias correspondientes a ese valor no se ejecutaron por la condicion *i < 10*.

Obviamente esto trajo no solo problemas sino el fomento de malas prácticas de programación. 

Para solucionar esto, EcmaScript 6 incorporó el calificador **let** que permite limitar el scope de una variable al ámbito de un bloque en particular. Entonces:

```javascript
// ahora con let
for (let i = 0; i<10; i++) {
    //hacer algo
}
console.log(i);
// ReferenceError: i is not defined
```

## Expresiones
Javascrit posee varios tipos de operadores, entre ellos tenemos operadores unarios, binarios y un único operador terciario.

#### Operadores de asignación

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
#### Operadores de comparación

Javascript te provee de la siguiente lista de operadores de comparación. 

- *Igualdad* (==):	Devuelve true si los operandos son iguales.
- *Desigualdad* (!=): Devuelve true si los operandos no son iguales.
- *Igualdad estricta* (===): Devuelve true si los operandos son iguales y del mismo tipo. 
- *Desigualdad estricta* (!==):	Devuelve true si los operandos son del mismo tipo pero no iguales, o son de diferente tipo.	
- *Mayor que* (>)	Devuelve true si el operando izquierdo es mayor que el operando derecho.	
- *Mayor o igual que* (>=)	Devuelve true si el operando izquierdo es mayor o igual que el operando derecho.
- *Menor que* (<): Devuelve true si el operando izquierdo es menor que el operando derecho.	
- *Menor o igual* (<=)	Devuelve true si el operando izquierdo es menor o igual que el operando derecho.

#### Operadores lógicos
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

#### Operadores de cadena
Javascript soporta las siguientes operaciones de cadena:

- *Concatenación* (+) : Concatena la cadena del primer operando con la segunda.


- *Concatenación con asignación* (+=) : Concatena la cadena del primer operando con la segunda y guarda su resultado en el primer operando.

#### Otros operadores

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

#### Precedencia de operadores
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

#### Evaluación de cortocircuito

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

## Tipos de Datos

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

#### Valores primitivos

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

## Estructuras de control
Javascript utiliza algunas estructuras para mantener el flujo de control de su aplicación. A continuación ampliaremos cuales son y como es su aplicación

#### Bloque
El bloque se utiliza  para agrupar 0 o más sentencias. Se define por llaves como sigue:

```javascript 
{
    sentencia1;
    sentencia2;
    ....
    sentenciaN;
}
```
Este se utiliza para indicar a las otras siguientes sentencias que veremos donde inicia, ya que lo que toman las sentencias de control es la siguiente sentencia inmediata, y al ser un bloque, se ejecuta completo.

#### Instrucciones de interrupción de ejecución

Javascript tiene tres sentencias para interrumpir la ejecución de un bloque. Las instrucciones son las siguientes:

- **break**: Finaliza la sentencia actual loop, switch, o label y transfiere el control del programa a la siguiente sentencia de la sentencia finalizada
- **continue**: Finaliza la ejecucion de las sentencias dentro de la iteracion actual del actual bucle,  y continua la ejecucion del bucle con la siguiente iteracion
- **throw**: Lanza una excepción definida por el usuario.

#### Sentencia de control condicional
Ejecuta una sentencia si una condición específicada es evaluada como verdadera. Puede opcionalmente agregarse una sentencia else que será ejecutada si la condición es evaluada como falsa.

```javascript
if (condición) sentencia1 [else sentencia2]
```
Observemos que sentencia puede ser una instrucción o un bloque. Si no se ejecuta, opcionalmente se puede poner una sentencia else, la cual tiene la particularidad que su sentencia puede ser otro if, lo cual genera un posible anidamiento de if.

```javascript
if (condición1)
   sentencia1
else if (condición2)
   sentencia2
else if (condición3)
   sentencia3
...
else
   sentenciaN
```

La condición no necesariamente tiene que ser un valor proveniente del objeto Boolean sino que puede ser cualquier objeto, y su lectura en la sentencia se hará de acuerdo a lo denotado en la sección operadores lógicos de este trabajo.

#### Sentencia de condición múltiple
Javascript cuenta con una sentencia de condición múltiple llamada switch, que consta de varias valores posibles de la expresión, y una sentencia (o bloque) por valor. Cuando una el valor de la expresión coincide con un valor, ejecuta el bloque relacionado, y sigue ejecutando las siguientes sentencias de otros valores. Para evitar que ejecute código de otros valores, se recomienda poner una sentencia break que cortará el bloque de ejecución dentro del switch, para seguir con la ejecución de la sentencia inmediatamente siguiente al bloque switch.     

```javascript
switch (expresión) {
  case valor1:
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
    [break;]
  case valor2:
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
    [break;]
  ...
  case valorN:
    //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
    [break;]
  default:
    //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
    [break;]
```
También puede ser adjuntado un caso default, en le caso que la expresion no sea igual a ninguno de los valores listados como casos.

#### Estructuras de iteración

Javascript nos provee tres estructuras de iteración principales, una de ellas con un par de variantes.

**Estructura de control do...while**:  La sentencia do...while (hacer mientras) crea un bucle que ejecuta una sentencia especificada, hasta que la condición de comprobación se evalúa como falsa. La condición se evalúa después de ejecutar la sentencia, dando como resultado que la sentencia especificada se ejecute al menos una vez.

```javascript
let result = '';
let i = 0;

do {
  i = i + 1;
  result = result + i;
} while (i < 5);
```

**Estructura de control while**:  Crea un bucle que ejecuta una sentencia especificada mientras cierta condición se evalúe como verdadera. Dicha condición es evaluada antes de ejecutar la sentencia.

```javascript
n = 0;
x = 0;
while (n < 3) {
  n ++;
  x += n;
}
```
**Estructura de control for**: La estructura for puede tener varias variantes. La primera es el for común, el cual crea un bucle que consiste en tres expresiones opcionales, encerradas en paréntesis y separadas por puntos y comas, seguidas de una sentencia ejecutada en un bucle.

```javascript
for ([expresion-inicial]; [condicion]; [expresion-final])sentencia
```

Este bucle es muy parecido a los bucles for de otros lenguajes, tal como C o java. Este bucle provee una iteración clara, con el único defectoo que la sintaxis es un poco dificil para aplicarlo a los iteradores, que se podrian mejorar declarandola de otra forma. Javascript implementa estas formas con dos variantes del bucle: 

- **for...in**: La instrucción for-in itera sobre todas las propiedades enumerables de un objeto que está codificado por cadenas (ignorando los codificados por Símbolos, incluidas las propiedades enumerables heredadas.
- **for...of**: La sentencia sentencia for...of ejecuta un bloque de código para cada elemento de un objeto iterable, como lo son: String, Array, objetos similares a array (por ejemplo, arguments or NodeList), TypedArray, Map, Set e iterables definidos por el usuario.

```javascript
///bucle for in
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}

//bucle for of
let iterable = [10, 20, 30];

for (let value of iterable) {
  value += 1;
  console.log(value);
}
```
## Polimorfismo

## Pasaje de Parámetros
Otro de los problemas del scope en JavaScript es que todas las variables de los padres estáticos son visibles en sus hijos. 

Para evitar esto e incorporar al scope de una unidad solo aquello que realmente se necesita se utilizan las *funciones anónimas autoejecutables*. 

En los siguientes fragmentos de código se ejemplifica con claridad: 

```javascript
var foo = 1;
var bar = 2;

function func(){
    console.log(foo);
    console.log(bar);
    foo = 4;
}

func(); 
console.log(foo);
// 1 
// 2
// 4
```

Como se puede ver las variables **foo** y **bar** son visibles en la función **func** y su modificación es posible, lo cual altera el valor de la variable en el padre estático y por lo tanto en todas las funciones que estén al mismo nivel de **func** y se ejecuten después de ella.

Dicho de un modo vulgar, el pasaje de parámetros en JavaScript no tiene sentido porque todo son "variables globales" para las funciones con iguales antepasados estáticos.

Es decir que en este lenguaje es necesario limitar el scope explícitamente para poder contar con un mecanismo de pasaje de parámetros por copia.

La estructura de una función anónima autoejecutable es la siguiente:

```javascript
// el primer paréntesis me permite aislar el scope y el segundo es el llamado a la función
()();
```
Y para pasarle un parámetro: 

```javascript
(function (parametroPorCopia){
    //cuerpo de la funcion
})(parametroPorCopia);
```

Entonces: 

```javascript
var foo = 1;

(function() {
    console.log(foo);
})();
console.log(foo);
// undefined
// 1
```

Mientras que:

```javascript
var foo = 1;

(function(foo) {
    console.log(foo);
    foo = 4;
})(foo);

console.log(foo);
// 1
// 1
```


## Excepciones
 
Javascript tiene un sistema de manejo de excepciones con sus peculiaridades especificas. Primero, puedes lanzar excepciones utilizando  la instrucción *throw*. Las excepciones lanzadas escalaran bloque tras bloque hasta encontrar el primer manejador de excepciones. El mismo tiene la estructura

```javascript

try {
    //some code here
} catch(e) {

}
```

También admite un bloque finally para código que necesita ser ejecutado tanto para la ejecución correcta del bloque try, como su suspensión por alguna excepción y previa ejecución del bloque catch.

Para el lanzamiento de excepciones, utilizamos la instrucción throw y la excepción que querramos tirar. Una peculiaridad de este lenguaje es que para el lanzamiento de excepciones, cualquier tipo de objeto se puede lanzar. En el siguietne código vemos algunos ejemplos:

```javascript

throw 'Error2';   // tipo String
throw 42;         // tipo Number
throw true;       // tipo Boolean
throw {toString: function() { return "¡Soy un objeto!"; } };

```

Sin embargo, javascript te provee un par de clases de excepciones base para poder extender la funcionalidad o basarte en ellas cuando ocurre algún error de su tipo. Estos errores, según la documentación de developer.mozilla.org, son los siguientes: 

    EvalError: Crea una instancia que representa un error que ocurre con respecto a la función global eval().
    InternalError: Crea una instancia que representa un error que ocurre cuando se produce un error interno en el motor de JavaScript. Por ejemplo: "demasiada recursividad".
    RangeError: Crea una instancia que representa un error que ocurre cuando una variable numérica o parámetro está fuera de su rango válido.
    ReferenceError: Crea una instancia que representa un error que ocurre cuando se quita la referencia a una referencia no válida.
    SyntaxError: Crea una instancia que representa un error de sintaxis.
    TypeError: Crea una instancia que representa un error que ocurre cuando una variable o parámetro no es de un tipo válido.
    URIError: Crea una instancia que representa un error que ocurre cuando encodeURI() o decodeURI() pasan parámetros no válidos.

Todos estos errores extienden de una clase base Error, que es la más general y que se recomienda extender si las excepciones necesitadas para una aplicación no corresponden a algunas de las predefinidas (como pasa con la mayoria de excepciones provenientes de errores de negocio de dominios específicos).

Para atrapar un error de alguno de los tipos especificos, podemos basarnos en la siguiente pieza de código:

```javascript

try {
    //the following function may fail.
    funcionQuePuedeFallar()
} catch (e){
  if (e instanceof EvalError) {
    console.error(e.name + ': ' + e.message)
  } else if (e instanceof RangeError) {
    console.error(e.name + ': ' + e.message)
  }
}
```
Como se puede ver, cualquier error ejecuta todo el bloque de catch, como el lenguaje es debilmente tipado, no podemos esperar separar los bloques catch en distintos bloques según el tipo de datos que es el parámetro e. En cambio, lo que podemos utilizar para diferenciar las distintas excepciones, es la instrucción *instanceof* que te devuelve verdadero si e es de la instancia de la clase referida. De este modo, podremos separar la lógica de tratamiento de nuestro error.

Para crear un error personalizado, se recomienda utilizar la sintaxis de class introducida en ES6, para crear una clase que extienda directamente del error. De esta manera, se puede crear un objeto de error con un constructor personalizado, e inclusive darle comportamiento personalizado al error.

Con el siguiente ejemplo creamos un error personalizado:

```javascript
class CustomError extends Error {
  constructor(customParam = 'defaultValue', ...params) {
    // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
    super(...params)

    // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }

    this.name = 'CustomError'
    // Información de depuración personalizada
    this.customParam = customParam
    this.date = new Date()
  }
}
```

En promesas, cuando se lanza una excepción, la misma puede ser atrapada por el bloque catch tal como si fuera un objeto promise rechazado. En el argumento err, se va a encontrar el error como si fuese un objeto de error. De hecho, el parametro que funciona como callback de rechazo lo que hace internamente es lanzar una excepción con lo que hayas pasado como parámetro. Una diferencia que tiene la utilización de promesas con la ejecución de código síncrono, es que como la ejecución asincrona no interrumpe la ejecución del programa principal y lo que se está esperando es que alguien pida el valor de la promesa, al lanzar una excepción el resultado es que la cadena de promesas resulta en un objeto promesa rechazado.

Por último, luego de ejecutarse el bloque try si se logró ejecutar bien, o si tuvo alguna excepción y luego ejecutó el bloque catch, javascript nos provee un bloque finally para la finalización de los bloques correspondientes. El bloque finally siempre es ejecutado.

## Concurrencia  

Javascript utiliza detras de escena un mecanismo conocido como "event loop", que traducido a español significaria iteración de eventos, y es como maneja los eventos para la ejecución asincrona de código. Node se trata basicamente de ejecución de funciones asincronas para evitar el bloqueo. Para esto, el ambiente te provee de instrucciones de ejecución para las procesos posiblemente bloqueantes (entiendase proceso bloqueante como busqueda de datos en disco duro, espera de timeouts, espera de respuesta de solicitudes a otros servidores, etc), con un mecanismo de callbacks asíncrono. Para darnos una idea de a que nos referimos, veamos el siguiente ejemplo.

```javascript
console.log('a');
setTimeout(() => { console.log('b')}, 1000);
console.log('c');
```
Este es un simple ejemplo donde la primera linea linea imprime el caracter *a*, la segunda pone un contador de tiempo de 1000 milisegundos (un segundo) y luego imprime el caracter *b* y la tercera imprime el caracter *c*

En la mayoria de lenguajes de programación, la resolución del anterior ejemplo imprimiria, en primera instancia, el caracter *a*, luego esperaria un segundo, imprimiría el caracter *b* y luego el *c*. En javascript, en cambio, no se da lugar a que las operaciones bloqueantes hagan perder tiempo de cómputo. La forma en que lo resuelve es la siguiente, toda operación bloqueante tiene que recibir por parámetro una función, la cual sera ejecutada una vez que se haya resuelto el motivo por el bloqueo (se termine un timeout, un servidor responda, los datos del disco estén listos, etc.). Por lo tanto, la salida del código anterior será que casi instantaneamente imprime 'a', seguida de 'c', y luego de un segundo imprime 'b'. 

Esto funciona gracias al mecanismo de event loop de javascript. El runtime de javascript tiene internamente dos componentes: El call stack, que encola las llamadas de funciones y el estado en donde quedo (que instrucción tiene que arrancar, los valores de las variables) y es el que funciona para entrar en una función, ejecutarla y volver al mismo punto en la función llamadora. Por otro lado, tenemos el callback queue, que consta de una cola de callbacks con el respectivo mensaje. Para ejecutar operaciones asincronas en javascript, se utilizan algunas funciones que tras bastidores son bindings de C++ predefinidos que computan la operación asincrona, y devuelven un resultado con un mensaje, el cual es encolado dentro del callback queue en conjunto con el callback que estaba asignado a esa operación. Para saber si se está esperando que una función termine de ejecutar, el runtime tambien tiene una lista interna de funciones a terminar la ejecución, conocida como waiting list.

Javascript utiliza los componentes anteriores para ejecutar su código. Un programa está terminado no solo cuando su call stack entero haya sido limpiado, esto es, hasta que la función principal haya sido ejecutada, sino que una aplicación se considera totalmente ejecutada cuando su call stack esté limpio y no tenga más mensajes en la callback queue, ni esté esperando alguna respuesta en la waiting list. Cada vez que se limpia el call stack, el event loop se encarga de observar el callback queue, sacar la siguiente función callback y ponerla en el callstack hasta que la misma sea enteramente ejecutada. Si no hay funciones en el call stack ni tampoco mensajes en el callback queue, el event loop revisa la waiting list si todavia existen operaciones a las cuales se espera su ejecución, si asi lo fuese, se mantiene haciendo pooling hasta que haya habido una respuesta de los eventos asíncronos.

En algunos ambientes, tales como nodejs, un ambiente de ejecución de javascript para servidores, en su version 10 en forma experimental a versiones posteriores de la 12 donde ya esta implementación ds la siguiente característica ya es estable, existe una API conocida como worker threads que te permite generar hilos de ejecución. Cuando se realiza la generación de threads utilizando este concepto, cada hilo de ejecución tiene su propio call stack, event loop y callback queue, y funciona exactamente igual. La generación de hilos en este lenguaje se tiene que tomar con mucha precaución, ya que el lenguaje está orientado a manejar un solo hilo de ejecución, y la generación de más hilos puede impactar en la eficiencia del mismo. 

## Referencias
La siguiente lista son las lecturas utilizadas para el informe.
- https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-1-e0b1d0b2142e
- https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-2-funciones-puras-b99e08c2895d
- https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-3-composici%C3%B3n-f82ac871dcfb
- https://es.wikipedia.org/wiki/JavaScript
- https://uniwebsidad.com/libros/javascript/capitulo-1/breve-historia
- https://www.w3schools.com/js/js_object_prototypes.asp
- https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes
- https://github.com/denysdovhan/wtfjs
- https://github.com/getify/You-Dont-Know-JS
- https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos
- https://www.scribd.com/document/366609333/Analisis-Sintactico-del-lenguaje-JavaScript-utilizando-teoria-de-automatas
- https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
- http://tomcopeland.blogs.com/EcmaScript.html#prod88
- https://github.com/undefinedschool/notes-oop-js
- https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos
- https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Sentencias
- https://developer.mozilla.org/es/docs/Web/JavaScript/Data_structures