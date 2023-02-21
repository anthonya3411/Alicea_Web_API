var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./modules/Game");
var Game = mongoose.model("game");

//example routes
app.get("/", function(req, res){
    res.redirect("gameList.html");
})

app.post("/saveGame", function(req, res){
    new Game(req.body).save().then(function(){
        res.redirect("index.html");
    });
})

app.get("/getGames", function(req, res){
    Game.find({}).sort({"game":1}).then(function(game){
        res.json({game});
    })
})

app.post("/deleteGame", function(req, res){
    console.log(`Game Deleted ${req.body.game}`);
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('gameList.html');
})

app.get("/getID::id", function(req, res){
    console.log(req.body.game);
    res.redirect("updatePage.html?id=" + req.params._id);
})

app.post("/updateGame", function(req, res){
    console.log(req.body);
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function(){
        res.redirect("gameList.html");
    })
})

app.post("/searchGames", function(req, res){
    console.log(req.body.game);
    Game.find({"game":req.body.game}).then(function(game){
        res.redirect("gameToSearch.html?game=" + game[0].game);
    }).catch(function(){
        res.redirect("gameToSearch.html?game=");
    })
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})
