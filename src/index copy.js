// const app = require("./config/server");


// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const cheerio = require("cheerio");

// // const fs = require("fs");
// const html = '<div class="btn" id="btn1" onclick="oprimir_btn(0)"></div>';
// const $ = cheerio.load(html);


// const { window } = new JSDOM();


// require("./app/routes/form")(app);

// //inicio del servidor
// app.listen(app.get("port"), () => {
//   console.log("puerto del server: ", app.get("port"));
// }) 


// let arte_creatividad=0;
// let ciencias_sociales=0;
// let ciencias_eaf=0;      //	Ciencias economica, administrativa y financiera
// let ciencia_tecnologia=0;
// let ciencia_ebs=0;       // Ciencias ecológicas, biológicas y de salud
// let perfil=0;

// let preguntas_aleatorias = true;
// let mostrar_pantalla_juego_términado = true;
// let reiniciar_puntos_al_reiniciar_el_juego = true;

// window.onload = function () {
//   base_preguntas = readText("base-preguntas.json");
//   interprete_bp = JSON.parse(base_preguntas);
//   escogerPreguntaAleatoria();
// };

// let pregunta;
// let posibles_respuestas;
// btn_correspondiente = [
//   select_id("btn1"),
//   select_id("btn2"),
// ];
// let npreguntas = [];

// let preguntas_hechas = 0;
// let preguntas_correctas = 0;

// function escogerPreguntaAleatoria() {
//   let n;
//   if (preguntas_aleatorias) {
//     n = Math.floor(Math.random() * interprete_bp.length);
//   } else {
//     n = 0;
//   }
//   while (npreguntas.includes(n)) {
//     n++;
//     if (n >= interprete_bp.length) {
//       n = 0;
//     }
//     if (npreguntas.length == interprete_bp.length) {
//       //Aquí es donde el juego se reinicia
//       if (mostrar_pantalla_juego_términado) {
//         perfil=(Math.max(arte_creatividad, ciencias_sociales, ciencias_eaf, ciencia_tecnologia, ciencia_ebs));
        
//         perfilMasalto = arte_creatividad == perfil ? "Arte y Creatividad" :
//         ciencias_sociales == perfil ? "Ciencias Sociales" :
//         ciencias_eaf == perfil ? "Ciencias economic, administ y financieras" :
//         ciencia_tecnologia == perfil ? "Ciencia y Tecnologia" :
//         ciencia_ebs == perfil ? "Ciencias ecolog, biolog y salud" : null;
//         console.log(perfilMasalto);

//         swal.fire({
//           title: "Hemos finalizado: \nRespuestas de Ciencia y Tecnologia: " + ciencia_tecnologia +
//           "\nRespuestas de Ciencia ecologicas, econominas y salud: " + ciencia_ebs +
//           "\nRespuestas de Arte y Creatividad: " + arte_creatividad +
//           "\nRespuestas de Ciencias Sociales: " + ciencias_sociales +
//           "\nRespuestas de Ciencias economica, administrativa y financiera: " + ciencias_eaf +
//           "\nEl Perfil mas alto es: " + perfilMasalto  ,
//           text:
//             "\n ",
//           icon: "success"
//         });
//         switch(perfilMasalto){
//           case "Ciencia y Tecnologia":
//             swal.fire({
//               title: "Segun el Test las siguientes correponden a las Profesiones recomendadas",
//               text:
//                 "\n Ingeniería en sistemas computacionales, geología, ingeniería civil, arquitectura, electrónica, telemática, telecomunicaciones, ingeniería mecatrónica (robótica), imagen y sonido, minas, petróleo y metalurgia, ingeniería mecánica, ingeniería industrial, física, matemáticas aplicadas, ingeniería en estadística, ingeniería automotriz, biotecnología ambiental, ingeniería geográfica, carreras militares (marina, aviación, ejército), ingeniería en costas y obras portuarias, estadística informática, programación y desarrollo de sistemas, tecnología en informática,educativa, astronomía, ingeniería en ciencias geográficas y desarrollo sustentable."
//             });
//             break;
//           case "Ciencias ecolog, biolog y salud":
//             swal.fire({
//               title: "Segun el Test las siguientes correponden a las Profesiones recomendadas",
//               text:
//                 "\n Biología, bioquímica, farmacia, biología marina, bioanálisis, biotecnología, ciencias ambientales, zootecnia, veterinaria, nutrición y estética, cosmetología, dietética y estética, medicina, obstetricia, urgencias médicas, odontología, enfermería, tecnología, oceanografía y ciencias ambientales, agronomía, horticultura y fruticultura, ingeniería de alimentos, gastronomía, cultura física, deportes y rehabilitación, gestión, ambiental, ingeniería ambiental, optometría, homeopatía, reflexología."
//             });
//             break;
//         }
        
