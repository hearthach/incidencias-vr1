document.addEventListener('DOMContentLoaded', function() {
    cargarTiposIncidencia();
});

function cargarTiposIncidencia() {
    fetch('/api/tipoIncidencia')
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
        .catch(error => console.error('Error:', error));
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

    fetch('/api/incidencias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosParaEnviar)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').textContent = 'Incidencia enviada con éxito.';
        console.log('Success:', data);
    })
    .catch((error) => {
        document.getElementById('mensaje').textContent = 'Error al enviar la incidencia.';
        console.error('Error:', error);
    });

    this.reset(); // Resetea el formulario después del envío
});
