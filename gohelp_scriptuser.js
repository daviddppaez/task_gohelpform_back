
  // Función para validar el formato del número de identificación (ID)
  function isValidID(id) {
    const idRegex = /^\d{10}$/;
    return idRegex.test(id);
  }

  // Función para validar que la edad sea un número entre 18 y 99
  function isValidAge(age) {
    const ageRegex = /^(1[8-9]|[2-9]\d)$/;
    return ageRegex.test(age);
  }

  // Función para validar el formato del número de teléfono
  function isValidPhoneNumber(number) {
    const numberRegex = /^\d{10}$/;
    return numberRegex.test(number);
  }

  document.getElementById('contact_form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      id: formData.get('id'),
      age: formData.get('age'),
      number: formData.get('number'),
    };

// Realizar las validaciones antes de enviar los datos
    if (!isValidID(data.id)) {
      alert('El número de identificación debe tener 10 dígitos numéricos.');
      return;
    }

    if (!isValidAge(data.age)) {
      alert('La edad debe ser un número entre 18 y 99.');
      return;
    }

    if (!isValidPhoneNumber(data.number)) {
      alert('El número de teléfono debe tener 10 dígitos numéricos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/userform', {
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

