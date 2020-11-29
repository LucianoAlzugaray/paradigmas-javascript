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
Un ejemplo simple. Construcción de la función intersección procedural y funcionalmente.

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

Entre las características sobresalientes de los lenguajes funcionales puros podemos mencionar las siguientes:
* Semántica de valores
* Transparencia referencial
* Funciones como valores de primera clase
* Currying
* Evaluación perezosa

Analicemos punto por punto:

#### Semántica de valores
Como veremos en apartados posteriores, JavaScript no solo soporta asignación de variables sino que además delega en el programador el cuidado de efectos colaterales derivados de la cuestión del *scope* como se verá mas adelante.
En este sentido se aparta notablemente de lenguajes funcionales puros. 

Sin embargo también es cierto que desde hace varios años tanto desde quienes mantienen el lenguaje en sí como desde la comunidad, vienen creciendo herramientas, prácticas y patrones para favorecer la inmutabilidad. Como referencia podemos mencionar al popular patrón Redux y a la incorporación de la sintaxis de des estructuración de objetos, que resulta central para lograr inmutabilidad y semántica de valores en la composición de funciones. 

#### Transparencia Referencial

#### Composición de funciones
Una función de orden superior no es más que cualquier función que cumpla por lo menos una de las siguientes condiciones:
* Recibe una función como argumento
* Retorna una función
     
#### Currying
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
Luciano
## Tipos de Datos
Lucas
## Estructuras de control
Luciano
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