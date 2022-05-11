Alexis!! Cómo estas? Fijate que cuando borraste los ejemplos de Cypress eliminaste también la carpeta Integration completa! Acordate que dentro de esa carpeta tenemos que poner todos nuestros test, con lo cual te recomiendo volver a crearla! 😃 😃

_Reply_ Gracias por avisar. Lo había solucionado pero se ve que hice el commit antes. 
Todavía tengo pendiente refactorizar un poco el código y unificar la estructura de las pages


Alexis, veo que tenes dos test:
* Verify inline 'Email' field validation by entering a value with invalid format
* Verify 'Email' field validation when creating an account by entering a value with invalid format
Que en principio parece que hacen lo mismo, porque no los agrupas juntos???

Lo mismo con:
* Verify inline 'Email' field validation by entering a value with valid format
* Verify 'Email' field validation when creating an account by entering a value that meets all criteria.

Por que tantos test para validar cosas similares?? 

_Reply_  Motivo aclarado en Teams: una validación es del tipo Client Side y otra Server Side.

_Update:_ La US003 esta practicamente terminada, me falta terminar de definir como voy a realizar la verificacion de los elementos de los dropdown. Estoy trabajando en los primeros TCs de la US004. Usé Fixtures pero no se si lo hice correctamente, me gustaria saber si existe alguna forma de generar valores aleatorios (por ejemplo generados a partir de una expresion regular) y asignarlos a un JSON.

Alexis! Con respecto a tu última pregunta, hasta donde yo se, no hay una forma de generar datos dinámicos en un json... Se lo podemos preg a Javi eso, capaz él conoce alguna forma medio rara de poder hacerlo...
Interesante esta forma:
    clickOutsideElement = () => cy.get('body').click(0,0)
Si queres mañana o la semana que viene podes mostrar un poco esto y comentar porque fuiste por esta forma de hacerlo en vez del .blur
Lo demás, bien, fijate si te animas empezar a documentar un poco el código para ir tomando la costumbre.
Saludos!

_Reply + Update:_ Gracias! Me sigue quedando pendiente documentar. La US004 está practicamente terminada, decidi postergar las validaciones de dropdownlist de todas las US hasta encontrar alguna forma robusta de resolverlo. En CreateAnAccountPage Line: 184 apliqué como un camino "random", no se si tenga sentido o pueda llegar a ser mala práctica.

Alexis, con el tema de lo random, no se que estas queriendo que tenga un comportamiento random, creo que tenemos que ver eso... jejejeje.
Lo demás, se ve bien.

===
Alexis! No vimos al final el tema de lo que querías hacer con la librería de faker, perdona, se me re paso, cualquier cosa si seguis con alguna duda sobre eso y lo vemos!
Lo demás, se ve bien todo el proyecto en general!
Saludos!!!!