const express = require("express");

const router = express.Router();
const fs = require('fs')
var Mailgun = require("mailgun-js");

const { DownloaderHelper } = require("node-downloader-helper");

require("dotenv/config");


const domain = "mail.bankwithmint.com";


router.get("/", (req, res) => {
  res.send("we are on posts");
});

router.get("/:mail", (req, res) => {
  const dl = new DownloaderHelper(
    "https://test-upload-jide.s3.eu-west-2.amazonaws.com/2020-04-03T05%3A56%3A46.043207200Jideofor_Nwoke_Java_(2).pdf",
    __dirname
  );

  dl.on("end", () =>{
    var path = require("path");
    const fileNameArray = "https://test-upload-jide.s3.eu-west-2.amazonaws.com/2020-04-03T05%3A56%3A46.043207200Jideofor_Nwoke_Java_(2).pdf".split("/")
    const fileName = fileNameArray[(fileNameArray.length-1)]
    console.log(fileName)
    var fp = path.join(__dirname, fileName);
    var mailgun = new Mailgun({ apiKey: process.env.API_KEY, domain: domain });
    var data = {
      from: "admin@mail.bankwithmint.com",
      //The email to contact
      to: req.params.mail,
      //Subject and text data
      subject: "Hello from Mailgun",
      html: `'<div style="width: 90%; margin: 5em auto;
    box-shadow: 0 0 10px rgba(0,0,0,.9);">
     <div>
       <div>
         <div style="background-color: #00bfa6; height: 3rem; width: 100%">
             <h2 style="text-align: center; color: white;
              padding-top: 10px;">Bus-connect</h2>
         </div>
         <h4 style="text-align: center">Hi! ${req.params.mail}</h4>
       </div>
       <div style=" padding: 0px 20px 20px 20px">
         <div>
           <p>Please Click on the button below to verify your email</p>
           <p>Kindly ignore this mail if you did not register on our platform</p>
           <button style="color: white; background-color: #00bfa6;
            border: none; border-radius: 10px; text-align: center;
             padding: 10px;">
  
             <a  href="/verifyEmail?token="
              style="text-decoration: none;
              color: white;">Verify Account</a></button>
         </div>
         <div>
           <h3 style="text-align: center">Thank you</h3>
           <h3 style="text-align: center">
           Please do not reply, this is an autogenerated email.</h3>
         </div>
       </div>
     </div>
   </div>`,
      attachment: fp,
    };
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        res.json({ message: err });
        console.log("got an error: ", err);
      }
      else {
        res.json({ message: "success" });
        console.log(body);
    
      }
    });
    fs.unlinkSync(fp)
  });
  dl.start();
  
});

module.exports = router;