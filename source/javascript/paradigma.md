# Paradigma

Javascript es un lenguaje multiparadigma. Admite tanto la implementación de programas basados en el paradigma Orientado a Objetos como en el paradigma Funcional. Sin embargo no es posible hablar de una implementación pura de ninguno de ellos.

Si bien es cierto que JavaScript puede utilizarse como lenguaje procedural y de scripting, creemos que son el paradigma Funcional y el Orientado a Objetos los que se destacan en el diseño actual del lenguaje y por lo tanto los que más vale la pena analizar en este breve trabajo.
De hecho los frameworks más populares para la construcción de aplicaciones frontend en JavaScript, Angular y React, han sido desarrollados precisamente en base a los paradigmas Orientado a Objetos y Funcional respectivamente.

En los próximos apartados analizaremos cada uno de estos paradigmas en JavaScript, poniendo énfasis en ejemplificar su implementación por un lado y mencionar los aspectos que lo alejan de las implementaciones puras por otro.

## Paradigma Funcional
Para analizar la escritura de programas funcionales en JavaScript nos apoyaremos en *Lupo Montero* y su serie [Introducción a la Programación Funcional en JavaScript](https://medium.com/laboratoria-developers/introducci%C3%B3n-a-la-programaci%C3%B3n-funcional-en-javascript-parte-2-funciones-puras-b99e08c2895d).
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

### Semántica de valores
Como veremos en apartados posteriores, JavaScript no solo soporta asignación de variables sino que además delega en el programador el cuidado de efectos colaterales derivados de la cuestión del *scope*.
En este sentido se aparta notablemente de lenguajes funcionales puros.

Sin embargo también es cierto que desde hace varios años tanto desde quienes mantienen el lenguaje en sí como desde la comunidad, vienen creciendo herramientas, prácticas y patrones para favorecer la inmutabilidad. Como referencia podemos mencionar al popular patrón Redux y a la incorporación de la sintaxis de des estructuración de objetos, que resulta central para lograr inmutabilidad y semántica de valores en la composición de funciones.

### Transparencia Referencial

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

### Composición de funciones

#### Funciones de órden superior

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

#### Aplicación parcial

La *aplicación parcial* es un mecanismo refactorización de una función de *n* argumentos en *n* funciones de un argumento. El uso de la aplicación parcial permite extender funcionalidad fijando uno o algunos de los argumentos de la función original.



#### Currying
Para concluir, no podemos dejar de mencionar currying, que consiste en reemplazar una función que toma varios argumentos con una secuencia de funciones, cada una con un solo argumento. Podríamos decir que el currying es un caso de aplicación parcial en el que siempre rompemos todos los argumentos en una cadena de invocaciones, uno por uno, mientras que en la aplicación parcial normalmente solo fijamos el primer argumento, o un número fijo. Se trata de mecanismos similares pero sutilmente distintos.


## Paradigma Orientado a Objetos
### Requerimientos mínimos
* Oscurecimiento de la información
* Abstracción de datos
* Clasificación (Herencia - Relación)
* Polimorfismo y Vinculación Dinámica.

### Oscurecimiento de la información
* El estado interno de un objeto solo puede ser accedido y modificado como
  respuesta a un mensaje.

* La representación física de cada clase y la implementación de las operaciones,
  no es visible desde el exterior y por lo tanto puede ser modificada sin alterar el
  resto de las clases.

### Abstracción de datos
* Una clase define un patrón de comportamiento a partir del cual es posible
  crear varias instancias

### Clasificacion - herencia


new vs Object.create
Object.create crea un nuevo objeto vacío y además le asigna a este el prototipo que nosotros querramos, si le pasamos un argumento, sino le asigna Object como prototipo
new en cambio, es una llamada a una función constructora (ó Factory Function), la cual también puede recibir argumentos, pero en este caso son para setear otras propiedades del objeto y no su prototipo
En este caso, el prototipo del nuevo objeto se obtiene a partir de la propiedad prototipe (objeto) de la función, a la cual se setea una referencia en la propiedad __proto__ del nuevo objeto
Por último, con Object.create podemos crear un objeto que no herede de nadie (no tenga prototipo), usando Object.create(null); mientras que, si seteamos SomeConstructor.prototype = null, el nuevo objeto va a heredar de Object.prototype

### Polimorfismo