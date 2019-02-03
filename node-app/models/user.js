const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    identity: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now()  // 该字段的默认值
    }
})

module.exports = User = mongoose.model("users", UserSchema);  // 根据模型创建user表
