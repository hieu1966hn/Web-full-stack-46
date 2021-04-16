const express = require('express');
const path = require('path'); // thư viện path: _dirname: thư mục hiện tại + với đằng sau. => đường dẫn tuyệt đối
const mongoose = require('mongoose');
const { log } = require('console');
const { resourceUsage } = require('process');
const FlashcardModel = require('./model/flashcard');





mongoose.connect('mongodb://localhost:27017/flashcard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) return console.log('Mongodb connect error');
    return console.log('Mongodb connected')
}
);


const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json({ extended: true }));


app.use(express.static('public'));

app.get('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params

    try {
        const foundCard = await FlashcardModel.findOne({ _id, id });
        if (!foundCard) {
            return res.send({ success: 0 })
        }
        res.send({ success: 1, data: foundCard })
    }
    catch (err) {
        res.status(500).send({ success: 0 })
    }
})

app.get('/api/flashcards/random', async (req, res) => {
    // code da chay
    try {
        const { category } = req.query;
        let randomCards = [];
        console.log("no way")
        if (category === 'all') {
            randomCards = await FlashcardModel.aggregate().sample(1)
        }
        else {
            randomCards = await FlashcardModel.aggregate().match({ category }).sample(1)
        }

        if (!randomCards.length) return res.send({ success: 0 });

        res.send({ success: 1, data: randomCards[0] });
    }
    catch (err) {
        console.log("err, this is err", err);
        res.status(500).send({ success: 0 })
    }
})

app.post('/api/flashcards', async (req, res) => { // ne de post
    const { frontSide, backSide, category } = req.body;
    try {
        const newCard = await FlashcardModel.create({
            frontSide,
            backSide,
            category
        });

        res.send({ success: 1 });
    }
    catch (err) {
        res.status(500).send({ success: 1 })
    }
    console.log(req.body);
});


// api update: => method: put
app.put('/api/flashcards/:id', async (req, res) => { // ne de post
    const { id } = req.params;
    const updateData = req.body;
    try {
        const newFlashcard = await FlashcardModel.findByIdAndUpdate(
            id, updateData, { new: true } //  tra them upsert: true la gi
        )
        res.send({ success: 1, data: updateData });
    }
    catch (err) {
        res.status(500).send({ success: 0 });
    }
    console.log(req.body);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/home.html'));
});

app.get('/create', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/create.html'));
});


app.get('/edit/flashcards/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/edit.html'));
});



app.listen(8080, (err) => {
    if (err) {
        return console.log("err", err);
    }
    console.log(`Server started at ${8080}`);
});
