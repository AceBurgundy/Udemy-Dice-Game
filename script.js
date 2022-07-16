let goal = document.querySelector(".goal")
let players = document.querySelectorAll(".action")
let background = document.querySelector(".background");
let winner = document.querySelector(".winner")
let retry = document.querySelector(".retry")
let raceTrack = document.querySelector(".race-track-left")

// let goalPosition = ((parseInt(window.getComputedStyle(goal).getPropertyValue('bottom'), 10) - goal.offsetHeight));

// rolls dice
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function diceMultiplier(diceResult) {
    value = ""

    if (diceResult === 1) {
        value = 40 * diceResult
    } else if (diceResult === 2) {
        value = 35 * diceResult
    } else if (diceResult === 3) {
        value = 30 * diceResult
    } else if (diceResult === 4) {
        value = 25 * diceResult
    } else if (diceResult === 5) {
        value = 20 * diceResult
    } else if (diceResult === 6) {
        value = 15 * diceResult
    }

    return value
}

let newScore = "";

// game function
function runGame(number, boost) {
    let car = document.getElementById(`car-${number}`)
    let image = document.querySelector(`.img-${number}`)
    let carBottom = parseInt(window.getComputedStyle(car).getPropertyValue('bottom'))
    let score = document.getElementById(`player-${number}-score`)

    if (carBottom > (screen.height)) {
        background.classList.toggle("active")
        number === 'one' ? winner.textContent = "player1" : winner.textContent = "player2"
    } else {
        dice = rollDice()

        let newCarDistance = carBottom + diceMultiplier(dice);
        image.src = "images\\" + dice + ".png"
        image.classList.add("active")

        car.style.bottom = newCarDistance + "px";
        score.children[0].textContent = dice
        newScore = dice;
    }

    return newScore
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
        if (event.target.classList.contains("player1")) {
            screen.width < 1200 ? runGame('one', 5) : runGame('one', 10)
        } else {
            screen.width < 1200 ? runGame('two', 5) : runGame('two', 10)
        }
    })
})


// runs game on click
players.forEach((player) => {
    player.addEventListener("click", (event) => {
        event.target.classList.contains("player1") ? runGame('one', 10) : runGame('two', 10)
    })
})

// Runs game on keypress
document.addEventListener("keypress", (event) => {
    if ((event.key) === "z") {
        runGame('one', 10)
    } else if ((event.key) === ".") {
        runGame('two', 10)
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

if (screen.width < 884) {
    let raceTrackHalfSide = document.querySelectorAll(".race-track-half");

    raceTrackHalfSide.forEach((track) => {
        track.addEventListener("click", (event) => {
            if (event.target.classList.contains("player1")) {
                newScore = runGame('one', 5)
                document.querySelector(".mobile-score-one").innerHTML = newScore
            } else if (event.target.classList.contains("player2")) {
                newScore = runGame('two', 5)
                document.querySelector(".mobile-score-two").innerHTML = newScore
            }
        })
    })
}

if (screen.width < 1200) {
    document.querySelectorAll(".action").forEach((button) => {
        button.textContent = "GO"
    })
}