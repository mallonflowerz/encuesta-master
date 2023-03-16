const mysql = require("mysql")

module.exports = () => {
    return mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"testvocacionalbd"
    })
}


// const conection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"testvocacionalbbdd"
// })

// conection.connect((err)=>{
//     if(err){
//         console.log("Error: "+ err.message)
//     } else{
//         console.log("La conection fue exitosa")
//     }
// })

// conection.query("SELECT * FROM estudiantes", (err, rows) => {
//     if (err){
//         console.log("Error: "+ err.message)
//     } else{
//         console.log(rows)
//         console.log(rows.length)
//     }
// })

// conection.end()