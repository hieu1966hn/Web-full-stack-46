$('#flashcardForm').on('submit', async e => {
    e.preventDefault();

    const newFlashcard = {
        frontSide: $('#front').val(),
        backSide: $('#back').val(),
        category: $('#category').val(),
    }
    console.log(newFlashcard);

    try {
        const res = await $.ajax({
            url: '/api/flashcards',
            method: 'POST',
            data: newFlashcard
        });
        if (res.success) {
            alert('Create Successfully');
            $('#front').val('');
            $('#back').val('');
            $('#category').val('');
        }
    }
    catch (err) {
        console.log('err', err);
    }
})