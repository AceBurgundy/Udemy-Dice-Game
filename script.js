let goal = document.querySelector(".goal")
let players = document.querySelectorAll(".action")
let background = document.querySelector(".background");
let winner = document.querySelector(".winner")
let retry = document.querySelector(".retry")

// rolls dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// game function
function runGame(number) {
    let car = document.getElementById(`car-${number}`)
    let image = document.querySelector(`.img-${number}`)
    let carBottom = parseInt(window.getComputedStyle(car).getPropertyValue('bottom'), 10)
    let score = document.getElementById(`player-${number}-score`)

    if (carBottom > 715) {
        background.classList.toggle("active")
        number === 'one' ? winner.textContent = "player1" : winner.textContent = "player2"
    } else {
        dice = rollDice()

        let newCarDistance = carBottom + (dice * 10);
        image.src = "images\\" + dice + ".png"
        image.classList.add("active")

        car.style.bottom = newCarDistance + "px";
        score.children[0].textContent = dice;
    }
}

retry.addEventListener("click", () => {
    document.querySelectorAll(".car").forEach((car) => { car.style.bottom = "2%" })
    document.querySelectorAll(".score").forEach((score) => {
        score.children[0].textContent = "";
    })
    document.querySelectorAll(".image").forEach((image) => { image.src = "" })
    background.classList.toggle("active")
    winner.textContent = "";

})

// runs game on click
players.forEach((player) => {
    player.addEventListener("click", (event) => {
        event.target.classList.contains("player1") ? runGame('one') : runGame('two')
    })
})

// Runs game on keypress
document.addEventListener("keypress", (event) => {
    if ((event.key) === "z") {
        runGame('one')
    } else if ((event.key) === ".") {
        runGame('two')
    }
})

// when the play button is clicked
ignition = new Audio("soundfx/ignition.wav")
backgroundMusic = new Audio("soundfx/background.mp3")

document.querySelector(".start-button").addEventListener("click", () => {
    ignition.play()
    document.querySelector(".goal").classList.toggle("active")
    document.querySelector(".menu-container").classList.toggle("active")
    document.querySelector(".race-line").classList.toggle("active")
    backgroundMusic.play()
})

let volumeSetters = document.querySelectorAll(".audio-control")

volumeSetters.forEach((set) => {
    set.addEventListener("click", (event) => {
        if (event.target.classList.contains("max-volume")) {
            adjustVolume(0.6)
        } else if (event.target.classList.contains("medium-volume")) {
            adjustVolume(0.25)
        } else if (event.target.classList.contains("mute")) {
            adjustVolume(0)
        }
    })
})

function adjustVolume(value) {
    if (value > 0) {
        backgroundMusic.play()
        backgroundMusic.volume = value
    } else {
        backgroundMusic.volume = 0
    }
}