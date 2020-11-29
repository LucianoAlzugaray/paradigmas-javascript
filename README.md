# Trabajo de Investigación - Javascript

**Profesores**
-	Lic. Romina Stickar
-	Lic. Lautaro Pecile

**Alumnos**
-	Luciano Alzugaray
-	Lucas Krmpotic


## Introducción
Este documento es el resultado de una investigación propuesta por la materia *Paradigmas y Lenguajes de Programación* sobre un lenguaje de programación y sus caracteristicas. 

El objetivo de este trabajo es elegir un lenguaje, en este caso *Javascript*, investigar algunos aspectos estudiados en la cátedra sobre el mismo, y desarrollar un informe.

## Historia del Lenguaje


## Aspectos Específicos de *Javascript*

## Paradigma

*Javascript* pertenece escencialmente a la clasificación de los **Lenguajes Procedurales**. Esto significa que un programa escrito en *Javascript*  es una sucesión de instrucciones, que se ejecutan secuencialmente, para indicarle al sistema como computar las acciones correspondientes.

Al mismo tiempo, la comunidad de *Javascript* agregan dos paradigmas más que este lenguaje cumple con ciertas características. Primero, al lenguaje se lo puede encontrar categorizado como **orientado a objetos** . Esto ocurre porque el lenguaje ofrece mecanismos para generar abstracciones parecidas a las clases, las cuales denominan **prototipos**, así  llevando una **programación basada en prototipos**.

La programación basada en prototipos consiste en 

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
Luciano
## Tipos de Datos
Lucas
## Estructuras de control
Luciano
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

    **EvalError**: Crea una instancia que representa un error que ocurre con respecto a la función global eval().
    **InternalError**: Crea una instancia que representa un error que ocurre cuando se produce un error interno en el motor de JavaScript. Por ejemplo: "demasiada recursividad".
    **RangeError**: Crea una instancia que representa un error que ocurre cuando una variable numérica o parámetro está fuera de su rango válido.
    **ReferenceError**: Crea una instancia que representa un error que ocurre cuando se quita la referencia a una referencia no válida.
    **SyntaxError**: Crea una instancia que representa un error de sintaxis.
    **TypeError**: Crea una instancia que representa un error que ocurre cuando una variable o parámetro no es de un tipo válido.
    **URIError**: Crea una instancia que representa un error que ocurre cuando encodeURI() o decodeURI() pasan parámetros no válidos.

Todos estos errores extienden de una clase base Error, que es la más general y que se recomienda extender si las excepciones necesitadas para una aplicación no corresponden a algunas de las predefinidas (como pasa con la mayoria de excepciones provenientes de errores de negocio de dominios específicos).

Para atrapar un error de alguno de los tipos especificos, podemos basarnos en la siguiente pieza de código:

```javascript

try {
    //the following function may fail.
    customFunctionThatCanFails()
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

Para estudiar sobre la concurrencia de javascript, nos basaremos en el popular motor de ejecución V8, el cual funciona como runtime en los navegadores y tambien como core de su popular entorno de ejecución nodejs, el cual se utiliza para convertir un lenguaje que primeramente fue orientado a web a uno de proposito general. Este entorno, a pesar de que es muy utilizado para desarrollo de servidores web, tiene un sistema muy particular para manejar la concurrencia. 

Hasta la version de nodejs 10 de nodejs, version cuyos cambios introdujeron a los worker threads de forma experimental dentro de la api, un proceso estandar de nodejs funcionaba con un unico hilo de ejecución. O sea que si querias multiplicar el poder computacional de la aplicación, debias multiplicar la cantidad de instancias en las cuales se ejecutaba y balancear la carga del mismo. El motivo por el cual esta tecnología era muy utilizada para servidores, donde los costos son importantes, hay alta concurrencia de peticiones y se prioriza la velocidad de respuesta, es por su particular manera de ejecución no bloqueante con la entrada/salida.

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

En algunos ambientes, tales como nodejs version 10 en forma experimental a versiones posteriores de la 12 donde ya esta implementación ds la siguiente característica ya es estable, existe una API conocida como worker threads que te permite generar hilos de ejecución. Cuando se realiza la generación de threads utilizando este concepto, cada hilo de ejecución tiene su propio call stack, event loop y callback queue, y funciona exactamente igual. La generación de hilos en este lenguaje se tiene que tomar con mucha precaución, ya que el lenguaje está orientado a manejar un solo hilo de ejecución, y la generación de más hilos puede impactar en la eficiencia del mismo. 

## Referencias
La siguiente lista son las lecturas utilizadas para el informe.
- https://es.wikipedia.org/wiki/JavaScript
-  https://www.w3schools.com/js/js_object_prototypes.asp
- https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes
- https://github.com/denysdovhan/wtfjs
- https://github.com/getify/You-Dont-Know-JS
- https://developer.mozilla.org/es/docs/Web/JavaScript/Introducci%C3%B3n_a_JavaScript_orientado_a_objetos
- https://www.scribd.com/document/366609333/Analisis-Sintactico-del-lenguaje-JavaScript-utilizando-teoria-de-automatas

- https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
- http://tomcopeland.blogs.com/EcmaScript.html#prod88
