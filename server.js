const http = require("http");
const mongoose = require('mongoose');
const Room = require('./models/room');   //Room的R大寫代表它是一個model

//連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then( () => {
    console.log("資料庫連線成功");
} ).catch( (error) => {
    console.log(error.reason);
} );



//第二種create法 

Room.create({
    name: "總統超級單人房3",
    price: 2000,
    rating: 4.5,
}).then( () => {
    console.log("資料寫入成功");
} ).catch( error => {
    console.log(error.errors);
} );



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

const requestListener = (req, res) => {
    console.log(req.url);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005);