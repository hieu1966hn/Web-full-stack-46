const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true // require co the xoa di binh thuong
    },
    password: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);
module.exports = mongoose.model("user", UserSchema); //user khong co "s" vi no sẽ tự động thêm "s" vào
