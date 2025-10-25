// 🌟 REGISTRO DE USUARIO
// ======================================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Capturar datos del formulario
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Selecciona el mensaje o crea uno temporal si no existe
    const message = document.getElementById('message') || { textContent: '' };

    // Obtener lista actual de usuarios
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Validar campos vacíos
    if (!username || !email || !password) {
      message.textContent = "Por favor, completa todos los campos.";
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Validar si ya existe ese correo
    if (users.find(u => u.email === email)) {
      message.textContent = "Ese usuario ya existe.";
      alert("Ese correo ya está registrado.");
      return;
    }

    // Crear usuario nuevo
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    message.textContent = "Registro exitoso ✅";
    alert("Registro exitoso ✅");
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1000);
  });
}