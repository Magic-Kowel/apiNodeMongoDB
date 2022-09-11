const db = require('mongoose');
async function connect(){
    require('dotenv').config();
    //const uri ='mongodb+srv://josue:josuemagico@cluster0.3gppapa.mongodb.net/?retryWrites=true&w=majority';
    db.Promise = global.Promise;
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
    await db.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('[db connection] Database connected')
        })
        .catch( error => {
            console.error('[db connection] Connection failed', error.message) 
    });
}
module.exports = connect;