document.getElementById('signupBTN').addEventListener('click', async () => {
    let data = {
        name: document.querySelector('input[name=nome]').value,
        email: document.querySelector('input[name=email]').value,
        password: document.querySelector('input[name=pass]').value,
    };
    
    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch('https://poetize-api.herokuapp.com/api/users', fetchOptions)
        .then(res => res.json())
            .then(result => {

                console.log(result)
            }).catch(error => console.log(error));
});