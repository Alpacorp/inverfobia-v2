# Inverfobia V2

## Tecnologías usadas y versiones

- React V. 18.2.0
- Vite V. 4.0.0
- React router dom V. 6.6.2
- TypeScript V. 4.9.3
- Axios V. 1.2.2

## Demás lenguajes o estándares usados

- CSS
- JavaScript
- HTML

## Scripts disponibles para el modo desarrollo

### `npm run dev`

Abre el proyecto en modo de desarrollo para que mientras se edita el código puedas ir viendo los cambios en tiempo real

### `npm run build`

Acciona que el proyecto genera una carpeta comprimida con el archivo el cual se puede colocar en cualquier servidor

## Variables de entorno

Uan vez se entregue el código fuente, en el archivo .env.local estarán todas las variables de entorno que usa el proyecto.

Este front va a estar apuntando a VITE_API_URL_PROD que relaciono el cual se encarga de procesar la parte del Google recaptcha y la integración con hubspot para el envío de los contactos a la base de Finamex usando los tokens y accesos secretos para este tipo de integración.

## Peso del proyecto

El proyecto tiene un peso total de 1.5MB siendo los componentes de imágen los que mayor pesos generar en el build de producción, sin embargo es un peso muy pequeño el cual se puede incorporar a cualquier servidor sin mayor novedad.

# Servidores aptos para este proyecto

Los servidores que permiten la correcta visualización del proyecto pueden ser:

- Apache
- Linux
- Windows
- Dedicado de NODE
- AWS a través de S3

Nuestra recomendación para que sea un deploy rápido, es el uso de un servidor Linux en donde pasamos a entregar el código fuente en una carpeta "dist" y una vez allí en la administración de los archivos se extare el contenido para que finalmente se vea en el dominio asociado a ese contenido que para este caso esperamos que sea [adiosinverfobia.com]

# Especificaciones de Hardware

Básicamente que soporte Node y JavaScript

# Estructura del proyecto

El proyecto está conformado por las siguientes carpetas:

├── public
├── robots.txt
├── src
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts

## Scripts de seguimiento y control

El proyecto se entrga con la implementación de Google Analytics, Meta Pixel, Twitter Pixel y un script para conectar el pixel de un medio de difusión de pauta programática. Todo lo anterior funcionando correctamente.

## Las urls por donde ha pasado este proyecto son

Inverfobia Versión 1:
[https://inverfobia.vercel.app/]

Inverfobia Versión 2:
[https://inverfobia-v2.vercel.app/]

Url del dominio oficial:
[adiosinverfobia.com]

# Integraciones

Se está usando una integración con Hubspot a través de un API que proporsiona el equipo de Hubspot con el fin de realizar conexión del formulario de registro de datos y la encuesta, con la lista general de contactos de la cuenta de Finamex en Hubspot. Lo anterior para que todos los registros lleguen de inmediato al la base de contactos.

la API que se estpa usando es basada en la siguiente documentación:
[https://developers.hubspot.com/docs/api/crm/contacts]

# Backend Inverfobia

La landing usa un servicio backend el cual está desarrollado en Node con el fin de canalizr los endpoints de HUbspot y Google recaptcha. La documentación la comparto a continuación:

[https://documenter.getpostman.com/view/11244183/2s93JnTRNP]
