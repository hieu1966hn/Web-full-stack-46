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



app.get('/ask', (req, res) => { // trình duyệt trả về giá trị
    console.log(__dirname); // bien co san cua nodeJS
    res.sendFile(path.resolve(__dirname, './public/ask/index.html')); // resolve: cong 2 cai path trong ngoac voi nhau => path tuy doi (giong concat)
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/home/index.html'))
})

app.get('/detail/:idQuestion', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/detail/detail.html'));
    // const {idQuestion} = req.params;
    const { idQuestion } = req.params;
    // const { type } = req.body;

    let data;
    try {
        data = JSON.parse(fs.readFileSync('data.json'))
    } catch (err) {
        data = [];
    }

    const foundQuestion = data.find(
        question => {
            const sameId = parseInt(question.__id) === parseInt(idQuestion);
            return sameId;
        }
    );

    if (!foundQuestion) {
        return res.send({ success: 0, })
    }
})

app.get('/random-question', (req, res) => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync('data.json'))
    } catch (err) {
        data = [];
    }

    const randomIdx = Math.floor(Math.random() * data.length)
    const foundQuestion = data[randomIdx];

    if (foundQuestion) {
        return res.send({
            success: 1,
            data: foundQuestion
        })
    }
    return res.send({
        success: 0,
        data: []
    })
});



app.put('/add-vote/:idQuestion', (req, res) => { // express hỗ trợ bắt pragram để tránh phải tạo nhiều
    // const idQuestion = req.params.idQuestion;
    const { idQuestion } = req.params;
    const { type } = req.body;

    let data;
    try {
        data = JSON.parse(fs.readFileSync('data.json'))
    } catch (err) {
        data = [];
    }

    const foundQuestion = data.find(
        question => {
            const sameId = parseInt(question.__id) === parseInt(idQuestion);
            return sameId;
        }
    );


    // nếu người dùng gửi lên ...

    if (!foundQuestion) {
        return res.send({
            success: 0,
            data: null
        })
    }
    // tương tự bên trên
    if (type === 'yes' || type === 'no') {
        foundQuestion[type]++;
    }
    else {
        return res.send(({
            success: 0,
            data: null
        }))
    }


    fs.writeFileSync('./data.json', JSON.stringify(data))

    return res.send({
        success: 1,
        data: foundQuestion
    })
});


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