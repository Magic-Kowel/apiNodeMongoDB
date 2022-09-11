const { text } = require('body-parser');
const express = require('express');
const response = require('./../../network/response');
const controller = require('./controller');
const router = express.Router();
router.get('/',function(req,res) {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList)=>{
        response.success(req,res,messageList,200);
    }).catch(e =>{
        response.error(req,res,'Unexpected Error',500,e);
    });
});

router.post('/',function(req,res) {
    controller.addMessage(req.body.user,req.body.message)
    .then((fullMessage)=>{
        response.success(req,res,fullMessage,201); 
    })
    .catch(e =>{
        response.error(req,res,'Informacion invalida',400,'Error en el controlador');
    });
});

router.patch('/:id',function(req,res){
    console.log(req.params.id);
    const {id} = req.params;
    const {message} = req.body;
    controller.updateMessage(id,message)
    .then((data)=>{
        response.success(req,res,data,200);
    }).catch(e =>{
        response.error(req,res,'Error interno',500,e);
    });
    res.send('ok');
});
router.delete('/:id',function(req,res){
    const id = req.params.id;
    controller.deleteMessage(id)
    .then(()=>{
        response.success(req,res,`Usuario ${id} eliminado`,200);
    })
    .catch(e =>{
        response.error(req,res,'Error interno',500,e);
    });
});
module.exports = router;