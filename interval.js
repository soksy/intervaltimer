var counterObject = {
    exercise: 0,
    rest: 0,
    phase: "",
    counter: 0,
    tickTimer: undefined
}

var displayElements = {
    exercise: document.getElementById("exercise-current"),
    rest: document.getElementById("rest-current"),
    tickTock: document.getElementById("tick-tock"),  // the hidden sound element
    exerciseInterval: document.getElementById("exercise-interval"),
    restInterval: document.getElementById("rest-interval")
}

var intervalTimer = function() {
    counterObject.exercise = displayElements.exerciseInterval.value;
    counterObject.rest = displayElements.restInterval.value;
    counterObject.phase = "exercise";
    counterObject.counter = counterObject.exercise;
    displayElements.exercise.textContent = counterObject.exercise;
    clearInterval(counterObject.tickTimer);
    counterObject.tickTimer = setInterval(tickUpdate, 1000);
}

var haltTimer = function() {
    clearInterval(counterObject.tickTimer);
}

var tickUpdate = function() {
    counterObject.counter--;
    displayElements.tickTock.play();

    if (counterObject.counter === 0) {
        if (counterObject.phase === "rest") {
            counterObject.phase = "exercise";
        } else {
            counterObject.phase = "rest";
        }
        counterObject.counter = counterObject[counterObject.phase];      
    }
        displayElements[counterObject.phase].textContent = counterObject.counter;
}


document.querySelector('.go-button').addEventListener('click', intervalTimer);
document.querySelector('.stop-button').addEventListener('click', haltTimer);