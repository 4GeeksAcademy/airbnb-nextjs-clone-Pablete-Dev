# El reto: Clonando la interfaz de Airbnb con Next.js y React

## Propósito

Construir una experiencia de reservas inspirada en Airbnb que permita descubrir alojamientos, explorar resultados y consultar los detalles de una estancia. El reto se centra en reproducir la estructura visual y los flujos principales de las tres vistas, con una interfaz adaptable a móvil y escritorio.

## Usuario objetivo y objetivo de uso

La persona usuaria está buscando un alojamiento para un viaje. Quiere indicar destino y fechas, comparar opciones disponibles y revisar rápidamente si un alojamiento se ajusta a sus necesidades antes de continuar con la reserva.

El objetivo de uso es completar este recorrido: iniciar una búsqueda en `/`, explorar alojamientos en `/catalog` y abrir una opción para consultar sus detalles en `/rooms/[id]`.

## Vistas y componentes principales

### `/` — Inicio y búsqueda

Presenta la entrada al flujo de descubrimiento. Debe ayudar a iniciar una búsqueda de forma directa y dar protagonismo a destinos o alojamientos destacados.

Componentes principales:
- Encabezado con marca, navegación principal y acceso a la cuenta.
- Buscador con destino, fechas y cantidad de huéspedes.
- Categorías y filtros en una barra horizontal.
- Grid de alojamientos compuesto por tarjetas visuales.
- Estado de loading inicial mientras se cargan los alojamientos.
- Carrusel de alojamientos para la presentación móvil.

### `/catalog` — Catálogo de resultados

Muestra los alojamientos que coinciden con la búsqueda y facilita compararlos o ajustar los criterios.

Componentes principales:
- Encabezado y resumen editable de la búsqueda.
- Número de resultados encontrados.
- Controles de filtros y orden por precio ascendente o descendente.
- Listado de alojamientos que reutiliza `ListingCard`.
- `MapPlaceholder` para representar el área del mapa.

### `/rooms/[id]` — Detalle del alojamiento

Expone la información necesaria para evaluar un alojamiento concreto y comenzar una reserva.

Componentes principales:
- Estado de loading del alojamiento identificado por el `id` de la URL.
- Título, ubicación y puntuación.
- Galería de fotografías con controles para avanzar a la imagen siguiente y volver a la anterior.
- Resumen de capacidad, habitaciones y prestaciones.
- Descripción del alojamiento y sección de amenities.
- Información del anfitrión y reseñas.
- `BookingCard` con fechas, precio y contador de huéspedes.

## Enfoque responsive

Diseñar primero para mobile-first a **375px** de ancho: priorizar el contenido esencial, controles táctiles cómodos, jerarquía clara y navegación compacta. Adaptar después a escritorio desde **768px**, aprovechando el espacio adicional para mostrar más resultados en paralelo, ampliar la galería y reorganizar el panel de reserva sin perder continuidad entre las vistas.

## Flujo Vision-to-Spec

Antes de implementar cada vista, derivar su especificación a partir de una captura móvil de Airbnb a **375px**. Cada ruta debe tener su propia captura de referencia y su propia especificación, elaborada antes de comenzar su implementación:

1. Obtener una captura móvil de 375px para `/`, `/catalog` y `/rooms/[id]`.
2. Para cada vista, identificar en su captura las regiones y componentes visibles: navegación, formularios, tarjetas, galerías, filtros y paneles.
3. Describir la responsabilidad de cada componente y anotar sus datos y **props** observables o necesarios, como destino, fechas, huéspedes, imágenes, precio y puntuación.
4. Registrar el layout de cada vista: orden y agrupación de elementos, alineación y proporciones.
5. Documentar una especificación independiente por ruta y contrastarla con su captura antes de implementar esa vista.

Las capturas sirven para derivar la estructura, los componentes, sus props y el layout; no asumir detalles que no sean visibles o verificables en las referencias.

## Restricciones técnicas y de implementación

- **Next.js 16**, **React**, **TypeScript**, **Tailwind CSS** y **App Router**.
- Usar `Link` de Next.js para la navegación interna.
- Definir los componentes funcionales con `const`.
- Mantener un componente por archivo.
- No usar estilos inline.
- No usar librerías de UI preconstruidas.
