# Pasaje de Parámetros
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