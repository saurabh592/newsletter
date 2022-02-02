const express = require("express");
const bodyParser = require("body-parser")
const request = require("request")
const https= require("https");
const { STATUS_CODES } = require("http");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/index.html",function(req,res){
    const fnames=req.body.fname;
    const lnames=req.body.lname;
    const emails=req.body.email;
    const data={
        members: [
            {
                email_address: emails,
                status:"subscribed",
                merge_fields:{
                    FNAME:fnames,
                    LNAME:lnames,
                }
            }
        ]
    };

   const jsonData= JSON.stringify(data);
   const url="https://us14.api.mailchimp.com/3.0/lists/0d9606c9a0";
   const option={
       method:"POST",
       auth:"saurabh:d439956e22710db63c0e1c476e1efec9-us14",
   }
   const request= https.request(url,option,function(response){
    response.on("data",function(data){
        console.log(JSON.parse(data));
     if(response.statusCode === 200){
        
             res.sendFile(__dirname+"/success.html")
    
     }
     else{
      
            res.sendFile(__dirname+"/failure.html")
      
     }
    })
   })
   request.write(jsonData);
   request.end();

   
})
app.post("/success.html",function(req,res){
    res.redirect("/")
})
app.post("/failure.html",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("your server has started")
})



// listid:0d9606c9a0
// apikey:d439956e22710db63c0e1c476e1efec9-us14