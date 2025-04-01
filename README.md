# PRUEBA TÉCNICA PARA INGENIERO DE DESARROLLO

## Aplicacion

el api se encuentra en [http://fastapienv.eba-dmpduyg7.us-east-2.elasticbeanstalk.com/docs](http://fastapienv.eba-dmpduyg7.us-east-2.elasticbeanstalk.com/docs) y el front en []()

## Parte 1 – Fondos - 80%

1. Indique con sus propias palabras, qué tecnologías utilizaría para garantizar la
solución. Justifique su respuesta.

```
Backend: Python con FastAPI

Rendimiento y Asincronía: FastAPI permite construir APIs REST de forma rápida y asíncrona, lo que es ideal para manejar múltiples peticiones simultáneas sin bloquear el sistema.
Validación y Documentación Automática: Utilizando Pydantic para la validación de datos, se asegura que las entradas y salidas cumplan los esquemas definidos, y FastAPI genera de forma automática la documentación interactiva (Swagger UI).
Clean Code y Pruebas Unitarias: La estructura modular que permite separar controladores, servicios y repositorios facilita el mantenimiento, la reutilización del código y la realización de pruebas unitarias.
Base de Datos NoSQL: MongoDB

Flexibilidad y Escalabilidad: MongoDB permite modelar la información de manera flexible (por ejemplo, transacciones, configuración de balance, fondos) y escalar horizontalmente conforme crezcan los datos.
Integración Sencilla: Utilizando el driver asíncrono (Motor) se integra de forma natural con FastAPI.
Frontend: React

Interactividad y Modularidad: React permite construir interfaces de usuario dinámicas e interactivas.
Comunicación con API REST: Se integra de forma sencilla con el backend mediante llamadas a APIs, facilitando el consumo de servicios RESTful.
Infraestructura y Despliegue:

AWS CloudFormation: Para automatizar el despliegue de la infraestructura (por ejemplo, instancias EC2, balanceadores de carga, contenedores, etc.) garantizando reproducibilidad y escalabilidad.
Contenedorización (Docker/Dev Containers): Facilita la configuración del entorno de desarrollo y despliegue, asegurando que la aplicación se ejecute de forma consistente en distintos entornos.

```

2. Diseñe un modelo de datos NoSQL que permita la solución al problema.

```
El modelo de datos se puede estructurar en varias colecciones para soportar la solución. Por ejemplo:

Colección "Funds":
    _id: Identificador único del fondo.
    name: Nombre del fondo (por ejemplo, FPV_BTG_PACTUAL_RECAUDADORA).
    min_amount: Monto mínimo requerido para vinculación.
    category: Categoría del fondo (FPV o FIC).
    
Colección "Transactions":
    _id: Identificador único de la transacción (se puede generar con UUID y mapearlo al campo _id).
    fund: Identificador o nombre del fondo.
    type: Tipo de transacción ("subscribe" o "cancel").
    amount: Monto de la transacción.
    date: Fecha y hora de la transacción.
    email: Correo del usuario.
    
Este modelo permite almacenar de manera independiente la información de fondos y transacciones, facilitando consultas y mantenimientos. Además, la separación en colecciones favorece la escalabilidad y el rendimiento en búsquedas complejas o agregaciones.
```

3. Construya una aplicación web con API REST que permita al usuario disponer de la
funcionalidad descrita. Considere manejo de excepciones, Clean code, pruebas
unitarias y otros componentes que aseguren la calidad, seguridad y mantenibilidad.
Para el desarrollo, considere algunas de las siguientes tecnologías: React y Python
con FastApi o Angular y NetCore según como se les haya indicado previamente, si
no tienen clara la tecnología deberán acercarse a su jefe inmediato.

- [Documentacion del Back](/backend)
- [Documentacion del Front](/frontend)


## Parte 2 - 20 %

Escriba las consultas SQL correspondientes, para ello, tenga en cuenta la base de datos llamada
“BTG” la cual tiene las siguientes tablas (tenga en cuenta que se puede presentar el caso de que
no todas las sucursales ofrecen los mismos productos).

Obtener los nombres de los clientes los cuales tienen inscrito algún producto disponible sólo en
las sucursales que visitan.

```sql
SELECT c.nombre
FROM Cliente c
JOIN Inscripción i ON c.id = i.idCliente
JOIN Disponibilidad d ON i.idProducto = d.idProducto
LEFT JOIN Visitan v ON v.idSucursal = d.idSucursal
AND v.idCliente = c.id
GROUP BY c.id,
         c.nombre,
         i.idProducto
HAVING COUNT(d.idSucursal) = COUNT(v.idSucursal);
```