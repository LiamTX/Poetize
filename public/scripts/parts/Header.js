document.getElementById('btnLogOut').addEventListener('click', async () => {
    const Options = {
        method: 'DELETE',
    };
    await fetch('https://poetize.herokuapp.com/token', Options);
    window.location.href = '/login';
});