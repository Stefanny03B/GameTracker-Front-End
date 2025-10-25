// Función para cerrar la sesión y redirigir
function cerrarSesion() {
    // 1. ELIMINAR la información de sesión
    localStorage.removeItem('userToken'); // Esto simula eliminar el token
    localStorage.removeItem('username'); // Esto simula eliminar el nombre de usuario

    // 2. REDIRECCIONAR a la página pública
    // Redirige a la página principal (main.html) cuando la sesión se cierra
    window.location.href = './main.html';
}

// ----------------------------------------------------
// Lógica para verificar la sesión en páginas privadas
// Esta función debe ejecutarse al cargar indexlogin.html
// ----------------------------------------------------
function verificarAutenticacion() {
    const token = localStorage.getItem('userToken');
    // Si no hay token (no logeado), redirigir al login.
    if (!token) {
        // Redirige a la página de inicio de sesión
        window.location.href = './login.html';
    }
}

// Asegúrate de enlazar este script al final del body en indexlogin.html