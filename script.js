//variables globales

//CV formato JSON como string
let cv = '{	"contacto": { "nombre": "Rubén", "apellidos": "Lahoz Sánchez", "email": "rlahozs@gmail.com" },'+
		'	"estudios": [ { "año":"1997",	"estudio": "Formación profesional electricidad y electrónica, especialidad instrumentación y control." },'+
						' { "año":"2018",	"estudio": "Grado de ingeníeria informática, universidad de Zaragoza (EINA)" },'+
						' { "año":"2022",	"estudio": "Grado superior en diseño de aplicaciones WEB." } ],'+
			' "cursos": [ '+
						' { "año":"2004",	"curso": "Mantenimiento industrial."},				'+			
						' { "año":"2005",	"curso": "Neumática y electroneumática."},			'+
						' { "año":"2005",	"curso": "Autómatas programábles y SCADA."},			'+
						' { "año":"2006",	"curso": "Programación PHP y MYSQL."},				'+
						' { "año":"2007",	"curso": "Diseño WEB y multimedia."},				'+
						' { "año":"2007",	"curso": "Gestor de contenidos Mambo."},				'+
						' {	"año":"2009",	"curso": "Analista programador, POO, Java, UML."}	],'+
	   '"experiencias": [ { "año":"2004",	"trabajo":"Oficial mantenimiento eléctrico, programador PLC"},'+
	   					' { "año":"2007",	"trabajo":"Programaor web php, Soluciones Tecnológicas Uriel SL"},'+
						' { "año":"2008",	"trabajo":"Freelance full-stack php"}],'+
	  ' "technologies": [ { "desc":"Bases de datos", 			"datos":["MYSQL","ORACLE","PostGreSQL"]},'+
	  					' { "desc":"Lenguajes de programación",	"datos" :["C", "C++", "Java", "Haskell", "Elixir","HTML","CSS", "Javascrpit", "Python", "PHP", "Bash script"]},'+
						' { "desc":"IDE", 						"datos" :["Eclipse", "NetBeans", "Visual Studio", "VS Code"]},'+
						' { "desc":"Otros",						"datos": ["Git", "Docker", "Docker compose", "Spring boot (API REST)"]}'+
					'] }';
//listado de comandos para el autocompletar
let listaComandos = ['help','contact','profile','education','experience','curses','technologies', 'languages', 'pdf'];
//conversion a objeto JSON
cv1 = JSON.parse(cv);
//htmlo escrito en la consola para el autocompletar
let escrito = "";
//console.log(cv);
//funcion onload,  estado inicial de la consola
window.addEventListener('load', 
  function() { 
	let currentDate = new Date();
	$('#linea0').html(dia(currentDate.getDay()) + " " + (currentDate.getDate()+1) + "-" + currentDate.getMonth()+1 + "-" + currentDate.getFullYear());
    $('#linea1').html("Welcome to the interactive CV console.");
	$('#linea2').html("By typing a command, you will be able to fetch information about me.");
	$('#linea5').html("Let's start by typing 'help'.");
	$('#linea4').html("You can also use tab key to autocomplete or show command list.");
	$("#comando").val("");
	
	$("html").on("conhtmlmenu",function(){
		return false;
	 }); 
	 $("#comando").focus();
  }, false);


$(function() {
	//on click focus label
	$("html").mousedown(function(e){
		e.preventDefault();
		$("#comando").focus();
	});
	/*
	//botón salir
	$('#exit').click(function() {
		$('.console-scripts').css('display', 'none');
	});
	//botón minimizar
	$('#min').click(function() {
		$('.console-scripts').css('display', 'none');
		$('#console').css('height', '50px');
	});
	//botón maximizar
	$('#max').click(function() {
		$('#console').css('height', '335px');
		$('.console-scripts').css('display', 'block');
	});
	*/
	//control del teclado
	$('#comando').keydown(function (e) {
		//console.log(e.keyCode);
		//control tabulador, autocompletado
		if(e.keyCode === 9){
			e.preventDefault();
			let c = 0;
			let final ="";
			listaComandos.filter(function(term){
				let buscar = new RegExp ("^"+escrito.toLowerCase());
				if(term.match(buscar)){
					c++;
					final += " " + term;
					//console.log(final);
				}
			});
			if(c == 1 ) $("#comando").val(final.trim());
			else if (c>1){
				scrollUp(final);
			}
		}
		//control enter, enviar comando a la función comando
		if(e.keyCode === 13) {
			e.preventDefault();
			comando( $('#comando').val().trim() );
			$('#comando').val("");
			escrito = "";
		}
		//control backSpace
		if(e.keyCode === 8){
			escrito = escrito.slice(0, escrito.length - 1);
			//console.log(escrito);
		}
		//control teclas alfabeto
		if(e.keyCode>64 && e.keyCode<91 ){
			escrito += String.fromCharCode(e.keyCode);
			//console.log(escrito);
		}
		
   });
});

