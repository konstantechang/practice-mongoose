const http = require("http");
const mongoose = require('mongoose');
//連接資料庫
mongoose.connect('mongodb://localhost:27017/hotel').then( () => {
    console.log("資料庫連線成功");
} ).catch( (error) => {
    console.log(error.reason);
} );

const roomSchema = {
    name:String,
    price: {
        type:Number,
        required: [true, "價格必填"]
    },
    rating: Number,
}

const Room = mongoose.model('Room', roomSchema);//小小特性  collection Room 進 mongoDB 會強制小寫 room,強制加s --> rooms

const requestListener = (req, res) => {
    console.log(req.url);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(3005);