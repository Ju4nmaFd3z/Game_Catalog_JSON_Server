# Respuestas a las cuestiones finales

**1. ¿Qué responsabilidad tiene GameService?**
Construir y realizar las peticiones HTTP a JSON Server, y devolver los resultados al componente como `Observable`.

**2. ¿Por qué AppComponent no debería utilizar directamente HttpClient?**
Para separar responsabilidades: el componente gestiona la interfaz y el estado, y el servicio el acceso a datos. Así el código es más limpio, reutilizable y fácil de probar o de cambiar si cambia la API.

**3. ¿Qué diferencia existe entre `GET /games` y `GET /games/5`?**
`GET /games` devuelve la colección completa (un array). `GET /games/5` devuelve un único recurso, el videojuego con `id` 5 (un objeto), o un 404 si no existe.

**4. ¿Qué representa `?` en `?genre=RPG`?**
Marca el inicio de los parámetros de consulta (query string) de la URL. Cada parámetro tiene la forma `clave=valor` y se separan entre sí con `&`.

**5. ¿Qué evento DOM genera normalmente un `<select>` cuando cambia su selección?**
El evento `change`.

**6. ¿Cómo se captura dicho evento en Angular?**
Con event binding: `(change)="metodo()"`.

**7. ¿Qué representa `$event`?**
El objeto del evento DOM que Angular entrega al manejador. Su propiedad `event.target` es el elemento que lo originó (el `<select>`), y de ahí se obtiene `.value`.

**8. ¿Qué ventaja tiene utilizar una referencia `#genreSelect`?**
Permite acceder directamente al elemento desde la plantilla (`genreSelect.value`) y pasar el valor al método, sin tener que usar `event.target as HTMLSelectElement` en el componente.

**9. ¿Qué diferencia existe entre `title_like=Dragon` y `q=Dragon`?**
`title_like` filtra solo por el campo `title` con coincidencia parcial. `q` es una búsqueda de texto completo que mira en todos los campos del recurso (título, género, plataforma...).

**10. ¿Para qué sirven `_page` y `_limit`?**
Para paginar: `_page` indica qué página se pide y `_limit` cuántos elementos tiene cada página.

**11. ¿Por qué `this.http.get<Game[]>(url)` no permite normalmente acceder directamente a las cabeceras?**
Porque por defecto `HttpClient` solo entrega el cuerpo (body) de la respuesta, ya convertido a `Game[]`, y descarta las cabeceras y el estado.

**12. ¿Qué conseguimos utilizando `observe: 'response'`?**
Que el Observable emita la respuesta HTTP completa (`HttpResponse<Game[]>`), con cuerpo, cabeceras y código de estado.

**13. ¿Dónde se encuentran los videojuegos en una `HttpResponse<Game[]>`?**
En `response.body`.

**14. ¿Dónde se encuentran las cabeceras HTTP?**
En `response.headers`, por ejemplo `response.headers.get('X-Total-Count')`.

**15. ¿Qué información proporciona `X-Total-Count`?**
El número total de registros que cumplen la consulta (con sus filtros), independientemente de los que vengan en la página actual.

**16. ¿Por qué debemos convertir `X-Total-Count` a number?**
Porque `headers.get()` devuelve `string | null`, y para calcular el número de páginas necesitamos un valor numérico.

**17. ¿Cómo calculamos el número total de páginas?**
`Math.ceil(totalItems / pageSize)`. Por ejemplo, 17 elementos con 5 por página: `Math.ceil(3.4)` = 4 páginas.

**18. ¿Por qué debemos volver a la página 1 cuando se modifica un filtro?**
Porque el nuevo conjunto de resultados puede tener menos páginas, y la página actual podría no existir (por ejemplo, estar en la 3 y que el filtro solo devuelva 2 resultados).
