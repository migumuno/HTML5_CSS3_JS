var form = document.getElementsByName('contacto-formulario__form')[0];

// Campos del formulario
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var telfInput = document.getElementById('telf');
var conocidoSelect = document.getElementById('conocido');
var otrosTextTextarea = document.getElementById('otros-text');
var messageTextarea = document.getElementById('message');

conocidoSelect.addEventListener('change', function(e){
	if (conocidoSelect.value === 'otros') {
		otrosTextTextarea.style.display = 'inline';
	} else {
		otrosTextTextarea.style.display = 'none';
	}
});

form.addEventListener('submit', function(e){
	var formErrors = document.querySelectorAll('.error-campo');
	for(var i = 0; i < formErrors.length; i++) { 
		formErrors[i].innerHTML = ""; 
	}

	var formSuccess = document.querySelectorAll('.form-success');
	for(var i = 0; i < formSuccess.length; i++) { 
		formSuccess[i].innerHTML = ""; 
	}

	/* Validación de nombre */
	if (nameInput.checkValidity() === false) {
		document.getElementsByClassName('error-name')[0].textContent = '*Es necesario el nombre.';
		nameInput.focus();
		e.preventDefault();
	}

	/* Validación de email */
	var validEmail = {
		valid : true,
		error : 0
	};
	if (emailInput.checkValidity() === true) {
		var regex = /[A-Za-z0-9\.\_\+]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/;
		if (!regex.test(emailInput.value)) {
			validEmail.valid = false;
			validEmail.error = 1;
		}
	} else {
		validEmail.valid = false;
		validEmail.error = 2;
	}
	if (!validEmail.valid) {
		if (validEmail.error === 1) {
			document.getElementsByClassName('error-email')[0].textContent = '*El email no tiene un formato correcto.';
		} else if (validEmail.error === 2) {
			document.getElementsByClassName('error-email')[0].textContent = '*Es necesario un email.';
		}
		emailInput.focus();
		e.preventDefault();
	}

	/* Validación de teléfono */
	var validTelf = {
		valid : true,
		error : 0
	};
	if (telfInput.checkValidity() === true) {
		if (telfInput.value !== '') {
			var regex = /^([0-9])*$/;
			if (!regex.test(telfInput.value)) {
				validTelf.valid = false;
				validTelf.error = 1;
			}
		}
	} else {
		validTelf.valid = false;
		validTelf.error = 2;
	}

	if (!validTelf.valid) {
		if (validTelf.error === 1) {
			document.getElementsByClassName('error-telf')[0].textContent = '*El teléfono no tiene un formato correcto.';
		} else if (validTelf.error === 2) {
			document.getElementsByClassName('error-telf')[0].textContent = '*Es necesario un teléfono.';
		}
		telfInput.focus();
		e.preventDefault();
	}

	/* Validación Otros */
	var limPalabras = 150;
	var palabras = otrosTextTextarea.value.split(' ');
	var count = 0;
	var otros = true;
	palabras.forEach(function(item, index){
		if (item !== '') {
			count++;
		}
	});

	if (count > 150) {
		otros = false;
		document.getElementsByClassName('error-otros')[0].textContent = '*Has sobrepasado el límite de palabras (' + limPalabras + ').';
		otrosTextTextarea.focus();
		e.preventDefault();
	}

	/* Validación Mensaje */
	var palabras = messageTextarea.value.split(' ');
	var count = 0;
	var mensaje = true;
	palabras.forEach(function(item, index){
		if (item !== '') {
			count++;
		}
	});

	if (count > 150) {
		mensaje = false;
		document.getElementsByClassName('error-message')[0].textContent = '*Has sobrepasado el límite de palabras (' + limPalabras + ').';
		messageTextarea.focus();
		e.preventDefault();
	}

	e.preventDefault();
	if (nameInput.checkValidity() === true && validEmail.valid && validTelf.valid && otros && mensaje) {
		var data = {
			name : nameInput.value,
			email : emailInput.value,
			telf : telfInput.value,
			conocido : conocidoSelect.value,
			otros : otrosTextTextarea.value,
			message : messageTextarea.value
		};

		createData(data);
		document.getElementsByClassName('form-success')[0].textContent = 'El mensaje ha sido enviado correctamente, te contestaré lo antes posible ;).';
		form.reset();
	}
});