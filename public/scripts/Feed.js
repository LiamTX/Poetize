function logOut(){
    localStorage.removeItem('user');
    window.location.href = "http://localhost:3000/login"
};

function selectPoem(poemID){
    window.location.href = "http://localhost:3000/poem?id="+poemID;
}