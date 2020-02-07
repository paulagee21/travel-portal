import * as express from 'express';
import *  as path from 'path';
import * as cors from 'cors';
import api from './api';

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));
app.use('/', api);
app.get("/images/*", (req, res) => {
  const image_name = req.params[0];
  const prefix = path.join(__dirname, '/static/');
  res.sendFile(path.join(prefix, image_name));
});

const server = app.listen(PORT, () => {
  console.log('API ready')
});