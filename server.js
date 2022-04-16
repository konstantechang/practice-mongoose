const http = require("http");
const mongoose = require('mongoose');
const Room = require('./models/room');   //Room的R大寫代表它是一個model
const headers = require("./headers");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({path:"./config.env"});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

// //連接資料庫(local)
// mongoose.connect('mongodb://localhost:27017/hotel').then( () => {
//     console.log("資料庫連線成功");
// } ).catch( (error) => {
//     console.log(error.reason);
// } );

//連接資料庫(remote heroku)
mongoose.connect(DB).then( () => {
    console.log("資料庫連線成功");
} ).catch( (error) => {
    console.log(error.reason);
} );



//第二種create法 

// Room.create({
//     name: "總統超級單人房3",
//     price: 2000,
//     rating: 4.5,
// }).then( () => {
//     console.log("資料寫入成功");
// } ).catch( error => {
//     console.log(error.errors);
// } );



//第一種create法:  new + save 
// const testRoom = new Room({
//     name: "總統洧杰單人房5",
//     price: 2100,
//     rating: 4.5
// });

// testRoom.save().then( () => {
//     console.log("新增資料成功")
// } ).catch(error => {
//     console.log(error);
// })

const requestListener = async (req, res) => {

    let body = "";
    req.on('data', chunk => {
        body += chunk;

    });

    if(req.url == "/rooms" && req.method == "GET"){
        const rooms = await Room.find();
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            rooms
        }));
            res.end();

    }else if(req.url == "/rooms" && req.method == "POST"){
        req.on( 'end' , async () => {
            try {//接資料有可能會失敗   因此加上 trycatch
                const data = JSON.parse(body);
                const newRoom = await Room.create(
                    {
                        name: data.name,
                        price: data.price,
                        rating: data.rating,
                    }

                )// end of Room.create()
                .then( () => {
                    console.log("新增資料  寫入成功!!")
                } )
                .catch( error => {//  如果 await 失敗, error 由外部的 catch()處理
                    return error;

                });
                res.writeHead(200, headers);
                res.write(JSON.stringify({
                    "status": "success",
                    rooms: newRoom,

                })); //end of res.write()
                res.end();
                
            } catch (error) {
                res.writeHead(400, headers);
                res.write(JSON.stringify({
                    "status":false,
                    "message": "欄位不正確， 或沒有此  ID",
                    "error": error,
                }))
                res.end();
            }
        }); // end of req.on()
    }else if(req.url == "/rooms" && req.method == "DELETE"){
        await Room.deleteMany({});
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            "status": "success",
            rooms: [],
        }));
        res.end();


    }else if(req.method == "OPTIONS"){
        res.writeHead(200, headers);
        res.end();
    }else{
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            "status": false,
            "message": "無此網站路由"
        }));
        res.end();
    }

}

const server = http.createServer(requestListener);
server.listen(process.env.PORT);