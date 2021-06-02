let container = document.querySelector('#container');

let numBalls = 0;
let numStrikes = 0;
let numOuts = 0;
let awayRuns = 0;
let homeRuns = 0;
let numInning = 1;
let inningHalf = 'Top';

let ballCounter = document.querySelector('#ballCounter');
ballCounter.addEventListener('click', addBall);

let strikeCounter = document.querySelector('#strikeCounter');
strikeCounter.addEventListener('click', addStrike);

let outCounter = document.querySelector('#outCounter');
outCounter.addEventListener('click', addOut);

let runCounterAway = document.querySelector('#runCounterAway');
runCounterAway.addEventListener('click', addRunAway);

let runCounterHome = document.querySelector('#runCounterHome');
runCounterHome.addEventListener('click', addRunHome);

let inningCounter = document.querySelector('#inningCounter');
inningCounter.addEventListener('click', advanceInning);


function addBall() {
    if (numBalls === 3) {
        numBalls = 0;
        numStrikes = 0;
        // Display Walk text or record a walk
    }
    else {
        numBalls++;
    }
    ballCounter.textContent = `B: ${numBalls}`;
    strikeCounter.textContent = `S: ${numStrikes}`;
    outCounter.textContent = `O: ${numOuts}`;
}

function addStrike() {
    if (numStrikes === 2) {
        numStrikes = 0;
        numBalls = 0;
        addOut();
        // Display strike out text or record a K
    }
    else {
        numStrikes++;
    }
    ballCounter.textContent = `B: ${numBalls}`;
    strikeCounter.textContent = `S: ${numStrikes}`;
    outCounter.textContent = `O: ${numOuts}`;
}

function addOut() {
    if (numOuts === 2) {
        numOuts = 0;
        numBalls = 0;
        numStrikes = 0;
        // Display out text or record an out
    }
    else {
        numOuts++;
    }
    ballCounter.textContent = `B: ${numBalls}`;
    strikeCounter.textContent = `S: ${numStrikes}`;
    outCounter.textContent = `O: ${numOuts}`;
}


function addRunAway() {
    if (awayRuns > 24) {
        awayRuns = 0;
    }
    else {
        awayRuns++;
    }
    runCounterAway.textContent = `Away: ${awayRuns}`;
}

function addRunHome() {
    if (homeRuns > 24) {
        homeRuns = 0;
    }
    else {
        homeRuns++;
    }
    runCounterHome.textContent = `Home: ${homeRuns}`;
}

function advanceInning() {
    if (numInning > 9) {
        inningHalf = 'Top';
        numInning = 1;
    }
    else if (inningHalf == 'Top') {
        inningHalf = 'Bottom'
    }
    else {
        inningHalf = 'Top';
        numInning++;
    }
    inningCounter.textContent = `${inningHalf} ${numInning}`;
}
