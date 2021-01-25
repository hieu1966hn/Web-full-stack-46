// const e = require("express");
// const { json } = require("express");

let idQuestion = '';

const contentDOM = document.getElementById('contentQuestion');
const getRandomQuestion = async() => {
    // fetch('http://localhost:8080/random-question')
    //     .then(res => res.json())
    //     .then(res => {
    //         if (res.success) {
    //             contentDOM.innerHTML = res.data.content
    //         }
    //     })

    const res = await fetch('http://localhost:8080/random-question');
    const jsonRes = await res.json();
    if (jsonRes.success) {

        contentDOM.innerHTML = jsonRes.data.content
        idQuestion = jsonRes.data._id;
    }
}


getRandomQuestion();


const otherBtn = document.getElementById('otherBtn');

otherBtn.addEventListener("click", () => {
    // window.location.reload();
    getRandomQuestion();
})

const yesBtn = document.getElementById('yesBtn');
yesBtn.addEventListener('click', async () => {
    const res = await fetch(`http://localhost:8080/add-vote/${idQuestion}`, {
        method: 'PUT',
        body: new URLSearchParams({ type: 'yes' })

    });
    const jsonRes = await res.json();
})
