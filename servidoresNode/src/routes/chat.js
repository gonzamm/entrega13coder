const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../daos/chat/ChatDaoFirebase");
const { normalize, schema, denormalize } = require("normalizr");

const app = express();
const { Router } = express;
const router = new Router();


let chat = new Contenedor;

//GET TODO EL CHAT
router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();

      //NORMALIZR
      const schemaAutor = new schema.Entity('author')
      const mySchema = new schema.Array({
        author: schemaAutor
      })

      //Chat Normalizado
      const normalizedChat = normalize(aux[0].arrayChat, mySchema)

      //Chat Denormalizado
      const denormalizeChat = denormalize(normalizedChat.result, mySchema, normalizedChat.entities)

      //Respuesta
      res.send({normalizr: normalizedChat});

    }
    catch(error){
      throw Error("Error en todos los chats")
    }  
  }    
  getTodos();

});

//POST CON CHAT
router.post("/", (req, res) => {

  async function saveChat(){
    try {
      //Traigo el chat y agrego el nuevo mensaje
      let aux = await chat.getAll();
      aux[0].arrayChat.push(req.body);
      await chat.update(aux[0])
      res.send('chat agregado');      
    } catch (error) {
      throw Error("Error en post Chat");
    }
  }
  saveChat();
});


//EXPORT MODULO ROUTER
module.exports = router;
