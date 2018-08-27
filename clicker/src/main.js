let clickers = 1000;
let startTime = Date.now();
// position element in the DOM
function sync (dom, pos) {
    dom.style.left = `${pos.x}px`;
    dom.style.top = `${pos.y}px`;
    let curLeft = dom.style.left;
    let curTop = dom.style.top;
    let moveLeft = true;
    let moveTop = false;
    const update = () => {
        if (parseInt(curLeft)<590 && moveLeft) {
            curLeft = parseInt(curLeft) + 1;
        }
        if (parseInt(curLeft)<590 && !moveLeft) {
            curLeft = parseInt(curLeft) - 1;
        }
        if (parseInt(curTop)<420 && moveTop) {
            curTop = parseInt(curTop) - 1;
        }
        if (parseInt(curTop)<420 && !moveTop) {
            curTop = parseInt(curTop) + 1;
        }
        if (parseInt(curLeft)>=580) moveLeft = false;
        if (parseInt(curLeft)<=0) moveLeft = true;
        if (parseInt(curTop)>=410) moveTop = true;
        if (parseInt(curTop)<=0) moveTop = false;

        dom.style.left = `${curLeft}px`;
        dom.style.top = `${curTop}px`;
        requestAnimationFrame(update);

    };
    requestAnimationFrame(update);
}

function addClicker () {
    const pos = {
        x: Math.random() * 500,
        y: Math.random() * 300
    };
    const img = new Image();
    const animals = ['bear', 'buffalo', 'chick', 'chicken', 'cow', 'crocodile', 'dog', 'duck', 'elephant', 'frog', 'giraffe', 'goat', 'gorilla', 'monkey', 'panda', 'penguin'];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    img.src = `res/images/${randomAnimal}.png`;
    img.style.position = "absolute";
    img.addEventListener("click", removeClicker, false);
    document.querySelector("#board").appendChild(img);
    sync(img, pos);
}

function removeClicker (e) {
    e.target.parentNode.removeChild(e.target);
    clickers--;
    checkGameOver();
}

function checkGameOver() {
    document.querySelector("#remain").innerHTML = clickers;
    if (clickers === 0) {
        const taken = Math.round((Date.now() - startTime) / 1000);
        alert(`Ты поймал всех животных за ${taken} секунд!`);
    }
}

for (let i = 0; i < clickers; i++) {
    addClicker();
}

