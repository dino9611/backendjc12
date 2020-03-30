// const http=require('http')
// const fs=require('fs')

// const unyu=fs.readFileSync('unyu.html','utf8')

// var server=http.createServer((req,res)=>{
//     console.log('Request : ' +req.url)
//     res.writeHead(200 , {'Content-Type' :'application/json'})
//     var obj={
//         nama:req.url==='/'?'dino':'doni',
//         kelamin:'male',
//         password:'qwe',
//         email:'dinotestes@gmail.com'
//     }
//     res.end(JSON.stringify(obj))
// })

// server.listen(8080)

// console.log('server run on  port 8080')

const express=require('express')
const fs=require('fs')
const bodyparser=require('body-parser')
const app=express()
const PORT=5000

app.use(bodyparser.json())//buat user kirim data ke server
app.use(bodyparser.urlencoded({ extended: false }));//buat user kirim data ke server

var users=[
    {   
        id:1,
        username:'dino',
        password:'qwe'
    },
    {
        id:2,
        username:'irza',
        password:'qwe'
    },
    {
        id:3,
        username:'zion',
        password:'qwe'
    },
]

app.get('/',(req,res)=>{
    res.status(200).send({nama:'dio'})
})
app.get('/admin/:bebas',(req,res)=>{
    console.log(req.params.bebas)
    res.send(`<h1>Selamat datang Admin ${req.params.bebas} </h1>`)
})
app.get('/users',(req,res)=>{
    res.send(users)
})
app.post('/users',(req,res)=>{
    console.log(req.body)
    users.push({...req.body,id:users.length+1})
    res.send(users)
})
app.put('/users/:id',(req,res)=>{
    users[req.params.id-1]={...users[req.params.id-1],...req.body}
    res.send(users)
})
app.get('/deleteusers/:id',(req,res)=>{
    users.splice(req.params.id-1,1)
    res.send(users)
})
app.get('/unyu',(req,res)=>{
    fs.readFile('unyu.html',(err,data)=>{
        res.send(data.toString())
    })
})


app.listen(PORT,()=>console.log('server jalan di '+PORT))


