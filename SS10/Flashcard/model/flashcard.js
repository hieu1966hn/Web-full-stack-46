const mongoose = require('mongoose');

// định nghĩa schema: 
const schema = new mongoose.Schema({
    frontSide: {
        type: String,
        require: true
    },
    backSide: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
        enum: ['code', 'vocal', 'other'],
        default: 'other'
    },
    isRemember: {
        type: Boolean,
        default: false
    }
});

// sau khi định nghĩa schema thì các bạn muốn thêm ngoài ở trương nào đều không đc.
// Trừ khi define trong Schema => mới save được trong database của mn 

const model = mongoose.model('card', schema);

module.exports = model;