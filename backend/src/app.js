import express from "express";


const app = express();
const port = 8080;

app.get("/", ( req, res) =>{
    res.send("Hello FarmSmart")
})


app.listen(port, () => {
    console.log(`App listening http://localhost:${port}.`);
})