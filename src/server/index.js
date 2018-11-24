
import express from "express";
import bodyParser from "body-parser";
import os from 'os';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist/client'));
app.post('/api/do', (req, res) => {
    setTimeout( () => {
        res.send({ value: parseInt(req.body.a)+parseInt(req.body.b) });
    }, 4000);
});

app.listen(4000, () => console.log('Listening on port 4000!'));