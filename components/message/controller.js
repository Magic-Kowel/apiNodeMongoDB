const store = require('./store');
function addMessage(user,message){
    return new Promise((resolve,reject)=>{
        if(!user || !message){
            console.error('[messageController] No hay usuario o mensaje');
            reject('Los datos son incorrectos');
            return false;
        }
        console.log(message);
        const fullMessage = {
            chat:chat,
            user:user,
            message:message,
            date: new Date()
        }
        store.add(fullMessage);
        resolve(fullMessage);
    });
}
function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser));
    });
}
function updateMessage(id,message){
    return new Promise(async(resolve,reject) =>{
        if (!id || !message) {
            return reject('Invalid data');
        }
        const result = await store.updateText(id,message);
        return resolve(result);
    });
}
function deleteMessage(id) {
    return new Promise(async (resolve,reject)=>{
        if(!id){
            reject('Id invalido');
        }
        try {
            await store.remove(id);
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}