const { Mongoose } = require("mongoose");
const ContenedorMongoDB = require ("../../contenedores/ContenedorMongoDb")
const bcrypt = require('bcrypt');
const saltRounds = 10;

class ProductosDaoMongoDb extends ContenedorMongoDB {

    constructor() {
        super('usuarios',{
            email: {type: String, required: true},
            password: {type: String, required: true}
        })
    }

    async getByUser(username){
        try{
            let docs = false;
            docs = await super.getAll();
            for (const user of docs) {
                if (user.email === username){
                    return user;
                }
            }
            return false;
        }
        catch(error){
            throw Error("Error en getByUsername");
        }
    }
}

let newUser = {
    email: "gonzalo2@gmail.com",
    password: "123456"
}

const hola = async ()=>{
    let users = new ProductosDaoMongoDb();
    const hash = bcrypt.hashSync(newUser.password, saltRounds);
    newUser.password = hash;
    let aux = await users.save(newUser);
    console.log("Usuario agregado")
    console.log(await users.getAll())
}

const chau = async ()=>{
    let users = new ProductosDaoMongoDb();
    let user = await users.getById('61a558c172ff8e0f90057b71');
    if (bcrypt.compareSync('12345678', user.password)){
        console.log("SI MISMO PASS")
    } else{
        console.log("DIFERENTE PASS")
    }

}

//chau();
//hola();

module.exports = ProductosDaoMongoDb