# Sistema de Quejas y Reclamos

## Descripción

Sistema web **full-stack** diseñado para gestionar quejas y reclamos mediante códigos QR. Este sistema permite realizar un CRUD completo para administrar QRs, clientes, agencias, empleados y el seguimiento de casos.

## Características Principales

- **Gestión de QRs**: Crear, leer, actualizar y eliminar códigos QR.
- **Manejo de clientes y agencias**: Administrar información de clientes y agencias.
- **Autenticación con Firebase**: Sistema de autenticación basado en Firebase.
- **Interfaz moderna**: Uso de **Angular Material** para una interfaz atractiva y funcional.
- **API REST**: Desarrollada con **Express** y **MySQL** para la gestión de datos.
- **Diseño Responsive**: Compatible con dispositivos móviles y pantallas de escritorio.

## Tecnologías Utilizadas

### Frontend
- **Angular 15.2**
- **Angular Material**
- **Firebase Authentication**
- **RxJS**
- **TypeScript**
- **HTML/CSS**

### Backend
- **Node.js**
- **Express**
- **MySQL**
- **Cors**

## Instalación

### Prerequisitos

- **Node.js** >= 14
- **MySQL** >= 5.7
- **Angular CLI** >= 15.2

### Pasos para la Instalación

1. **Clonar el repositorio**  
   Clona este proyecto en tu máquina local:
   ```bash
   git clone https://github.com/your-username/sistema-qr.git

2. **Instalar dependencias del frontend
    Dirígete a la carpeta del frontend y ejecuta:**
    cd paginaCRUD
    npm install

3. **Instalar dependencias del backend**
    Dirígete a la carpeta del backend y ejecuta:
    cd ../appServer
    npm install

4. **Configurar la base de datos**
    Crea la base de datos awm en MySQL.
    Importa el script SQL ubicado en /database/awm.sql.
    Configurar variables de entorno
    Crea un archivo .env en la carpeta /appServer con las credenciales de tu base de datos.

## Iniciar el backend
    Desde la carpeta /appServer, ejecuta:
npm start

## Iniciar el frontend
    Desde la carpeta /paginaCRUD, ejecuta:
    ng serve

## Uso
    Accede a la aplicación en http://localhost:4200.
    Inicia sesión con las siguientes credenciales de Firebase:
    Correo: vichicelakevin@gmail.com
    Contraseña: kevin12345
    Usa el menú lateral para navegar entre los diferentes módulos del sistema.
    Gestiona QRs y realiza el seguimiento de casos.

## Licencia
    Distribuido bajo la licencia MIT. Consulta el archivo LICENSE para más información.

## Contacto
    Email: kvichicela8375@uta.edu.ec
   
