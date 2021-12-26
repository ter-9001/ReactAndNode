const express = require('express');
const cors = require('cors');
var users = require('./database/users.json')
const app = express();
var fs = require('fs');
const { use } = require('express/lib/application');

app.use( express.json())
app.use(cors());


app.get("/users", (req, res, next) =>
{
   
    res.status(200).send(users)
    
});

app.get("/users/:id", (req, res, next) =>
{
    res.sendStatus(200);
})


app.get("/talk/:id", (req, res, next) =>
{
      res.status(200).send("Funcionando!");
})

app.put("/users/:id", (req, res, next) => {


    users = users.map(element => {
        
        if(Number(req.params.id) == Number(element.id))
         {
            console.log("Vai!")    
            element = req.body;
            
         }

         return element;
    });


    fs.writeFile('./database/users.json', JSON.stringify( users , null, "\t") , ()=> {});
    res.status(200).send(users)
})

app.post("/users", (req, res, next) => {

    users.push(req.body)

    fs.writeFile('./database/users.json', JSON.stringify( users , null, "\t") , ()=> {});
    res.status(200).send(users);
})



app.listen( 5000, () =>{
    console.log("Ouvindo na porta 5000")
})