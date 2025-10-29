function showLevel(levelId) {
    document.getElementById('home').style.display = 'none';

    document.querySelectorAll('.level').forEach(div => {
    div.style.display = 'none';
    });
    document.getElementById(levelId).style.display = 'block';
}

function goHome() {
    document.querySelectorAll('.level').forEach(div => {
        div.style.display = 'none';
    });

    
    document.getElementById('home').style.display = 'block';
}