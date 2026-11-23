# Actividad Padre - Hijo

Comunicación entre componentes en **Ionic React** (Desarrollo de Interfaces · DAM).

- **Padre → Hijo:** el componente `Padre` envía el mensaje y el contador a sus hijos mediante **props**.
- **Hijo → Padre:** cada `Hijo` avisa al padre ejecutando las **funciones callback** `onEnviarMensaje` y `onIncrementar` que recibe por props.

El estado vive en el padre, así que los dos hijos se mantienen sincronizados.

## Estructura

```
src/components/Padre.tsx   # dueño del estado (useState) y del historial
src/components/Hijo.tsx    # recibe props y emite callbacks
src/pages/Home.tsx         # página que contiene al Padre
```

## Ejecutar

```bash
npm install
npm run dev        # o: ionic serve
npm run build
npm run test:unit
```

Autor: Víctor de Lucas
