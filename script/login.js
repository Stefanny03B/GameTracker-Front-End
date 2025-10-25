// 🌟 INICIO DE SESIÓN
// ======================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message') || { textContent: '' };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      message.textContent = "Inicio de sesión exitoso ✅";
      alert("Inicio de sesión exitoso ✅");
      setTimeout(() => window.location.href = "./indexlogin.html", 1000);
    } else {
      message.textContent = "Correo o contraseña incorrectos.";
      alert("Correo o contraseña incorrectos.");
    }
  });
}
