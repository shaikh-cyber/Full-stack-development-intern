const express = require('express');
const app = express(); //start the express js
const path = require("path");
const hbs = require("hbs")
const transactionSchema=require("./tracker");
const { urlencoded } = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.set("view engine","hbs")
app.use(express.urlencoded({extended:false}))

//index.js
app.get("/", (req,res) => { 
    res.render("views/index");
})
app.get("/home",(req,res) => {
    res.render("views/home")
})
app.post('/api/transactions', async (req, res) => {
    const data = {
    description:req.body.description, 
    amount:req.body.amount, 
    type:req.body.type,
    total:req.body.total 
}
try {
    const result = await transactionSchema.create(data);
    console.log('Transaction added successfully:', result);
    res.render("index");
} catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
/*app.get("/tracker", (req,res)=> {
    response.render("tracker")
})*/

app.listen(PORT, () => { //port number
    console.log(`Server is running on port ${PORT}`);
});

