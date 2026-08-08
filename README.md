# SpaceLap 🚀 - Sistema de Reserva de Laboratorios y Espacios PUCP

![SpaceLap Banner](https://img.shields.io/badge/PUCP-SpaceLap-002B66?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**SpaceLap** es una aplicación web desarrollada para facilitar la reserva interactiva de laboratorios de cómputo, cubículos de estudio y salas de trabajo para estudiantes de la Pontificia Universidad Católica del Perú (PUCP).

Diseñado y construido a partir del prototipo oficial en **Figma (`UI-Grupo-6`)**.

---

## 📸 Características Principales

1. **🔐 Inicio de Sesión PUCP**:
   - Autenticación con código de alumno PUCP (`20211038`).
   - Ocultar/mostrar contraseña con indicador visual.
   - Guardado de sesión persistente en el navegador (`localStorage`).

2. **🏠 Panel Principal (Dashboard)**:
   - Encabezado con título del sistema **Book It** y correo institucional (`estudiante@pucp.edu.pe`).
   - Tarjeta **Mis Solicitudes**: Estado de reservas en tiempo real (*Aprobado*, *Pendiente*, *Finalizado*, *Cancelado*).
   - Tarjeta **Notificaciones**: Contador dinámico en vivo con la cuota diaria disponible del estudiante (`05h 00min 00s`).
   - Botón principal de acción **"Nueva solicitud"**.

3. **📅 Asistente de Reserva Interactivo**:
   - **Paso 1**: Selección de laboratorio (Laboratorio V-101, Mac Lab V-102, Cubículo E-204, Lab IA V-203) con especificaciones técnicas y conteo de equipos disponibles.
   - **Paso 2**: Selector de fecha y bloque horario de 2 horas.
   - **Paso 3**: Registro del motivo de la reserva (Estudio individual, trabajo en equipo, proyecto de curso, etc.).
   - **Paso 4**: Generación instantánea de **Pase Digital en Código QR** para acceso al laboratorio con animación de celebración.

4. **📋 Historial Completo y Pases QR**:
   - Listado de solicitudes anteriores con filtros por categoría (*Todas*, *Activas*, *Pasadas*).
   - Visualizador en ventana modal del código QR de acceso.
   - Opción para cancelar reservas activas.

5. **👤 Perfil de Estudiante**:
   - Datos oficiales de alumno: `NAVARRO COLLAO WALTER JUNIOR` (`20211038`).
   - Información de Facultad (*Facultad de Ciencias e Ingeniería*) y Especialidad (*Ingeniería Informática*).
   - **Modal de Confirmación de Cierre de Sesión** (*"¿Estás seguro que deseas cerrar sesión?"*).

---

## 🛠️ Tecnologías Utilizadas

- **Framework Front-End**: React 18 + Vite
- **Lenguaje**: TypeScript
- **Estilos y Componentes**: Tailwind CSS + Lucide Icons
- **Generador QR**: `qrcode.react`
- **Efectos y Animaciones**: `canvas-confetti`

---

## 🚀 Cómo Ejecutar Localmente

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/spaceLap.git
   cd spaceLap
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Construir versión de producción**:
   ```bash
   npm run build
   ```

---

## 📤 Subir a GitHub

Para subir el proyecto a tu cuenta de GitHub, ejecuta los siguientes comandos en la terminal dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Initial commit: SpaceLap PUCP web application from Figma design"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/spaceLap.git
git push -u origin main
```

---

Desarrollado con ❤️ para el **Grupo 6 - PUCP** 🎓
