async function Login(){
    const data = {
        mail: document.querySelector('input[name=mail]').value,
        password: document.querySelector('input[name=password]').value
    };

    console.log(data)

    const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await fetch('http://localhost:3333/user/auth', fetchOptions)
        .then(res => res.json())
            .then(user => { 
                if(user == "O usuario não existe...efetue o cadastro"){
                    alert(user);
                    window.location.href = "http://localhost:3000/signup";
                }else if(user == "Senha incorreta, tente novamente"){
                    alert(user);
                    window.location.reload()
                }else{
                    localStorage.setItem('user', JSON.stringify(user));
                    window.location.href = "http://localhost:3000/feed";
                };    
            });
}

function goToSignup(){ window.location.href = "http://localhost:3000/signup"}