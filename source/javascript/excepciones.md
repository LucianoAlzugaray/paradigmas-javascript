# Excepciones

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