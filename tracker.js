const mongoose  = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require("axios");
mongoose.connect("mongodb://localhost:27017/money_tracker", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const { Transaction, transactionSchema } = require("../models/server")
const Register = require("../models/server");

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

//Schema 

const transactionSchema = new mongoose.Schema({
    description:{ 
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
    // 'expense' or 'income'
});

const Register=new mongoose.model("RegisterCollection",transactionSchema)

module.exports=Register;

/*app.post('/api/transactions', async (req, res) => {
    const { description, amount, type,total } = req.body
});*/

async function sendToServer(transactionSchema) {
    // Add logic here to send data to the server (e.g., using fetch API)
    try {
        const response = await axios.get('http://localhost:3000/api/transactions');
        console.log('Transaction added successfully:', response.data);
    }
    catch(error) {
        console.error('Error adding transaction:', error);
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'views/index');
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await transactions.find();
    res.json(transactions);
    app.use(express.urlencoded({extended:false}));
});
