import express from 'express';
import bodyParser from 'express';
import {router} from './routes/router.js';
import path from 'path';
import {PORT} from './config.js'
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

const path_static_files = path.join(__dirname, "..", "public");
app.use(express.static(path_static_files));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride((req: express.Request, res: express.Response)=>{
    if (req.body && typeof req.body === 'object' && "_method" in req.body){
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`);
})
