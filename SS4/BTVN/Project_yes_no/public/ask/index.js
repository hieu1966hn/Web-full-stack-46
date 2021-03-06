const createForm = document.getElementById('form-question');
const textAreaQuestion = document.getElementById('create-textarea');

createForm.addEventListener('submit', (e) => {
    e.preventDefault(); // chan su kien default reload trang cua form

    const content = textAreaQuestion.value;

    const question = { content: content };

    fetch('http://localhost:8080/create-question', {
        method: 'POST',
        body: new URLSearchParams(question)
        // de lam gi?? (phai co)
    }).then(res => res.json())
        .then(res => {
            if (res.success) {
                window.location.href = '/';

            }
        });
})

const restLengthDom = document.getElementById('restLength');
textAreaQuestion.addEventListener('input', () => {
    const content = textAreaQuestion.value.length;
    const currentLength = content;

    restLengthDom.innerHTML = 200 - currentLength;
})