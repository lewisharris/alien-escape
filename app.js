//Array of answers goes here
const programming_languages = [
    'css',
    'html',
    'javascript',
    'c',
    'csharp',
    'kotlin',
    'ruby',
    'python',
    'java',
    'mongodb',
    'sass',
    'php'
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


window.addEventListener('load', () => playSound('start-sound.wav'));

document.getElementById('max-wrong').innerHTML = maxWrong;


// Picks a random word from the answers array
function randomWords(){
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)]
}
randomWords();

//creates all the html buttons for the keyboard
function createButtons(){
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button 
            class="keyboard-buttons"
            id='${letter}'
            onClick="handleGuess(${letter})"
        >
        ${letter}
        </button>`).join('');
    let keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = buttonsHTML;
}
createButtons();

/*function runs when button clicked. button passes letter parameter into the function and function checks
to see if the letter matches a letter in the answer*/
function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter.innerHTML.trim()) === -1 ? guessed.push(chosenLetter.innerHTML.trim()) : null;
    chosenLetter.setAttribute('disabled',true);
    chosenLetter.style.opacity = 0.5
    if(answer.indexOf(chosenLetter.innerHTML.trim()) >= 0) {
        guessedWord()
        checkForWin();
        playSound('blip.wav');
        }
    else if(answer.indexOf(chosenLetter.innerHTML.trim()) === -1){
            mistakes ++;
            document.getElementById('mistakes').innerHTML = mistakes;
            checkForLose();
            updatePic();
    }
}

//updates the lights on the spaceship. called when wrong answer is given
function updatePic(){
    document.querySelectorAll('.circle-light')[mistakes-1].classList.add('red-light');
    document.querySelectorAll('.circle-light-glow')[mistakes-1].classList.add('red-glow');
    playSound('beep.wav');
}

//resets the graphics when game is reset. called when game is reset
function resetPic(){
    alien.classList.remove('alien-vanish');
    Array.from(document.querySelectorAll('.circle-light')).map( circle => circle.classList.remove('red-light'));
    Array.from(document.querySelectorAll('.circle-light-glow')).map(circle => circle.classList.remove('red-glow'));
    spaceShip.classList.remove('space-ship-leave')
    setTimeout(()=> beam.classList.remove('remove-beam'),1500);
    document.getElementById('open-mouth').classList.replace('.open-mouth','st74')
}

function checkForWin(){
    if (wordStatus === answer){
        playSound('take-off.wav');
        document.getElementById('win-or-lose').innerHTML = 'You Win!';
        alienEscape();
        removeBeam();
        shipFly();
        document.getElementById('reset-game').focus();
    }
};

function checkForLose(){
    if(mistakes == maxWrong){
        playSound('take-off.wav');
        document.getElementById('win-or-lose').innerHTML = 'You Lost!';
        document.getElementById('word-spotlight').innerHTML = answer;
        document.getElementById('open-mouth').classList.replace('st74','.open-mouth')
        removeBeam();
        shipFly();
        document.getElementById('reset-game').focus();
    }
};

//populates the blank answer underscores and then fills in as correct words are guesssed. called on keyboard entry
function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter: ' _ ')).join('');
    document.getElementById('word-spotlight').innerHTML = wordStatus;
}
guessedWord();

function resetGame(){
    document.getElementById('win-or-lose').innerHTML = '';
    playSound('fly-in.wav');
    mistakes = 0;
    document.getElementById('mistakes').innerHTML = mistakes;
    guessed = [];
    randomWords();
    guessedWord();
    mistakes = 0;
    createButtons();
    resetPic();

}


//image animation

const beam = document.getElementById('beam')
const spaceShip = document.getElementById('space-ship')
const alien = document.getElementById('character');
const stars = document.getElementById('animated_stars');

const beamGlow = setInterval( () => {classChange(beam,'beam','beamPulse')},300); //constant background animation
const shipHover = setInterval( () => {classChange(spaceShip,'space-ship','space-ship-rotated')},1000); //constant background animation
const blinkStars = setInterval( () => classChange(stars,'stars','dimStars'),500) //constant background animation


//reusable code for changing class of elements
function classChange(e,currentClass,newClass){
    if(e.classList.contains(currentClass)){
 e.classList.remove(currentClass)
 e.classList.add(newClass)
    }
    else{
        e.classList.remove(newClass)
        e.classList.add(currentClass)
    }
}

//hides beam when spaceship leaves
function removeBeam(){
    clearInterval(beamGlow)
    beam.className = '';
    beam.classList.add('remove-beam');
}


function shipFly(){
    setTimeout(() => {
        spaceShip.classList.add('space-ship-leave')
    },1000)

}

//called if you win
function alienEscape(){
    alien.classList.add('alien-vanish')
}


//reusable function for sound effects
function playSound(sound) {
    var audio = new Audio(sound);
    audio.loop = false;
    audio.play(); 
}





