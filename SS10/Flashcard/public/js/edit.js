const idFlashcard = window.location.pathname.split("/").pop();
const getDetailCard = async () => {

    const res = await $.ajax({
        url: `/api/flashcards/${idFlashcard}`,
        method: "GET"
    });

    if (res.success) {
        const { backSide, frontSide, category } = res.data;

        $('#back').val(backSide);
        $('#front').val(frontSide);
        $('#cate').val(category);

    }
}
getDetailCard();