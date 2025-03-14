# BTG Investment API

Esta API está diseñada para gestionar la suscripción y cancelación de fondos de inversión para BTG Pactual. Se basa en FastAPI y MongoDB, y sigue una arquitectura limpia que separa controladores, servicios y repositorios.

## Características
- **Suscripción a fondos**: Permite suscribirse a un fondo siempre que se cumplan las reglas de negocio (mínimo de vinculación y saldo disponible).
- **Cancelación de suscripciones**: Permite cancelar una suscripción existente, retornando el monto de vinculación al balance del usuario.
- **Gestión de configuración**: El balance inicial y actual se configuran y actualizan en MongoDB.
- **Notificaciones simuladas**: Se envían notificaciones (simuladas) para operaciones de suscripción y cancelación.
- **Validación de datos**: Se utiliza Pydantic para validar requests y responses.
- **Estructura modular**: Se separa la lógica en controladores, servicios, repositorios y esquemas.

## Estructura del Proyecto

```
backend/
├── app/
│   ├── api/
│   │   └── endpoints/
│   │       ├── subscription.py          # Endpoints para suscripciones y cancelaciones
│   ├── core/
│   │   ├── config.py                    # Configuración global (variables de entorno, settings, etc.)
│   │   └── db.py                        # Conexión a MongoDB (utilizando Motor)
│   ├── exceptions/
│   │   └── custom_exceptions.py         # Excepciones personalizadas y sus handlers
│   ├── models/
│   │   └── transaction.py               # Modelo Pydantic para transacciones
│   ├── repositories/
│   │   ├── config_repository.py         # Repositorio para la configuración (balance)
│   │   ├── fund_repository.py           # Repositorio para fondos (gestiona _id, etc.)
│   │   └── transaction_repository.py    # Repositorio para transacciones
│   ├── schemas/
│   │   ├── subscription_request.py      # Modelo para request de suscripción
│   │   └── cancellation_request.py      # Modelo para request de cancelación
│   └── services/
│       ├── fund_service.py              # Lógica de negocio para fondos
│       └── subscription_service.py      # Lógica de negocio para suscripciones y cancelaciones
├── Dockerfile                           # Archivo para construir la imagen del contenedor
├── devcontainer.json                    # Configuración de Dev Container para VS Code
└── requirements.txt                     # Dependencias del proyecto
```

## Requisitos

- Python 3.9+
- MongoDB (local o remoto)
- Uvicorn para correr el servidor ASGI
- Dependencias de Python listadas en requirements.txt

## Variables de entorno

```
ENVIRONMENT=development
MONGO_URI=mongodb://localhost:27017
```

## Ejecución en Desarrollo
Para levantar la aplicación en modo desarrollo con recarga automática, ejecuta:

```
uvicorn app.main:app --reload
```
Accede a la documentación interactiva en http://localhost:8000/docs.


