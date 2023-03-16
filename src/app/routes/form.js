// const mysql = require("../../config/mysql");
// module.exports = app => {
//     const conection = mysql();
    
//     // insercion de datos en la bbdd
//     // app.post("/src/app/routes/form.js", (req, res) => {
//     //     res.redirect("/src/index.js");
//     //     const {nombre, apellido_uno, apellido_dos, edad, sexo, correo, ndli} = req.body;
//     //     const consulta = "select * from estudiantes where Est_nombre = '"+ nombre + "' and Est_apellido_uno = '"+ apellido_uno + "' and Est_apellido_dos = '"+ apellido_dos+"'";
//     //     conection.query(consulta, (err, result) => {
//     //         if (err == null){
//     //             console.log("Los datos han sido guardados correctamente");
//     //             // res.redirect("/");
//     //             const id = result[0].Est_id;
//     //             console.log(result);
//     //         } else{
//     //             console.log("ERROR!!: "+ err);
//     //         }
//     //     })
        
        
//     //     // conection.query("INSERT INTO estudiantes SET?", {
//     //     //     Est_nombre: nombre,
//     //     //     Est_apellido_uno: apellido_uno,
//     //     //     Est_apellido_dos: apellido_dos,
//     //     //     Est_edad: edad,
//     //     //     Est_sexo: sexo,
//     //     //     Est_correo: correo,
//     //     //     Est_nombreInstitucion: ndli
//     //     // }, (err, result) => {
//     //     //     if (err == null){
//     //     //         console.log("Los datos han sido guardados correctamente");
//     //     //         // res.redirect("/");
//     //     //     } else{
//     //     //         console.log("ERROR!!: "+ err);
//     //     //     }
//     //     // })
//     // })

//     // app.post("/", (req, res) =>{
//     //     res.render("login");
//     //     console.log(req.body);
//     // })
// }