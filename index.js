import express from 'express'
import cors from 'cors'
import twilio from 'twilio'

const port = process.env.PORT || 4000

const app = express()

app.use(express.json())

app.use(cors())

app.get('/',(req,res,next)=>{
    res.send("hello world From testing")
})

function makingcalls(){
    const accountSid  = process.env.TWILIO_ACCOUNT
    const authToken = process.env.TWILIO_TOKEN
    const client = twilio(accountSid, authToken);
    client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+916369417210',
         from: '+12569738178'
       })
      .then(call => console.log(call.sid));
    console.log("function called successsfullly")
}

function makemessages(mobile){
    const accountSid  = process.env.TWILIO_ACCOUNT
    const authToken = process.env.TWILIO_TOKEN
    const client = require('twilio')(accountSid, authToken);
    client.messages
    .create({
    from: '+12569738178',
    to: `+${mobile}`,
    body: `You are about to reach the Destination `,
    }).then(message => console.log(message));
}

app.post('/makecalls',(req,res)=>{
    const {mobile} = req.body
    makingcalls(mobile)
    res.send(mobile)
})

app.post('/makemsg',(req,res)=>{
    const {mobile} = req.body
    makemessages(mobile)
    res.send(mobile)
})

app.listen(port,()=>{console.log(`Server running on ${port}`)})
//sanjaikumar451
//XpOGV9sKk3YNiJoW