document.addEventListener('DOMContentLoaded', function() {
    cargarTiposIncidencia();
});

function cargarTiposIncidencia() {
    fetch('/api/tipoIncidencia') // Asegúrate de que esta URL sea correcta
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('tipoIncidencia');
            data.forEach(tipo => {
                let option = document.createElement('option');
                option.value = tipo.id_tipo_incidencia;
                option.textContent = tipo.nombre_tipo;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar tipos de incidencia:', error);
            mostrarMensaje('Error al cargar tipos de incidencia.', 'error');
        });
}

document.getElementById('formularioIncidencia').addEventListener('submit', function(event) {
    event.preventDefault();

    const datosRemitente = {
        nombres: document.getElementById('nombres').value,
        apellido_paterno: document.getElementById('apellido_paterno').value,
        apellido_materno: document.getElementById('apellido_materno').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    };

    const datosIncidencia = {
        descripcion: document.getElementById('descripcion').value,
        id_tipo_incidencia: document.getElementById('tipoIncidencia').value
    };

    const datosParaEnviar = {
        remitente: datosRemitente,
        incidencia: datosIncidencia
    };

    fetch('/api/incidencias', { // Asegúrate de que esta URL sea correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosParaEnviar)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta del servidor no es OK');
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: '¡Éxito!',
            text: 'Incidencia enviada con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        this.reset(); // Resetea el formulario después del envío exitoso
    })
    .catch((error) => {
        Swal.fire({
            title: 'Error',
            text: 'Error al enviar la incidencia: ' + error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
});

function mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.getElementById('mensaje');
    divMensaje.textContent = mensaje;
    divMensaje.className = tipo; // Esto permite aplicar diferentes estilos según sea éxito o error
}
