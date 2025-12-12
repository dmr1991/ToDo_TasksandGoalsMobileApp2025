# ToDo Tasks and Goals Mobile App (2025)

## Descripción del Proyecto

Este es un proyecto de aplicación de gestión de tareas y metas (`To-Do List` y `Goals Manager`) diseñado para ser ejecutado en entornos móviles y de escritorio (web app responsiva). El proyecto está estructurado como un Monorepositorio, separando la lógica del servidor (Backend) de la interfaz de usuario (Frontend).

**Características Principales:**
* CRUD completo (Crear, Leer, Actualizar, Eliminar) para Tareas y Metas.
* Filtro de la lista principal para alternar entre elementos **Pendientes** y **Completados**.
* Vista de detalles de tareas en modal (`ItemDetails`) al hacer clic en la tarjeta.
* Conexión persistente a base de datos NoSQL (MongoDB).

---

## Tecnologías Utilizadas

| Componente | Tecnologías |
| :--- | :--- |
| **Backend (Servidor API)** | Node.js, Express, Mongoose, MongoDB (Atlas), dotenv |
| **Frontend (Cliente)** | React, Redux Toolkit, React-Bootstrap, SCSS |

---

## Estructura del Repositorio

El proyecto contiene dos directorios principales:

1.  `Todo_backend/`: Contiene el servidor Express que gestiona la API REST y la conexión a MongoDB.
2.  `Todo_frontend/`: Contiene la aplicación cliente construida con React y Redux.

---

## Guía de Configuración y Ejecución

Para que el proyecto se ejecute correctamente, se debe iniciar el servidor de la API (Backend) y luego el cliente (Frontend) en dos terminales separadas.

### 1. Requisitos Previos

Asegúrate de tener instalado:
* [Node.js (versión LTS)](https://nodejs.org/es/)
* [npm (viene con Node.js)]
* Una instancia de MongoDB (MongoDB Atlas o local) para obtener la URI de conexión.

### 2. Instalación de Dependencias

Clona el repositorio y navega a las carpetas para instalar las dependencias:

```bash
# 1. Clonar el repositorio
git clone [https://github.com/dmr1991/ToDo_TasksandGoalsMobileApp2025.git](https://github.com/dmr1991/ToDo_TasksandGoalsMobileApp2025.git)
cd ToDo_TasksandGoalsMobileApp2025

# 2. Instalar dependencias del Backend
cd Todo_backend
npm install

# 3. Instalar dependencias del Frontend
cd ../Todo_frontend
npm install

# 4. Volver a la raíz del proyecto
cd ..