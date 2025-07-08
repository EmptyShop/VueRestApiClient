# VueRestApiClient
Cliente de API Rest (Vue)

Este proyecto lo hice como parte de un conjunto de aplicaciones que consumen una API que programé en Python para las operaciones básicas (CRUD) de una lista de contactos: [Contact List App](https://github.com/EmptyShop/FlaskSqlAlchemyApp). Este proyecto (VueRestApiClient) es un cliente para Web, codificado en Vue. La UI contiene una tabla con la lista de contactos registrados y un contenedor con 3 campos de texto correspondientes a nombre, email y teléfono para editar sus valores.

# Cómo lo Hice

## En este proyecto utilicé:

* Vue 3.5.12
* Vue Router 4.4.5
* Bootstrap 5.3.3
* Bootstrap Icons 1.11.3
* Vite 5.4.10

# Lo implementé así:

  * En el archivo `main.js`, ubicado en `src`, asigné las rutas a la aplicación y generé una variable para la URL de la API externa.
  * En el componente `router` ubicado en `src/router/index.js` configuré las rutas de la aplicación de la siguiente forma:

    ```js
    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/create',
          name: 'create',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/CreateView.vue')
        },
        {
          path: '/edit/:id(\\d+)',
          name: 'edit',
          component: () => import('@/views/EditView.vue')
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('@/components/NotFound.vue')
        }
      ]
    })
    ```

  * El componente `HomeView`, ubicado en `src/views`, contiene el módulo principal de la aplicación. En este componente utilizo `fetch()` para consumir los servicios REST. Utilizo también `ref()` sobre la variable `contacts` para tener actualizada de forma automática la UI con la lista de contactos.
  * El componente `CreateView` contiene los campos de texto necesarios para crear un nuevo contacto. De igual forma que en el componente principal, uso `fetch()` para enviar la solicitud **POST** hacia la API.
  * El componente `EditView` contiene los campos de texto necesarios para editar los datos de un contacto existente, especificado por el componente principal. De igual forma que en el componente principal, uso `fetch()` para enviar las solicitudes **GET** y **PUT** hacia la API. También uso `ref()` para actualizar automáticamente los valores del contacto en los campos de texto cuando se recibe desde el servicio externo.

## La ayuda que utilicé:
Para este proyecto me basé en un video tutorial que muestra cómo consumir servicios Restful con Vue. Yo lo adapté a mi propia API y además me apoyé en información complementaria:

  * [Consumir API con Vue](https://www.youtube.com/watch?v=yKpdX0Fdy60)
  * [Tutorial Vue.js](https://vuejs.org/tutorial/#step-1)
  * [Creating a Vue Application](https://vuejs.org/guide/essentials/application.html)
  * [Named Routes](https://router.vuejs.org/guide/essentials/named-routes.html)
  * [Dynamic Route Matching with Params](https://router.vuejs.org/guide/essentials/dynamic-matching.html)

# Actualización
Agregué una ruta alterna de la API para un escenario donde el servidor principal (el que programé en Python) no estuviera ejecutándose. En este caso desarrollé otra API en c# que accede a la misma base de datos. Esta API alterna es un poco distinta a la principal (para POST y PUT devuelve respuestas diferentes), por lo que cuando la vista principal `views/HomeView.vue` detecta que no hay conexión, redirige a la vista `viewsNet/HomeView.vue`. A partir de esta vista se usa la API alterna en todas las operaciones.

## Lo implementé así:
En `main.js`agregué la siguiente línea:

```js
app.provide('urlAPINet','https://localhost:7153/contacts');
```

En `router/index.js` agregué las rutas para la API alterna:

```js
{
  path: '/HomeNet',
  name: 'homeNet',
  component: () => import('@/viewsNet/HomeView.vue')
},
{
  path: '/createNet',
  name: 'createNet',
  component: () => import('@/viewsNet/CreateView.vue')
},
{
  path: '/editNet/:id(\\d+)',
  name: 'editNet',
  component: () => import('@/viewsNet/EditView.vue')
},
```

Además, declaré 2 referencias para usarlas en el menú para las entradas de Home y Create:

```js
export const homeLink = ref("/");
export const createLink = ref("/create");
```

En `App.vue` importo las variables anteriores y las uso para actualizar el menú de la página:

```js
import { homeLink, createLink } from './router';

...

<li class="nav-item">
  <RouterLink :to="homeLink" class="nav-link active" aria-current="page" href="#">Contact List</RouterLink>
</li>
<li class="nav-item">
  <RouterLink :to="createLink" class="nav-link" href="#">Create</RouterLink>
</li>
```

En `views/HomeView.vue` cuando no se conecta a la API principal atrapo el error y redirecciono a la API alterna:

```js
async function getContacts(){
    try {
        const res = await fetch(urlAPI);
        
        if (!res.ok || res.status < 200 || res.status >= 300){
            console.log(res.status);
        }
        const data = await res.json();

        contacts.value = data;

        /* Al inicio de la vista pongo un mensaje de loading para esperar
           mientras carga la API. Cuando recibe los datos quito el
           div de loading */
        var loadingScreen = document.querySelector('.loading');
        loadingScreen.style.opacity = 0;
        setTimeout(()=>{
	        loadingScreen.style.display = 'none';
        },1000);
    } catch (error) {
        console.log("Error fetching contacts: ", error.name, error.message);
        router.push({name: 'homeNet'});  //redirecciono a la vista alterna
    }
}
```

Las vistas alternas hacen referencia a la API de c#: `const urlAPI = inject('urlAPINet');`. Además actualizo las rutas para el menú:

```js
if (homeLink.value != "/homeNet") {
    homeLink.value = "/homeNet";
}
if (createLink.value != "/createNet") {
    createLink.value = "/createNet";
}
```

# Lo que sigue
El alcance de este proyecto es comparar el desempeño y las implementaciones de cada versión de app cliente para consumo de servicios Restful que tengo en este repositorio ([Angular](https://github.com/EmptyShop/AngularRestApiClient), [React](https://github.com/EmptyShop/ReactRestApiClient), Vue y [Kotlin](https://github.com/EmptyShop/KotlinRestApiClient)). Por lo que no tengo planeado agregar o modificar funcionalidades muy seguido.

Siéntete libre de comentar y sugerir cosas para esta app.

# Documentación Autogenerada por Vue y Vite

# rest-api-client

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
