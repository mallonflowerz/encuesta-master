// este archivo ejecuta el "app.ejs"
const app = require("../src/config/server");
// ponga la ruta COMPLETA de su carpeta en donde se encuentre el archivo "app.ejs"
const ruta = __dirname + '/app/views/app.ejs' // '' C:/Users/ADSI/Documents/siuwi/encuesta-master/src/app/views/app.ejs
// const ruta2 = 'C:/Users/ADSI/Documents/siuwi/encuesta-master/src/app/views/alert.ejs'

// no cambiar nada de estas definiciones
const mysql = require("../src/config/mysql");
const conection = mysql();
const base_preguntas = require("../base-preguntas.json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync(ruta, function (err, data) {
    console.log("ERROR: "+err);
});
const dom = new JSDOM(html);

global.window = dom.window;
global.document = dom.window.document;

//inicio del servidor
app.listen(app.get("port"), () => {
  // rederizacion del login
  app.get("/", (req, res) => {
      res.render("login");
  })
  console.log("puerto del server: ", app.get("port"));

  // envio del formulario
  app.post("/sendForm", (req1, res1) => {
    res1.redirect("/test");
    // query para insertar los datos del formulario
    const {nombre, apellido_uno, apellido_dos, edad, sexo, correo, ndli} = req1.body;
    conection.query("INSERT INTO estudiantes SET?", {
      Est_nombre: nombre,
      Est_apellido_uno: apellido_uno,
      Est_apellido_dos: apellido_dos,
      Est_edad: edad,
      Est_sexo: sexo,
      Est_correo: correo,
      Est_nombreInstitucion: ndli
  }, (err, result) => {
      if (err == null){
          console.log("Los datos han sido guardados correctamente");
      } else{
          console.log("ERROR!!: "+ err);
      }
  })  
  })

  // renderizacion del test (esta parte se usa para calcular en el boton "Me interesa")
  app.get("/test", (req, res) => {
    oButton();
    escogerPreguntaAleatoria();
    fs.writeFileSync(ruta, document.documentElement.outerHTML, function (err) {
        console.log("ERROR!!: "+err);
        
    })
    res.render("app");
  })
  // renderiza el test (esta parte se usa para no calcular nada en el boton "No me interesa")
  app.post("/test/no", (req, res) => {
    reiniciar();
    res.render("app");
  })
}) 

// Definicion de las variables
let idCategoria = [];
let idDefinitivo

let arte_creatividad=0;
let ciencias_sociales=0;
let ciencias_eaf=0;      //	Ciencias economica, administrativa y financiera
let ciencia_tecnologia=0;
let ciencia_ebs=0;       // Ciencias ecológicas, biológicas y de salud
let perfil=0;

let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

let pregunta;
let posibles_respuestas = [];

let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function select_id(id) {
  // selecciona el id de cualquier etiqueta en el EJS
    return document.getElementById(id);
}

