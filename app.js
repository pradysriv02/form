const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const port = process.env.PORT || 3000;

/*app.get sends a GET request from browser to server. Request is sent to / i.e. home directory.*/
//After the request is made, a callback function defines the steps to be taken after the request is made.*/ 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){  
    res.sendFile(__dirname+ "/signup.html" );         
});

/* After the form data is sent to / i.e. our home directory by using the post method, app.post allows us to write codes on what to do after
   data is sent to /. A callback function allows us to write all the functionalities on what we have to do with our data.
   Body Parser allows us to tap into each piece of data using req.body*/

app.post("/",function(req,res){         
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const password = req.body.pword;

    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/1abdbb5849";
    const options = {
        method : "POST",
        auth : "prady1:6460b7878be3cba9ad1e9f1a20a7b5de-us21"
    }
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(port,'0.0.0.0',function(){
    console.log("Server running at 3000 port");
})

//6460b7878be3cba9ad1e9f1a20a7b5de-us21
//1abdbb5849