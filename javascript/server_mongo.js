const express=require('express');
const cors=require('cors');
const app=express();
const port=3000;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//traernos la cadena de conexion de mongodb
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri='mongodb+srv://joshua0902:Piolin09@clusterjnml.qgpkn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterJNML'


//creamos la conexion
const cliente=new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true,

    }
});

async function run(){
    try{
        await cliente.connect();
        await cliente.db("admin").command({ping:1});
        console.log("Conexion exitosa");
    }finally{
        await cliente.close();
    }
}

app.get('/',async(req,res)=>{
    await cliente.connect();
    const db=cliente.db("sample_mflix");
    const collection=db.collection("movies");
    const resultado=await collection.find({poster:{$ne:null}},{_id:0,title:1,plot:1,poster:1}).toArray();
    res.json(resultado);
});
//npm install cors
app.listen(port, async() =>{
    console.log(`Server attending at ${port}`);
    await run();
});

