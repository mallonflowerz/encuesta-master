// este archivo ejecuta el archivo "app.ejs"
const app = require("../src/config/server");
// '' C:/Users/ADSI/Documents/siuwi/encuesta-master/src/app/views/app.ejs
const ruta = 'C:/Users/marlo/Desktop/a/Nueva_carpeta/encuesta-master/src/app/views/app.ejs'
const ruta2 = 'C:/Users/ADSI/Documents/siuwi/encuesta-master/src/app/views/alert.ejs'

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
let id;
let idCategoria = [];
let idDefinitivo

// module.exports = app;

global.window = dom.window;
global.document = dom.window.document;

// require("../src/app/routes/form")(app);

app.listen(app.get("port"), () => {
  //inicio del servidor
  app.get("/login", (req, res) => {
      res.render("login");
      // conection.query("select * from estudiantes.id where Est_nombre?", {
      //     Est_id: id
      // })
  })
  console.log("puerto del server: ", app.get("port"));

  app.post("/src/app/routes/form.js", (req1, res1) => {
    res1.redirect("/src/index.js");
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
          // res.redirect("/");
      } else{
          console.log("ERROR!!: "+ err);
      }
  })    
    const consulta = "select * from estudiantes where Est_nombre = '"+ nombre + "' and Est_apellido_uno = '"+ apellido_uno + "' and Est_apellido_dos = '"+ apellido_dos+"'";
    conection.query(consulta, (err, result) => {
        if (err == null){
            console.log("Los datos han sido guardados correctamente");
            // res.redirect("/");
            id = result[0].Est_id;
            console.log(result);
        } else{
            console.log("ERROR!!: "+ err);
        }
    })
  })

  app.get("/src/index.js", (req, res) => {
    oButton();
    escogerPreguntaAleatoria();
    fs.writeFileSync(ruta, document.documentElement.outerHTML, function (err) {
        console.log("ERROR!!: "+err);
        
    })
    res.render("app");
  })

  // app.post("/src/mi", (req, res) => {
  //   res.render("app");
  //   oButton();
  // })

  app.get("/verific.js", (req, res) => {
    res.render("login");
  })

  app.get("/src/app/routes/form.js", (req, res) => {
    res.render("login");
  })

  // app.post("/src/index.js", (req, res) => {
  //   fs.writeFileSync(ruta, document.documentElement.outerHTML, function (err) {
  //     console.log("ERROR!!: "+err);
  //   })
  //   res.render("app");
  //   escogerPreguntaAleatoria();
  //   // 
  // })

  app.post("/src/index.js/stop", (req, res) => {
    reiniciar();
    res.render("app");
  })

  // app.get("/finish", (req, res) =>{
  //   console.log("TERMINO");
  // });
}) 

// FUNCIONES DEL TEST

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

let juego_finish = false;

function select_id(id) {
    return document.getElementById(id);
}

function escogerPreguntaAleatoria() {
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
        // select_id("preguntas").setAttribute("action", "/finish");
        if (mostrar_pantalla_juego_términado) {
          // juego_finish = true;
          perfil=(Math.max(arte_creatividad, ciencias_sociales, ciencias_eaf, ciencia_tecnologia, ciencia_ebs));
          perfilMasalto = arte_creatividad == perfil ? "Arte y Creatividad" :
          ciencias_sociales == perfil ? "Ciencias Sociales" :
          ciencias_eaf == perfil ? "Ciencias economic, administ y financieras" :
          ciencia_tecnologia == perfil ? "Ciencia y Tecnologia" :
          ciencia_ebs == perfil ? "Ciencias ecolog, biolog y salud" : null;
          console.log("Perfil mas alto: "+perfilMasalto);

          // select_id("preguntas").setAttribute("action", "/");
          select_id("btn2").style.display = "none";
          select_id("btn1").style.display = "none";
          select_id("btn3").style.display = "default";
          select_id("encabezado").style.display = "none";
          select_id("resultado").style.display = "default";

          let perfilCompleto; 
          let categoriaCompleta;

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
          // juego_finish=false;

          if (perfilCompleto !== null) {
            app.post("/", (req, res) => {
              res.redirect("login");
              const consulta2 = "INSERT into perfiles set?";
              const consulta3 = "select Cat_nombre from categorias";
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
      select_id("preguntas").setAttribute("action", "/src/index.js");
      select_id("btn2").style.display = "default";
      select_id("btn1").style.display = "default";
      select_id("encabezado").style.display = "default";
      select_id("resultado").style.display = "none";
    }, 1500);
  }

function escogerPregunta(n) {
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
    posibles_respuestas = [
      pregunta.respuesta,
      pregunta.incorrecta1,
    ];
    // posibles_respuestas.sort(() => Math.random() - 0.5);
  
    select_id("btn1").textContent = posibles_respuestas[0];
    select_id("btn2").textContent = posibles_respuestas[1];

}

let suspender_botones = false;

btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
];

function oButton() {
  // if (suspender_botones) {
  //   return;
  // }
  // suspender_botones = true;
  const buttons = document.getElementById("btn1");
  preguntas_correctas++;
  if (buttons.textContent == "Me interesa"){
    // console.log("Este es el select: "+select_id("categoria").textContent);
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
  // setTimeout(() => {
  //   // reiniciar();
  //   // suspender_botones = false;
  // }, 1000);
}

function style(id) {
    return select_id(id).style;
}

function reiniciar() {
    for (const btn of btn_correspondiente) {
      btn.style.background = "white";
    }
    escogerPreguntaAleatoria();
    fs.writeFileSync(ruta, document.documentElement.outerHTML, function (err) {
        console.log("ERROR!!: "+err);
    })
}
