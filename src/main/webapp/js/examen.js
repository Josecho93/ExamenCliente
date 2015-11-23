$(document).ready(function () {

    // Este es el botón donde vamos a clickar
    $("#inicio01").click(function () {


        $("#panelrender").empty().append("render");



        $.ajax({
            //Esta es la URL de donde vamos a obtener el JSON
            url: "http://localhost:8081/jsonmaker/control?ob=table&op=get",
            type: "GET",
            datatype: "json",
            success: function (json) {


                // DIV de JSON
                //creamos una variable en la que pasamos el json a string
                var stringjson = JSON.stringify(json);
                //Con esto vaciamos el div y le escribimos json
                $("#paneljson").empty().append(stringjson);



                //metemos en una variable la etiqueta de la tabla junto con su clase de bootstrap
                var message = '<table class="'+ json.message.clase +'">';
                message += "<tr>";
                //hacemos un bucle en el que le pedimos la longitud total del json
                for (var i = 0; i < json.message.cabecera.length; i++) {
                    //ponemos el json en el parser y lo recorremos la cabecera con puntos
                    message += '<'+json.message.cabecera[i].tag+'>';
                    message += json.message.cabecera[i].content;
                    message += '</'+json.message.cabecera[i].tag+'>';
                    //para que salga escrito el html estamos poniendo la etiqueta que lleva preguntando
                    //con tag para que lo saque del json que nos dice si es una fila o una columna
                    //despues le añadimos el contenido con el content para que se vea lo que iria entre las etiquetas
                    //cerramos la etiqueta
                }
                message += '</tr>';
                
                //aqui hacemos lo mismo que con la cabecera pero esta vez estaremos metiendo los nombres de cada uno
                //en lugar del nombre de la columna (cabecera) como antes
                for (var j = 0; j < json.message.cuerpo.length; j++) {
                    message += '<tr>';
                    for (var k = 0; k < json.message.cuerpo[j].length; k++) {
                        message += '<'+json.message.cuerpo[j][k].tag+'>';
                        message += json.message.cuerpo[j][k].content;
                        message += '</'+json.message.cuerpo[j][k].tag+'>';
                    }
                    message += '</tr>';
                }
                message += "</table>";

                //aqui vaciamos el div y metemos el texto del json, con text vemos el contenido en texto
                //plano, es decir que si ponemos una etiqueta no se ejecutara sino que saldrá escrita sin mas
                $("#panelhtml").empty().text(message);
                //aqui vaciamos el div y metemos el texto del json, con html si que se activan las etiquetas
                $("#panelrender").empty().html(message);


            },
            error: function (dato) {

            }
        });








    });


});