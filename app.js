const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { post } = require("request");
const app = new express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(request, response){
    response.sendFile(__dirname + "/signup.html");
})

app.post("/", function(request, response){
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const email = request.body.email;
    const data = {
        members: [
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstName,
                    LNAME : lastName
                }
            }

        ]
    };
    const subscriber = JSON.stringify(data);
    url = "https://us21.api.mailchimp.com/3.0/lists/51a5c14ae1"
    const options = {
        method : "POST",
        auth : "zubairmatani:22077427ad410f22485dfb56a9e04d5a-us21"
    }
    const req = https.request(url, options, function(res){
        if(res.statusCode === 200){
            response.sendFile(__dirname + "/success.html");
        }
        else{
            response.sendFile(__dirname + "/failure.html");
        }
        res.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    req.write(subscriber);
    req.end();

});

app.post("/failure", function(request, response){
    response.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Success");
});

//api 22077427ad410f22485dfb56a9e04d5a-us21
//audience id 51a5c14ae1