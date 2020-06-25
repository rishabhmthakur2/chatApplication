const express = require('express');
const path = require('path');
const app = express();

const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

app.listen(3000, ()=>{
    console.log('Server listening on 3000');
});