
const contentDOM = document.getElementById('contentQuestion');
const totalVoteDOM = document.getElementById("totalVote");
const percentYesVoteDOM = document.getElementById('percentYesVote');
const percentNoVoteDOM = document.getElementById('percentNoVote');


const getDetailQuestion = async (id) => {
    try {
        const res = await fetch(`http://localhost:8080/detail/${id}`);
        const jsonRes = await res.json();

        if (jsonRes.success) {
            const { data: question } = jsonRes;
            const { content, yes, no } = question;

            contentDOM.innerHTML = content;
            totalVoteDOM.innerHTML = yes + no;

            const yesNumber = parseInt(yes);
            const noNumber = parseInt(no);
            const total = yesNumber + noNumber;

            const percentYes = total ===0 ? parseFloat(50).toFixed(2):(yes+no)
            const percentNo = (100 - percentYes).toFixed(2);
        }
    } catch (err) {
        console.log(err);
    }
}


const idQuestion = window.location.pathname.split('/').pop();
getDetailQuestion(idQuestion);

