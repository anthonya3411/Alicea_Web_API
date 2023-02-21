if(process.env.NODE_ENV === "production"){
    module.exports = {mongoURI:"mongodb://127.0.0.1:27017/gameEntries"}
}
else{
    module.exports = {mongoURI:"mongodb://127.0.0.1:27017/gameEntries"}
}