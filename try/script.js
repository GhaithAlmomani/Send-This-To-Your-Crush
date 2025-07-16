// --- Confetti (canvas-confetti) ---
function confettiBurst() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.style.display = 'block';
    import('https://cdn.skypack.dev/canvas-confetti').then(({default: confetti}) => {
        confetti.create(canvas, {resize: true, useWorker: true})({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 }
        });
        setTimeout(() => { canvas.style.display = 'none'; }, 1200);
    });
}

// --- Sound Effects ---
function playSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// --- Animated Emoji Stickers ---
const stickerEmojis = ['💖','✨','😂','😍','🥳','😜','🎉','😻','😆','😇','🥰','😎','🤩','😺','😹','😻','💘','💝','💞','💫'];
function spawnSticker(x, y) {
    const emoji = stickerEmojis[Math.floor(Math.random()*stickerEmojis.length)];
    const el = document.createElement('div');
    el.className = 'sticker';
    el.textContent = emoji;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
}

document.body.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        spawnSticker(e.clientX, e.clientY);
    }
});

// --- Compliments/Jokes ---
const compliments = [
    "You're awesome! 😎",
    "You have the best smile! 😁",
    "You light up the room! 💡",
    "You make everything more fun! 🎉",
    "You're cuter than this cat! 🐱",
    "You have a great sense of humor! 😂",
    "You're a star! ⭐",
    "You make my heart do a happy dance! 💃"
];
function randomCompliment() {
    return compliments[Math.floor(Math.random()*compliments.length)];
}

// --- Progress Bar ---
const progressBar = document.getElementById('progress-bar');
function updateProgressBar(step, total) {
    progressBar.style.display = 'block';
    let inner = document.getElementById('progress-bar-inner');
    if (!inner) {
        inner = document.createElement('div');
        inner.id = 'progress-bar-inner';
        progressBar.appendChild(inner);
    }
    inner.style.width = `${Math.round((step/total)*100)}%`;
}

// --- Themed Backgrounds ---
const body = document.body;
const bgThemes = [
    'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(120deg, #81ecec 0%, #fff176 100%)',
    'linear-gradient(120deg, #a29bfe 0%, #fd79a8 100%)',
    'linear-gradient(120deg, #f8ffae 0%, #43c6ac 100%)'
];
function setTheme(step) {
    body.style.background = bgThemes[step % bgThemes.length];
}

// --- Responsive Animations ---
function shake(el) {
    el.style.animation = 'shake 0.5s';
    el.addEventListener('animationend', () => { el.style.animation = ''; }, {once:true});
}
const style = document.createElement('style');
style.innerHTML = `@keyframes shake { 0%{transform:translateX(0);} 20%{transform:translateX(-8px);} 40%{transform:translateX(8px);} 60%{transform:translateX(-8px);} 80%{transform:translateX(8px);} 100%{transform:translateX(0);} }`;
document.head.appendChild(style);

