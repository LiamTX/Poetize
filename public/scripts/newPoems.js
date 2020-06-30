async function RegisterPoem(){
    const userID = JSON.parse(localStorage.getItem('user'));

    const data = {
        title: document.querySelector('input[name=title]').value,
        poem: document.querySelector('textarea[name=poem]').value,
        user: userID.id
    };

    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch('http://localhost:3333/poem', fetchOptions)
        .then(res => res.json())
            .then(result => {
                alert(result)
            });
}