//         arte_creatividad=0;
//         ciencias_sociales=0;
//         ciencias_eaf=0;      //	Ciencias economica, administrativa y financiera
//         ciencia_tecnologia=0;
//         ciencia_ebs=0;
//       }
//       if (reiniciar_puntos_al_reiniciar_el_juego) {
//         preguntas_correctas = 0
//         preguntas_hechas = 0
//       }
//       npreguntas = [];
//     }
//   }
//   npreguntas.push(n);
//   preguntas_hechas++;

//   escogerPregunta(n);
// }

// function escogerPregunta(n) {
//   pregunta = interprete_bp[n];
//   select_id("categoria").innerHTML = pregunta.categoria;
//   select_id("pregunta").innerHTML = pregunta.pregunta;
//   select_id("numero").innerHTML = n;
//   let pc = preguntas_correctas;
//   if (preguntas_hechas > 1) {
//     select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
//   } else {
//     select_id("puntaje").innerHTML = "";
//   }

//   style("imagen").objectFit = pregunta.objectFit;
//   desordenarRespuestas(pregunta);
//   if (pregunta.imagen) {
//     select_id("imagen").setAttribute("src", pregunta.imagen);
//     style("imagen").height = "200px";
//     style("imagen").width = "100%";
//   } else {
//     style("imagen").height = "0px";
//     style("imagen").width = "0px";
//     setTimeout(() => {
//       select_id("imagen").setAttribute("src", "");
//     }, 500);
//   }
// }

// function desordenarRespuestas(pregunta) {
//   posibles_respuestas = [
//     pregunta.respuesta,
//     pregunta.incorrecta1,
//   ];
//   posibles_respuestas.sort(() => Math.random() - 0.5);

//   select_id("btn1").innerHTML = posibles_respuestas[0];
//   select_id("btn2").innerHTML = posibles_respuestas[1];
// }

// let suspender_botones = false;

// function oprimir_btn(i) {
//   if (suspender_botones) {
//     return;
//   }
//   suspender_botones = true;
//   if (posibles_respuestas[i] == pregunta.respuesta) {
//     preguntas_correctas++;
//     btn_correspondiente[i].style.background = "lightgreen";
//     if (btn_correspondiente[i].style.background == "lightgreen"){
//       // Contabilizar la Respuestas de Ciencia y Tecnologia
//       if  (pregunta.categoria=="Ciencia_tecnologia"){
//           ciencia_tecnologia++; 
//         }else if(pregunta.categoria=="Ciencias_sociales"){
//         // Contabilizar la Respuestas de Ciencias sociales
//           ciencias_sociales++; 
//         }else if(pregunta.categoria=="Arte_creatividad"){
//           // Contabilizar la Respuestas de Arte y Creatividad
//           arte_creatividad++;
//         }else if(pregunta.categoria=="Economica_admin_financ"){
//           // Contabilizar la Respuestas de Arte y Creatividad
//           ciencias_eaf++;
//         }else if(pregunta.categoria=="Ciencias_ecologicas_biologicas_salud"){
//           // Contabilizar la Respuestas de Arte y Creatividad
//           ciencia_ebs++;
//       }
//     }
//   } else {
//     btn_correspondiente[i].style.background = "yellow";
//   }
//   /* for (let j = 0; j < 2; j++) {
//     if (posibles_respuestas[j] == pregunta.respuesta) {
//       btn_correspondiente[j].style.background = "lightgreen";
//       break;
//     }
//   } */
//   setTimeout(() => {
//     reiniciar();
//     suspender_botones = false;
//   }, 2000);
// }

// function reiniciar() {
//   for (const btn of btn_correspondiente) {
//     btn.style.background = "white";
//   }
//   escogerPreguntaAleatoria();
// }

// function select_id(id) {
//   return document.getElementById(id);
// }

// function style(id) {
//   return select_id(id).style;
// }




// // function readText(ruta_local) {
// //   var texto = null;
// //   var xmlhttp = new XMLHttpRequest();
// //   xmlhttp.open("GET", ruta_local, false);
// //   xmlhttp.send();
// //   if (xmlhttp.status == 200) {
// //     texto = xmlhttp.responseText;
// //   }
// //   return texto;
// // }

