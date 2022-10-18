const playBtn = document.querySelector('button#play');
const nameInput = document.querySelector('input#name');
let gameObject;

playBtn?.addEventListener('click',() => {
    const name = nameInput.value;
    if(!name) {
        new Notification('You need to fill name field','error');
        nameInput.focus();
        return false;
    }

    gameObject = new Game(name);
    document.querySelector('.game_window')?.classList.add('play');
})