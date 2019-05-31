(function(){
    'use strict';

    let regalo = document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function(){

        var map = L.map('mapa').setView([40.642, -3.99], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([40.642, -3.99]).addTo(map)
            .bindPopup('GdlWebCamp By:<br> <strong>Juan Sebastian Flor Usma</strong>')
            .openPopup();

        //Datos usuario
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let email = document.getElementById('email');
        
        
        //Pases
        let pase_dia = document.getElementById('pase_dia');
        let pase_dosdias = document.getElementById('pase_dosdias');
        let pase_completo = document.getElementById('pase_completo');

        //Botones y divs
        let calcular = document.getElementById('calcular');
        let divError = document.getElementById('error');
        let boton = document.getElementById('botonRegistro');
        let productos = document.getElementById('lista-productos');
        let suma = document.getElementById('suma-total');

        //Extras
        let etiquetas = document.getElementById('etiquetas');
        let camisa = document.getElementById('camisa_evento');        

        calcular.addEventListener('click', calcEvent);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);

        function validarCampos(){
            if(this.value == ''){
                divError.style.display = 'block';
                divError.innerHTML = 'Campo obligatorio';
                divError.style.border = '1px solid red';
                this.style.border = '1px solid red';
            } else {
                divError.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            }
        }

        function validarMail(){
            if(this.value.indexOf('@') > -1) {
                divError.style.display = 'none';
                this.style.border = '1px solid #cccccc';
            } else {
                divError.style.display = 'block';
                divError.innerHTML = 'Introduce un correo valido';
                divError.style.border = '1px solid red';
                this.style.border = '1px solid red';
            }
        }
        
        function calcEvent(event){
            event.preventDefault();
            if(regalo.value === '') {
                alert('Debes elegir un regalo');
                regalo.focus();
            } else {
                let dia = parseInt(pase_dia.value, 10)|| 0;
                let dosDias = parseInt(pase_dosdias.value, 10)|| 0;
                let completo = parseInt(pase_completo.value, 10)|| 0;
                let cantidadCamisas = parseInt(camisa.value, 10)|| 0;
                let cantidadEtiquetas = parseInt(etiquetas.value, 10)|| 0;

                let totalPagar = (dia * 30) + (dosDias * 45) + (completo * 50) + ((cantidadCamisas * 10) * .8) + (cantidadEtiquetas * 2);
                
                let listadoProductos = [];
                if(dia >= 1){
                    listadoProductos.push(`${dia} Pases por dia`);
                }
                if(dosDias >= 1){
                    listadoProductos.push(`${dosDias} Pases por dos dias`);
                }
                if(completo >= 1){
                    listadoProductos.push(`${completo} Pases completos`);
                }
                if(cantidadCamisas >=1){
                    listadoProductos.push(`${cantidadCamisas} Camisetas`);
                }
                if(cantidadEtiquetas >=1){
                    listadoProductos.push(`${cantidadEtiquetas} Etiquetas`);
                }
                
                productos.style.display = 'block';
                productos.innerHTML = '';
                for(var i = 0; i < listadoProductos.length; i++){
                    productos.innerHTML += `${listadoProductos[i]} <br>`
                }
                suma.innerHTML = `$ ${totalPagar.toFixed(2)}`;


            }
        }

        function mostrarDias(){
            let dia = parseInt(pase_dia.value, 10)|| 0;
            let dosDias = parseInt(pase_dosdias.value, 10)|| 0;
            let completo = parseInt(pase_completo.value, 10)|| 0;

            let diasElegidos = [];

            if(dia > 0){
                diasElegidos.push('viernes');
            }
            if(dosDias > 0){
                diasElegidos.push('viernes', 'sabado');
            }
            if(completo > 0){
                diasElegidos.push('viernes', 'sabado', 'domingo');
            }
            for(var i = 0; i < diasElegidos.length; i++){
                document.getElementById(diasElegidos[i]).style.display = 'block';
            }
        }



    }); //DOMContenLoaded
})();