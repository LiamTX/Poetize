
async function userRegister(){
    const data = {
        nome: document.querySelector('input[name=nome]').value,
        email: document.querySelector('input[name=email]').value,
        pass: document.querySelector('input[name=pass').value
    }   

    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch('http://localhost:3333/user', fetchOptions)
        .then(res => res.json)
            .then(result => console.log(result))
                .then(window.location.href = "http://localhost:3000/login")
                    .catch(err => console.log(err));
};