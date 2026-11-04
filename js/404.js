// Muestra la ruta solicitada dentro de la consulta, escapada como texto
document.getElementById('ruta').textContent = "'" + decodeURIComponent(location.pathname).slice(0, 80) + "'";
