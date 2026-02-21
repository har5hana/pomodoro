let timeLeft = 1500;
let timerInterval;
let currentPhase = 'work';
let pomodoroCount = 0;
let currentTask = "";

const phases = {
    work: { time: 25 * 60, name: 'Work Session' },
    shortBreak: { time: 5 * 60, name: 'Short Break' },
    longBreak: { time: 10 * 60, name: 'Long Break' }
};

function startTimer() {
    if (timerInterval) return;

    timeLeft = phases[currentPhase].time;
    updatePhaseDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            if (currentPhase === 'work') {
                pomodoroCount++;
                if (pomodoroCount % 4 === 0) {
                    currentPhase = 'longBreak';
                } else {
                    currentPhase = 'shortBreak';
                }
            } else {
                currentPhase = 'work';
            }
            timeLeft = phases[currentPhase].time;
            updatePhaseDisplay();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    currentPhase = 'work';
    pomodoroCount = 0;
    timeLeft = phases[currentPhase].time;
    updateDisplay();
    updatePhaseDisplay();
}

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("time").innerText =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updatePhaseDisplay() {
    document.getElementById("phase").innerText = phases[currentPhase].name;
}

function startShortBreak() {
    if (timerInterval) return;

    currentPhase = 'shortBreak';
    timeLeft = phases[currentPhase].time;
    updatePhaseDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            currentPhase = 'work';
            timeLeft = phases[currentPhase].time;
            updatePhaseDisplay();
        }
    }, 1000);
}

function startLongBreak() {
    if (timerInterval) return;

    currentPhase = 'longBreak';
    timeLeft = phases[currentPhase].time;
    updatePhaseDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            currentPhase = 'work';
            timeLeft = phases[currentPhase].time;
            updatePhaseDisplay();
        }
    }, 1000);
}

function completeTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    currentTask = input.value.trim();

    const tomatoContainer = document.createElement("div");
    tomatoContainer.classList.add("tomato-container");

    const tomato = document.createElement("div");
    tomato.classList.add("tomato");

    const taskName = document.createElement("div");
    taskName.classList.add("task-name");
    taskName.innerText = currentTask;

    tomatoContainer.appendChild(tomato);
    tomatoContainer.appendChild(taskName);

    document.getElementById("forest").appendChild(tomatoContainer);

    input.value = "";
}