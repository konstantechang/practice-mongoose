const http = require("http");
const mongoose = require('mongoose');
//連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then( () => {
    console.log("資料庫連線成功");
} ).catch( (error) => {
    console.log(error.reason);
} );

const roomSchema = new mongoose.Schema({
    name:String,
    price: {
        type:Number,
        required: [true, "價格必填"]
    },
    rating: Number,
    createdAt: {
        type: Date,
        default: Date.now,
        select: false,
    }
}, 
{
    versionKey:false

});

const Room = mongoose.model('Room',
 roomSchema);//小小特性  collection Room 進 mongoDB 會強制小寫 room,強制加s --> rooms

//第二種create法 

Room.create({
    name: "總統超級單人房2",
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