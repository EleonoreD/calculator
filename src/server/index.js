
import express from "express";
import os from 'os';

const app = express();

app.use(express.static('dist/client'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username+" update coucouc" }));
app.listen(4000, () => console.log('Listening on port 4000!'));