Sistema de Quejas y Reclamos
Descripción
Sistema web full-stack que permite gestionar quejas y reclamos mediante códigos QR. Implementa un CRUD completo para administrar QRs, clientes, agencias, empleados y seguimiento de casos.

Características principales
Gestión de QRs (crear, leer, actualizar, eliminar)
Manejo de clientes y agencias
Sistema de autenticación con Firebase
Interfaz moderna con Angular Material
API REST con Express y MySQL
Diseño responsive
Tecnologías utilizadas

Frontend
Angular 15.2
Angular Material
Firebase Authentication
RxJS
TypeScript
HTML/CSS
Backend
Node.js
Express
MySQL
Cors
Instalación
Prerequisitos
Node.js >= 14
MySQL >= 5.7
Angular CLI >= 15.2

# Clonar el repositorio
git clone https://github.com/your-username/sistema-qr.git

# Instalar dependencias del frontend
cd paginaCRUD
npm install

# Instalar dependencias del backend
cd ../appServer
npm install

# Configurar base de datos
# Crear base de datos 'awm' en MySQL
# Importar script SQL (ubicado en /database/awm.sql)

# Configurar variables de entorno
# Crear archivo .env en /appServer con las credenciales de la BD

# Iniciar backend (desde /appServer)
npm start 

# Iniciar frontend (desde /paginaCRUD)
ng serve

Uso
Acceder a http://localhost:4200
Iniciar sesión con credenciales de Firebase: 
"vichicelakevin@gmail.com"
"kevin12345"
Usar el menú lateral para navegar entre módulos
Gestionar QRs y seguimiento de casos

Estructura del proyecto
.
├── appServer/          # Backend
│   ├── config/        # Configuración BD
│   ├── models/        # Modelos de datos
│   ├── routes/        # Rutas API
│   └── index.js       # Punto de entrada
└── paginaCRUD/        # Frontend
    ├── src/
    │   ├── app/      # Componentes
    │   ├── assets/   # Recursos
    │   └── ...
    └── ...

Licencia
Distributed under the MIT License. See LICENSE for more information.

Contacto
Your Name - @yourtwitter - email@example.com

Project Link: https://github.com/your-username/sistema-qr
