//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){
	response.sendFile(__dirname + "/index.html");
	});

app.post("/",function(req,resp){
	var crypto = req.body.crypto;
	var fiat =req.body.fiat;
	var amount = req.body.amount;
	var options ={
		url:"https://apiv2.bitcoinaverage.com/convert/global",
		method:"GET",
		qs:{
			from:crypto,
			to:fiat,
			amount:amount
		}
	};	
/* 	var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
	var finalURL = baseURL + crypto + fiat; */
	request(options,function(error,response,body){
		//console.log(body);
		var data= JSON.parse(body);
		var price = data.price;
		var currentDate = data.time;
		resp.write("<p>The current date is :"+ currentDate + "</p>");
		resp.write("<h1>"+ amount + crypto + " is currently worth " + price + fiat + "</h1>");
		resp.send();
	});	
	
});	
	
app.listen(4000,function(){
	console.log("Server started on port 4000");
});