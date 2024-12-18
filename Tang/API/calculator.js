const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
} );

app.post("/", (req,res)=>{
    // console.log(req.body);
    // console.log(req.body.num1);
    // console.log(req.body.num2);
    // res.send("Thank you for posting something");


    var num1 = Number(req.body.num1); // อ่านค่าจาก input1
    var num2 = Number(req.body.num2); // อ่านค่าจาก input2
    var result = num1 + num2; // รวมค่า
    res.send("The calculation result is : " + result); // แสดงผล
 
}); 

app.get("/bmiCalculator", (req, res)=>{
    //res.send("Hello World");
    res.sendFile(__dirname + "/bmiCalculator.html")
} );

app.post("/bmiCalculator", (req,res)=>{

    var w = Number(req.body.weight);
    var h = Number(req.body.height);
    var description = "";

    console.log(w);
    console.log(h);

    var BMI = (w / (Math.pow(h, 2))).toFixed(1);

    if( BMI < 18.5){
        description = "ผอมเกินไป";
    }
    else if( BMI >= 18.6 && BMI <= 22.9 ){
        description = "น้ำหนักปกติ เหมาะสม";
    }
    else if( BMI >= 23 && BMI <= 24.9 ){
        description = "น้ำหนักเกิน";
    }
    else if( BMI >= 25 && BMI <= 29.9 ){
        description = "อ้วน";
    }
    else{
        description = "อ้วนมาก";
    }

    res.send("คุณมีค่า BMI = " + BMI + " , คุณอยู่ในเกณฑ์ = " + description);
});

app.get('/kanye', async (req, res) => {
    try {
        const url = 'https://api.kanye.rest/'; // Replace with the URL you want to fetch data from
        const response = await axios.get(url);
        res.json(response.data); // Send the fetched data as a response
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});
 


app.listen(3000, ()=> {
   console.log ("Server is running on port 3000");
});