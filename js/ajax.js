function makeAjaxRequest(method, url, body, callbackSuccess) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		// IE 6, IE5
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.open(method, url, true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			console.log('Petición OK');
			callbackSuccess();
		}
	};

	if (body) {
		xhr.send(JSON.stringify(body));
	} else {
		xhr.send();
	}
}

function getData() {
	makeAjaxRequest("GET", "http://localhost/api/contact", true, function(data) {
		console.log(data);
		var response = JSON.parse(data);
		console.log(response);
	});
}


function createData(data) {
	makeAjaxRequest("POST", "http://localhost/api/contact", data, function(){
		console.log('Datos creados correctamente.');
	});
}

var data = {
	name : "Prueba"
};

//createData(data);
//getData();