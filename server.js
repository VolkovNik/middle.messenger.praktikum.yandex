import express from 'express';
import path from 'node:path';

const app = express();

app.use(express.static(path.resolve('./dist')));

app.listen(3000);

console.log('Server started');
