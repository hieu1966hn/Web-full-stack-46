const express = require('express'); // dich thu vien da tai ve qua npm
const fs = require('fs');
const app = express(); //khoi tao 1 server sang 1 app
const path = require('path');


app.use(express.static('public')); // cu phap nay  (nen de tren dau vi thu tu uu tien)
/**
 * sinh ra cac duong dan nhu sau
 * app.get('/ask/index.html', ()=>{}) va no se bat dau tu duong dan ben trong (ask || home)
 */

app.use(express.urlencoded({ extended: true })); // doc dc nhung du lieu ma client gui len;
// giong google dich tu dang 010101001=> content va gan cho res.body = content => nhay vao function post


app.use(express.json());

app.get('/', (req, res) => { // trình duyệt trả về giá trị
    console.log(__dirname); // bien co san cua nodeJS
    res.sendFile(path.resolve(__dirname, './public/ask/index.html')); // resolve: cong 2 cai path trong ngoac voi nhau => path tuy doi (giong concat)
});


// app.get('/style.css', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './style.css'));
// })

app.post('/create-question', (req, res) => {
    const data = require('./data.json');
    const newQuestion = {
        _id: data.length + 1,
        content: req.body.content,
        yes: 0,
        no: 0
    };
    const newData = [...data, newQuestion]
    console.log('vao day', newQuestion);
    fs.writeFileSync('data.json', JSON.stringify(newData));
    res.send({
        success: 1,
        data: newQuestion
    });
});



app.get('*', (req, res) => { // trình duyệt trả về giá trị
    console.log(__dirname); // bien co san cua nodeJS
    res.sendFile(path.resolve(__dirname, './public/404/index.html')); // resolve: cong 2 cai path trong ngoac voi nhau => path tuy doi (giong concat)
});





// url + method
// url: /get-o-question method: get, post, put(update), delete
// get: gui duoc it du lieu hon post

app.listen(8080, (err) => { // app nay se lang nghe tai cong 8080
    if (err) throw err;
    console.log('server started');
});