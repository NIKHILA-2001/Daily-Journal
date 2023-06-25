const express= require("express");
const bodyParser = require("body-parser");
const homeStartingContent ="Welcome to The Daily Journal, an online platform where we celebrate the power of storytelling. We invite you to join us as we embark on a journey through the art of journaling, capturing the essence of daily life and turning it into meaningful narratives.So, grab a pen and a notebook, and let's dive into the world of daily journaling together!"
const aboutStartingContent="Our online daily journal provides a convenient and accessible platform for you to write and maintain your journal digitally. With the advancements in technology, you no longer need a physical notebook to record your thoughts and experiences. Our digital journaling platform offers a range of features and benefits that enhance your journaling experience.";
const contactStartingContent="If you would like to get in touch with us, we'd love to hear from you! Whether you have a question, feedback, or a business inquiry, please use the contact information below. We will do our best to respond to you promptly.";
const _ = require("lodash");

app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home",{
        homeContent:homeStartingContent, 
        postContents:posts
    });
});

app.post("/",function(req,res){
    console.log(req.body);
    res.render("compose");
});

app.post("/compose",function(req,res){
    let x=req.body.contentTitle;
    if(x!==null && x!=""){
    let post = {
        title : req.body.contentTitle,
        content :req.body.contentBody
    }
    posts.push(post);
    }
    res.redirect("/");
});

app.get("/compose",function(req,res){
    res.render("compose");
});

app.get("/about",function(req,res){
    res.render("about",{aboutContent:aboutStartingContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactContent:contactStartingContent});
});

app.get("/post/:postname",function(req,res){
    let reqTitle = _.lowerCase(req.params.postname);
    posts.forEach(function(post){
        let title=_.lowerCase(post.title);
        if(title==reqTitle){
            console.log("Match found!");
            res.render("post",{title:post.title,
                content:post.content});
        }
    });
});

app.listen(3000,function(){
    console.log("Server running on Port 3000");
});