//Tras pasarle un comando como string, realiza las operaciones oportunas, mostrando información por pantalla
function comando(cmd){
	
	switch(cmd.toLowerCase()){
		case "help":
			scrollUp("");
			scrollUp("help : Ésta ayuda.");
			scrollUp("contact: Datos personales y de contacto.");
			scrollUp("profile: Sobre mí.");
			scrollUp("education: Lista de estudios cursados.");
			scrollUp("experience: Experiencia laboral.");
			scrollUp("curses: Otros cursos de interés.");
			scrollUp("technologies: Tecnologías conocidas.");
			scrollUp("languages: Idiomas");
			scrollUp("pdf : Descarga del CV en pdf");
			break;
		case "contact":
			scrollUp("");
			scrollUp("Nombre : " +cv1.contacto.nombre);
			scrollUp("Apellidos : " + cv1.contacto.apellidos);
			scrollUp("email : " + cv1.contacto.email);
			break;
		break;
		case "education":
			scrollUp("");
			$.each(cv1.estudios,function(i, item){
				scrollUp(item.estudio);
			});
			break;
		case "profile":
			scrollUp("");
			scrollUp("Tras adquirir sólidos conocimientos de programación en mis estudios");
			scrollUp("y de forma autodidacta, busco iniciarme en el mundo de spring boot y");
			scrollUp("microservicios empezando como programador junior.")
			break;
		case "experience":
			scrollUp("");
			cv1.experiencias.sor
			$.each(cv1.experiencias, function(i,item){
				scrollUp(item.año + " : " +item.trabajo);
				
			});
			break;
		case "curses":
			scrollUp("");
			$.each(cv1.cursos, function(i,item){
				scrollUp(item.año + " : " + item.curso);
			});
			break;
		case "technologies":
			scrollUp("");
			scrollUp("Lista de las tecnologías que he utilizado");
			
			$.each(cv1.technologies, function(i,item){
				let txt = "";
				let titulo = document.createElement("b");
				titulo.innerHTML = item.desc;
				scrollUp(titulo);
				$.each(item.datos, function(index, data){
					txt += data;
					if(index == item.datos.length-1) txt = "&emsp;"+txt+"."
					else txt +=", ";
				});
				scrollUp(txt);
			});
			break;
		case "pdf":
			console.log("pdf");
			window.open("cv.pdf");
			break;
		case "languages":
			scrollUp("");
			scrollUp("Español nativo.");
			scrollUp("Inglés : Leído y escrito nivel bueno.  Hablado nivel medio")
			break;
		case "":
			scrollUp("");
			break;
		default : 
			scrollUp("Command not found : " + cmd); 
		break;
	}
}
//Añade un testo a la consola y sube una línea el resto de líneas.
function scrollUp(txt){
	$('#linea0').html($('#linea1').html());
	$('#linea1').html($('#linea2').html());
	$('#linea2').html($('#linea3').html());
	$('#linea3').html($('#linea4').html());
	$('#linea4').html($('#linea5').html());
	$('#linea5').html($('#linea6').html());
	$('#linea6').html($('#linea7').html());
	$('#linea7').html($('#linea8').html());
	$('#linea8').html($('#linea9').html());
	$('#linea9').html($('#linea10').html());
	$('#linea10').html($('#linea11').html());
	$('#linea11').html($('#linea12').html());
	


	$('#linea12').html(txt);
}

//devuelve el día como string pasandole su número ordinal
function dia(d){
	switch(d){
		case 1:
			return "Lunes";
		case 2:
			return "Martes";
		case 3:
			return "Miércoles";
		case 4:
			return "Jueves";
		case 5:
			return "Viernes";
		case 6:
			return "Sábado";
		case 0:
			return "Domingo";

	}
}