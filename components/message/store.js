const Model = require('./model');
function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

async function getMessages(user) {
    return new Promise((resolve,reject)=>{
        let filter = {};
        if (user) {
          filter = {user:user};
        }
        Model.find(filter)
          .populate('user')
          .exec((error,populated)=>{
            if(error){
              reject(error);
              return false;
            }
            resolve(populated);
          });
  });
}
async function updateText(id,message){
    const foundMessage = await Model.findOne({
        _id:id
    });
    foundMessage.message = message;
    const newMessage = foundMessage.save();
    return newMessage;
}
function removeMessage(id){
  return Model.deleteOne({
    _id:id
  });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText:updateText,
    remove:removeMessage
};