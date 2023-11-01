import app from './app.js';
import { PORT } from './config.js'
//import cron from 'node-cron'



/*
cron.schedule('* * * * *', () => {
    console.log('Hola!');
});
*/

app.listen(PORT);
console.log("servidor corriendo en puerto", PORT);