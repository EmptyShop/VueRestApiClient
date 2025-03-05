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

    ```sh
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

# Lo que sigue
El alcance de este proyecto es comparar el desempeño y las implementaciones de cada versión de app cliente para consumo de servicios Restful que tengo en este repositorio ([Angular](https://github.com/EmptyShop/AngularRestApiClient), [React](https://github.com/EmptyShop/ReactRestApiClient), Vue y [Kotlin](https://github.com/EmptyShop/KotlinRestApiClient)). Por lo que no tengo planeado agregar o modificar funcionalidades.

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