// --- Silly Steps ---
const sillySteps = [
    { text: 'Are you sure?', gif: 'https://media.giphy.com/media/3orieQEA4Gx5U/giphy.gif' }, // working
    { text: 'ARE YOU SURE?', gif: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif' }, // excited
    { text: 'Are you really, really sure?', gif: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif' }, // dramatic
    { text: 'Last chance to say no!', gif: 'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif' }, // silly
    { text: 'Are you absolutely, positively, 100% sure?', gif: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif' }, // funny
    { text: 'This is getting serious... 🤨', gif: 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif' }, // love
    { text: 'Final final final chance!', gif: 'https://media.giphy.com/media/3oEjHCWdU7F4q4B1Di/giphy.gif' } // silly
];

const gifs = {
    initial: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z2b2Z2d3F2b2Z2d3F2b2Z2d3F2b2Z2d3F2b2Z2d3F2b2Z2/g9582DNuQppxC/giphy.gif',
    happy: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif', // funny dancing cat
    retry: 'https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif'
};

let state = 'initial';
let stepIndex = 0;

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const responseDiv = document.getElementById('response');
const mainGif = document.getElementById('main-gif');
const shareBtn = document.getElementById('share-btn');

function reset() {
    state = 'initial';
    stepIndex = 0;
    responseDiv.innerHTML = '';
    mainGif.src = gifs.initial;
    yesBtn.textContent = 'Yes 😍';
    noBtn.textContent = 'No 🙈';
    yesBtn.disabled = false;
    noBtn.disabled = false;
    progressBar.style.display = 'none';
    setTheme(0);
    shareBtn.style.display = 'none';
}

// --- Animated No Button Escape ---
let escapeActive = false;
const container = document.querySelector('.container');
noBtn.addEventListener('mouseenter', (e) => {
    if (state === 'silly' && !noBtn.disabled) {
        escapeActive = true;
        const rect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        // Calculate new random position within container
        let maxLeft = rect.width - btnRect.width - 10;
        let maxTop = rect.height - btnRect.height - 10;
        let left = Math.random() * maxLeft;
        let top = Math.random() * maxTop;
        noBtn.style.position = 'absolute';
        noBtn.style.left = left + 'px';
        noBtn.style.top = top + 'px';
        noBtn.style.transition = 'left 0.2s, top 0.2s';
    }
});
function resetNoBtnPosition() {
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.transition = '';
    escapeActive = false;
}
// Patch reset and all state changes to reset No button position
const originalReset = reset;
reset = function() {
    originalReset();
    resetNoBtnPosition();
};
// Also reset No button position after Yes or No is clicked
const originalYesOnClick = yesBtn.onclick;
yesBtn.onclick = function(...args) {
    originalYesOnClick.apply(this, args);
    resetNoBtnPosition();
};
const originalNoOnClick = noBtn.onclick;
noBtn.onclick = function(...args) {
    originalNoOnClick.apply(this, args);
    resetNoBtnPosition();
};

reset();

yesBtn.onclick = () => {
    playSound('sound-click');
    shake(mainGif);
    if (state === 'initial') {
        responseDiv.innerHTML = "Yay! Can't wait to hang out with you! 🎉";
        mainGif.src = gifs.happy;
        yesBtn.disabled = true;
        noBtn.disabled = true;
        confettiBurst();
        playSound('sound-yes');
        shareBtn.style.display = 'inline-block';
    } else if (stepIndex < sillySteps.length) {
        state = 'silly';
        responseDiv.innerHTML = `<b>${sillySteps[stepIndex].text}</b>`;
        mainGif.src = sillySteps[stepIndex].gif;
        yesBtn.textContent = 'Yes...';
        noBtn.textContent = 'No';
        yesBtn.disabled = false;
        noBtn.disabled = false;
        updateProgressBar(stepIndex+1, sillySteps.length+1);
        setTheme(stepIndex+1);
        shake(mainGif);
        stepIndex++;
    } else {
        responseDiv.innerHTML = 'Sorry, retry again 😜';
        mainGif.src = gifs.retry;
        yesBtn.disabled = true;
        noBtn.disabled = true;
        setTimeout(reset, 1500);
    }
};

noBtn.onclick = () => {
    playSound('sound-click');
    shake(mainGif);
    if (state === 'initial') {
        state = 'silly';
        responseDiv.innerHTML = sillySteps[0].text;
        mainGif.src = sillySteps[0].gif;
        yesBtn.textContent = 'Yes';
        noBtn.textContent = 'No';
        yesBtn.disabled = false;
        noBtn.disabled = false;
        stepIndex = 1;
        updateProgressBar(stepIndex, sillySteps.length+1);
        setTheme(stepIndex);
        shake(mainGif);
    } else {
        // At any silly step, No means Yes!
        responseDiv.innerHTML = "Yay! Can't wait to hang out with you! 🎉<br><span style='font-size:1rem;'>" + randomCompliment() + '</span>';
        mainGif.src = gifs.happy;
        yesBtn.disabled = true;
        noBtn.disabled = true;
        confettiBurst();
        playSound('sound-yes');
        shareBtn.style.display = 'inline-block';
    }
};

// --- Share Button ---
shareBtn.onclick = () => {
    let msg = `Hey! Will you hang out with me? 🥺👉👈\nCheck this out: ${window.location.href}`;
    if (navigator.share) {
        navigator.share({ title: 'Hang Out Proposal', text: msg, url: window.location.href });
    } else {
        navigator.clipboard.writeText(msg);
        shareBtn.textContent = 'Copied!';
        setTimeout(() => { shareBtn.textContent = 'Share this!'; }, 1200);
    }
};

// --- Animated Heart Trail ---
document.addEventListener('mousemove', function(e) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.position = 'fixed';
    heart.style.left = (e.clientX - 8) + 'px';
    heart.style.top = (e.clientY - 8) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '1.5rem';
    heart.style.opacity = '0.8';
    heart.style.transition = 'opacity 0.8s, transform 0.8s';
    heart.style.zIndex = 999;
    document.body.appendChild(heart);
    setTimeout(() => {
        heart.style.opacity = '0';
        heart.style.transform = 'translateY(-20px) scale(1.5)';
    }, 10);
    setTimeout(() => heart.remove(), 900);
});

function playYahooletsgo() {
    const audio = document.getElementById('yahooletsgo');
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Patch into Yes/No logic after a successful Yes
const originalYesBtnOnClick = yesBtn.onclick;
yesBtn.onclick = function(...args) {
    originalYesBtnOnClick.apply(this, args);
    // Only play if Yes was accepted (not during silly steps)
    if (state === 'initial' && yesBtn.disabled && noBtn.disabled) {
        playYahooletsgo();
    }
}; 