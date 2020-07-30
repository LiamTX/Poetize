document.getElementById('loginBTN').addEventListener('click', async () => {
    let data = {
        email: document.querySelector('input[name=mail]').value,
        password: document.querySelector('input[name=password]').value
    };

    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch('https://poetize-api.herokuapp.com/api/users/auth', fetchOptions)
        .then(res => res.json())
            .then(result => {
                if(result.error){
                    alert(result.error)
                }else{
                    localStorage.setItem(
                        'session', 
                        JSON.stringify({id: result.user.id, token: result.token
                    }));
                    window.location.href = '/feed';
                }
            }).catch(error => console.log(error));
})