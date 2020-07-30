document.getElementById('btnLogOut').addEventListener('click', async () => {
    const Options = {
        method: 'DELETE',
    };
    await fetch('http://localhost:8080/token', Options);
    window.location.href = '/login';
});