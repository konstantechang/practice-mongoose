const mongoose = require("mongoose");

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


 module.exports = Room;   //別的檔案require此Room model後即可做新增  刪除  修改  等