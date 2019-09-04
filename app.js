const Express =require('express')
const Mongoose=require('mongoose')

var app =new Express()
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
var request=require('request')

Mongoose.connect("mongodb://localhost:27017/apidb")
app.use(Express.static(__dirname+"public"));


const ApiModel=Mongoose.model("apicollections",{
    School:String,
    Principal:String,
    Students:String,
    Rice:String,
    Veg:String})

app.post('/read',(req,res)=>{
    var Info=ApiModel(req.body);
    var result=Info.save((error,data)=>{
        if(error){
            throw error;
            res.send(error)
        }
        else{
            res.send("<script>alert('Added Successfully')<script>")
        }
    });
});

const Apiurl1 ="http://localhost:3700/read"


app.get('/view',(req,res)=>{
    var result=ApiModel.find((error,data)=>{
        if(error){
            throw error;
            res.send(error)
        }
        else{
            res.send(data)
        } 
    })
})


const Apiurl2 ="http://localhost:3700/view"

app.post('/search',(req,res)=>{
    var item=req.body.School;
    var result=ApiModel.find({School:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error)
        }
        else
        {
            res.send(data)
        }
    });
});

const Apiurl3 ="http://localhost:3700/search"


app.post('/update',(req,res)=>{
    const x=req.body._id;
    const school=req.body.School;
    const principal=req.body.Principal;
    const students=req.body.Students;
    const rice=req.body.Rice;
    const vegetables=req.body.Veg;

    console.log(x);
    var result=ApiModel.update({_id:x},{$set:{School:school,Principal:principal,
        Students:students,Rice:rice,Veg:vegetables}},(error,data)=>{
            if(error){
                throw error;
                res.send(error)
            }
            else{
                res.send(data);
            }
        });
});

const Apiurl4 ="http://localhost:3700/update"


app.post('/delete',(req,res)=>{
    var item =req.body._id;
    var result=ApiModel.deleteOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error)
        }
        else{
            res.send(data);
        }
    });
});

const Apiurl5 ="http://localhost:3700/delete"


app.listen(3700,()=>{
 console.log("server running on port number 3700 ")
})