function escogerPreguntaAleatoria() {
  // escoge una pregunta de forma aletoria
  select_id("btn3").style.display = "none";
    let n;
    if (preguntas_aleatorias) {
      n = Math.floor(Math.random() * base_preguntas.length);
    } else {
      n = 0;
    }
    while (npreguntas.includes(n)) {
      n++;
      if (n >= base_preguntas.length) {
        n = 0;
      }
      if (npreguntas.length == base_preguntas.length) {
        //Aquí es donde el juego se reinicia
        if (mostrar_pantalla_juego_términado) {
          perfil=(Math.max(arte_creatividad, ciencias_sociales, ciencias_eaf, ciencia_tecnologia, ciencia_ebs));
          perfilMasalto = arte_creatividad == perfil ? "Arte y Creatividad" :
          ciencias_sociales == perfil ? "Ciencias Sociales" :
          ciencias_eaf == perfil ? "Ciencias economic, administ y financieras" :
          ciencia_tecnologia == perfil ? "Ciencia y Tecnologia" :
          ciencia_ebs == perfil ? "Ciencias ecolog, biolog y salud" : null;
          console.log("Perfil mas alto: "+perfilMasalto);

          select_id("btn2").style.display = "none";
          select_id("btn1").style.display = "none";
          select_id("btn3").style.display = "default";
          select_id("encabezado").style.display = "none";
          select_id("resultado").style.display = "default";

          let perfilCompleto; 
          let categoriaCompleta;

          // escoge el perfil mas alto
          switch(perfilMasalto){
            case "Ciencia y Tecnologia":

              categoriaCompleta = "Ciencia y Tecnologia";
              perfilCompleto = select_id("resultado").textContent = "Segun el Test las siguientes correponden a las Profesiones recomendadas: "+ "Ingeniería en sistemas computacionales, geología, ingeniería civil, arquitectura, electrónica, telemática, telecomunicaciones, ingeniería mecatrónica (robótica), imagen y sonido, minas, petróleo y metalurgia, ingeniería mecánica, ingeniería industrial, física, matemáticas aplicadas, ingeniería en estadística, ingeniería automotriz, biotecnología ambiental, ingeniería geográfica, carreras militares (marina, aviación, ejército), ingeniería en costas y obras portuarias, estadística informática, programación y desarrollo de sistemas, tecnología en informática,educativa, astronomía, ingeniería en ciencias geográficas y desarrollo sustentable."

              console.log(categoriaCompleta+ " "+ perfilCompleto);
              break;
            case "Ciencias ecolog, biolog y salud":
              
              categoriaCompleta = "Ciencias ecolog, biolog y salud"
              perfilCompleto = select_id("resultado").textContent = "Segun el Test las siguientes correponden a las Profesiones recomendadas" + "\n Biología, bioquímica, farmacia, biología marina, bioanálisis, biotecnología, ciencias ambientales, zootecnia, veterinaria, nutrición y estética, cosmetología, dietética y estética, medicina, obstetricia, urgencias médicas, odontología, enfermería, tecnología, oceanografía y ciencias ambientales, agronomía, horticultura y fruticultura, ingeniería de alimentos, gastronomía, cultura física, deportes y rehabilitación, gestión, ambiental, ingeniería ambiental, optometría, homeopatía, reflexología."

              console.log(categoriaCompleta+ " "+ perfilCompleto);
              break;
            case "Ciencias economic, administ y financieras":
              categoriaCompleta = "Ciencias economic, administ y financieras"
              perfilCompleto = select_id("resultado").textContent = "Segun el Test las siguientes correponden a las Profesiones recomendadas: "+ 'Administración de empresas, contabilidad, auditoría, ventas, márquetin estratégico, gestión y negocios internacionales, gestión empresarial, gestión financiera, ingeniería comercial, comercio exterior, banca y finanzas, gestión de recursos humanos, comunicaciones integradas en márquetin, administración de empresas ecoturísticas y de hospitalidad, ciencias económicas y financieras, administración y ciencias políticas, ciencias empresariales, comercio electrónico, emprendimiento, gestión de organismos públicos (municipios, ministerios, etc.), gestión de centros educativos.'
              
              console.log(categoriaCompleta+ " "+ perfilCompleto);
              break;
            case "Arte y Creatividad":
              categoriaCompleta = "Arte y Creatividad"
              perfilCompleto = select_id("resultado").textContent = "Segun el Test las siguientes correponden a las Profesiones recomendadas: "+ 'Diseño gráfico, diseño y decoración de interiores, diseño de jardines, diseño de modas, diseño de joyas, artes plásticas (pintura, escultura, danza, teatro, artesanía, cerámica), dibujo publicitario, restauración y museología, modelaje, fotografía, gestión gráfica y publicitaria, locución y publicidad, actuación, camarógrafa, arte industrial, producción audiovisual y multimedia, comunicación y producción en radio y televisión, diseño del paisaje, cine y video, comunicación escénica para televisión, música.'
              
              console.log(categoriaCompleta+ " "+ perfilCompleto);
              break;
            case "Ciencias Sociales":
              categoriaCompleta = "Ciencias Sociales"
              perfilCompleto = select_id("resultado").textContent = "Segun el Test las siguientes correponden a las Profesiones recomendadas: "+ 'Psicología, trabajo social, idiomas, educación internacional, historia y geografía, periodismo, periodismo digital, derecho, ciencias políticas, sociología, antropología, arqueología, gestión social y desarrollo, consejería familiar, comunicación y publicidad, administración educativa, educación especial, psicopedagogía, estimulación temprana, traducción simultánea, lingüística, educación de párvulos, bibliotecología, museología, relaciones internacionales y diplomacia, comunicación social con énfasis en márquetin y gestión de empresas, redacción creativa y publicitaria, relaciones públicas y comunicación organizacional, hotelería y turismo, teología, institución sacerdotal.'
              
              console.log(categoriaCompleta+ " "+ perfilCompleto);
              break;
            }
          
          arte_creatividad=0;
          ciencias_sociales=0;
          ciencias_eaf=0;      //	Ciencias economica, administrativa y financiera
          ciencia_tecnologia=0;
          ciencia_ebs=0;

          if (perfilCompleto !== null) {
            app.post("/", (req, res) => {
              res.redirect("/");
              const consulta2 = "INSERT into perfiles set?";
              const consulta3 = "select Cat_nombre from categorias";
              // query para obtener el nombre de cada categoria
              conection.query(consulta3, (err, result)=>{
                if (err == null){
                  console.log("Los datos han sido guardados correctamente");
                  idCategoria = result.map(objeto => objeto.Cat_nombre);
                  console.log(idCategoria);
                  if (categoriaCompleta == "Ciencia y Tecnologia"){
                    idDefinitivo = 1;
                  } else if (categoriaCompleta == "Ciencias ecolog, biolog y salud"){
                    idDefinitivo = 2;
                  } else if (categoriaCompleta == "Ciencias economic, administ y financieras"){
                    idDefinitivo = 3;
                  } else if (categoriaCompleta == "Arte y Creatividad"){
                    idDefinitivo = 4;
                  } else if (categoriaCompleta == "Ciencias Sociales"){
                    idDefinitivo = 5;
                  } else {
                    console.log("no recibio ninguna categoria");
                  }
                  console.log(idDefinitivo);
                } else{
                  console.log("ERROR!!: "+ err);
                }
              })
              // query para insertar el perfil y su respectiva categoria
              conection.query(consulta2, {
                Per_descripcion: perfilCompleto,
                Cat_id: idDefinitivo
              }, (err, result)=>{
                if (err == null){
                  console.log("Los datos han sido guardados correctamente");
                  console.log("Perfil: "+idDefinitivo);
                } else{
                  console.log("ERROR!!: "+ err);
                  console.log("Id: "+idDefinitivo)
                }
              })
            })
          }
          
        }
        if (reiniciar_puntos_al_reiniciar_el_juego) {
          preguntas_correctas = 0
          preguntas_hechas = 0
          
        }
        npreguntas = [];
      }
    }

    npreguntas.push(n);
    preguntas_hechas++;
    escogerPregunta(n);
    setTimeout(() => {
      // esconde todo para mostrar el resultado final del test
      select_id("preguntas").setAttribute("action", "/test");
      select_id("btn2").style.display = "default";
      select_id("btn1").style.display = "default";
      select_id("encabezado").style.display = "default";
      select_id("resultado").style.display = "none";
    }, 20);
  }

