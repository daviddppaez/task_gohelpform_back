// Función para validar el formato del número de identificación (ID)
  function isValidID(id) {
    const idRegex = /^\d{10}$/;
    return idRegex.test(id);
  }

// Llamado al diligenciar el formulario
  document.getElementById('contact_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      id: formData.get('id'),
      think: formData.get('think')
    };

// Realizar las validaciones antes de enviar los datos
    if (!isValidID(data.id)) {
      alert('El número de identificación debe tener 10 dígitos numéricos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/selectform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
    }
  });

