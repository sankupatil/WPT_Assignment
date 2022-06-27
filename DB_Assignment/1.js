let dbparams=
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'newdatabase',
	port:3306
}; 
const mysql = require('mysql2'); //fate
const con = mysql.createConnection(dbparams);//fate  

const express = require('express');
const app = express();

app.use(express.static("vs"));


app.get("/getpincode",(req,resp)=>{
    let input = req.query.x;
    console.log(input);

    let output = { status:false,pincodedetails:{pincode:00, areaname:''} };

    con.query('select * from pin where pincode=?',[input],(error,rows)=>
    {
        if(rows.length > 0)
        {
            output.status=true;
            output.pincodedetails= rows[0];
        }
        resp.send(output);

    });

});



app.get("/addpincode",(req,resp)=>{
    let input ={pincode:req.query.x,areaname:req.query.y};
    console.log(input);

    let output = true;
    con.query('insert into pin(pincode,areaname) values (?,?)',
    [input.pincode,input.areaname],(error,rows)=>
    {
        if(error)
        {
            
        }
        else if(rows.affectedRows>0)
        {
            output=true
        }
        resp.send(output);

    });

});



app.get("/update",(req,resp)=>{
    let output = false;
    let input ={pincode:req.query.x,
        areaname:req.query.y};
    console.log(input);

   
    con.query('update pin set areaname = ? where pincode=?',
    [input.areaname,input.pincode],(error,rows)=>
    {
        if(error)
        {
            console.log(error);
        }
        else if(rows.affectedRows>0)
         output=true
        
        resp.send(output);

    });

});















app.listen(900, function () {
    console.log("server listening at port 900...");
});