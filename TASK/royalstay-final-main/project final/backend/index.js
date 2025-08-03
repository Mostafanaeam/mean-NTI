const server = require("node:http");
const http = server.createServer((req,res)=>{
    console.log(req.url);
    if (req.url === "/home") {
        res.end("Welcome To Home Page");
    } else if (req.url === "/about") {
        res.end("Welcome To About Us Page");
    } else {
        res.end("Sorry This Page Is Not Found");
    }
})
http.listen(3000,()=>{
    console.log("server is running in port 3000");
    
})