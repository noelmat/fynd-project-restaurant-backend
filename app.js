require('./data/init');

const express = require('express');



const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: false }));



const PORT = 3000;

app.listen(PORT, (error)=> {
    if(error){
        return console.log(error.message);
    }
    console.log(`Server started on http://localhost:${PORT}`);
});