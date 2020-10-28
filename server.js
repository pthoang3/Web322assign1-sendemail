var express = require("express");
var app = express();
var path = require("path");
var multer = require("multer");
var nodemailer = require("nodemailer");

// MODULE INITIALIZATION
var HTTP_PORT = process.env.PORT || 8080;

// START-UP FUNCTIONS
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

const STORAGE = multer.diskStorage({
    destination: "./public/photos/",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const UPLOAD = multer({storage: STORAGE});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pthoang3web322@gmail.com',
        pass: 'web322HoangThuy'
    }
});

function onHttpStart() {
    console.log("Express http server listing on: " + HTTP_PORT);
}

app.use(express.static("views"));
app.use(express.static("public"));

// ROUTES 
app.use(express.static('views'));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/views/index.html"));
});


app.get("/BecomeAHost", function(req,res){
    res.sendFile(path.join(__dirname, "/views/BecomeAHost.html"));
    //res.render('BecomeAHost',{data: myUser, layout: false});
});

app.get("/dashboard", function(req,res){

    res.sendFile(path.join(__dirname, "/views/dashboard.html"));
});

app.post("/contact-for-process", (req, res) => {
    const FORM_DATA = req.body;
    
        res.sendFile(path.join(__dirname, "/views/dashboard.html"));

    var emailOptions = {
        from: 'pthoang3web322@gmail.com',
        to: FORM_DATA.email,
        subject: 'Test email from Node.js using nodemailer',
        html: '<p>Hello ' + FORM_DATA.fname + '</p><p>Thank-you for filling out our form.</p>'
    };

    transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
            console.log("ERROR: " + error);
        } else {
            console.log("SUCCESS: " + info.response);
        }
    });

});

// setup http server to listen opn the port designated above
app.listen(HTTP_PORT, onHttpStart);

