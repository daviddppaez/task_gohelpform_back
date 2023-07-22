
  // Función para validar el formato del consultorio
  function isValidID(site) {
    const idRegex = /^\d{3}$/;
    return idRegex.test(site);
  }

  // Función para validar que el correo está bien
  function isValidAge(email) {
    const ageRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return ageRegex.test(email);
  }

// Llamado al diligenciar el formulario
  document.getElementById('contact_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      site: formData.get('site'),
      email: formData.get('email'),
      think: formData.get('think')
    };

// Realizar las validaciones antes de enviar los datos
    if (!isValidID(data.site)) {
      alert('El número del consultorio son tres números');
      return;
    }

    if (!isValidAge(data.email)) {
      alert('Coloca un correo electrónico válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/doctorform', {
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