function escogerPregunta(n) {
  // guarda todas las preguntas y las escoge
    pregunta = base_preguntas[n];
    select_id("categoria").textContent = pregunta.categoria;
    select_id("pregunta").textContent = pregunta.pregunta;
    select_id("numero").textContent = n;
    let pc = preguntas_correctas;
    if (preguntas_hechas > 1) {
        select_id("puntaje").textContent = pc + "/" + (preguntas_hechas - 1);
    } else {
        select_id("puntaje").textContent = "";
    }

    style("imagen").objectFit = pregunta.objectFit;
    desordenarRespuestas(pregunta);
    if (pregunta.imagen) {
        select_id("imagen").setAttribute("src", pregunta.imagen);
        style("imagen").height = "200px";
        style("imagen").width = "100%";
    } else {
        style("imagen").height = "0px";
        style("imagen").width = "0px";
        setTimeout(() => {
        select_id("imagen").setAttribute("src", "");
        }, 500);
    }
}

function desordenarRespuestas(pregunta) {
  // desordena las respuestas (actualmente solo muestra las respuesta no de forma desordenada)
    posibles_respuestas = [
      pregunta.respuesta,
      pregunta.incorrecta1,
    ];
    // posibles_respuestas.sort(() => Math.random() - 0.5);
  
    select_id("btn1").textContent = posibles_respuestas[0];
    select_id("btn2").textContent = posibles_respuestas[1];

}

btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
];

function oButton() {
  // sumatorio de las categorias
  const buttons = document.getElementById("btn1");
  preguntas_correctas++;
  if (buttons.textContent == "Me interesa"){
    if (select_id("categoria").textContent == "Ciencia_tecnologia"){
      ciencia_tecnologia++;
      console.log("Ciencia_tecnologia" + ciencia_tecnologia);
    } else if (select_id("categoria").textContent == "Ciencias_sociales"){
      ciencias_sociales++;
      console.log("Ciencias_sociales" + ciencias_sociales);
    } else if (select_id("categoria").textContent == "Arte_creatividad"){
      arte_creatividad++;
      console.log("Arte_creatividad" + arte_creatividad);
    } else if (select_id("categoria").textContent == "Ciencias economic, administ y financieras"){
      ciencias_eaf++;
      console.log("Ciencias economic, administ y financieras" + ciencias_eaf);
    } else if (select_id("categoria").textContent == "Ciencias_ecologicas_biologicas_salud"){
      ciencia_ebs++;
      console.log("Ciencias_ecologicas_biologicas_salud" + ciencia_ebs);
    } else {
      console.log("NINGUNO");
    }
  } else {
    console.log(buttons.textContent+" / ");
  }
}

function style(id) {
    return select_id(id).style;
}

function reiniciar() {
  // reinicia a la siguiente pregunta sin calcular nada
    escogerPreguntaAleatoria();
    fs.writeFileSync(ruta, document.documentElement.outerHTML, function (err) {
        console.log("ERROR!!: "+err);
    })
}
