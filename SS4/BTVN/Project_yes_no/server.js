const express = require('express'); // dich thu vien da tai ve qua npm
const app = express(); //khoi tao 1 server sang 1 app
const path = require('path');



app.get('/', (req, res) => { // trình duyệt trả về giá trị
    console.log(__dirname); // bien co san cua nodeJS
    res.sendFile(path.resolve(__dirname,'./index.html')); // resolve: cong 2 cai path trong ngoac voi nhau => path tuy doi (giong concat)
});

// url + method
// url: /get-o-question method: get, post, put(update), delete
// get: gui duoc it du lieu hon post

app.listen(8080, (err) => { // app nay se lang nghe tai cong 8080
    if (err) throw err;
    console.log('server started');
});