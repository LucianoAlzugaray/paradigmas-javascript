# Tipado

Javascript es un lenguaje **débilmente tipado**, y de **tipado dinámico**, lo cual lo hace súmamente flexible pero muy inseguro. Además, algunas características particulares, que se detallan en otros apartados y que producen que las variables se liguen a valores inesperados, imponen fuertes dificultades para el *debugging* sobre todo de aplicaciones front-end. A raíz de esto es que desde hace tiempo vienen surgiendo herramientas para apoyar a los programadores en la detección de errores en código que corre en los navegadores.

El estándar EcmaScript 6 a incluído avances importantes en este sentido como la posibilidad de declarar constantes y de limitar el scope de las variables declarandolas con **let** en lugar de **var**. A su vez los frameworks intentan aportar lo propio ofreciendo arquitecturas probadas. Incluso ha surgido TypeScript, un superconjunto de JavaScript, que incorpora la posibilidad de declarar (y por lo tanto detectar errores de) tipos de variables. TypeScript se basa en un "transpilador" que interfacea entre la sintaxis de éste pseudolenguaje y la sintáxis propia del estándar EcmaScript 6.

Si bien este trabajo no ahondará demasiado en esto, nos parecía fundamental mencionarlo ya que es justamente su sistema de tipos lo que ha sido más masivamente criticado en JavaScript.

## Débilmente Tipado

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

## Tipado Dinámico.

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

## Alcance de una variable

El *scope* en JavaScript también ha sido otro de los aspectos que contribuyó a la inseguridad o la poca confiabilidad del lenguaje.

Por ser un tema tan amplio no será posible ahondar demasiado en este trabajo. No obstante es interesante mencionar el avance que significó la incorporación del calificador **let** en el estándar EcmaScript 6.

También hablaremos de las *funciones anónimas autoejecutables* como forma de aislar el scope de una unidad determinada. Sin embargo este tema si bien guarda relación con el scope lo abordaremos en el apartado referido al pasaje de parámetros por razones que allí se explicarán.


### La incorporación de "let"
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