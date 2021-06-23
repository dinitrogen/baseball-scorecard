
// Initialize variables
let inningHalf = 'Top';
let numInning = 1;
let awayRuns = 0;
let homeRuns = 0;
let numBalls = 0;
let numStrikes = 0;
let numOuts = 0;

function resetCounters() {
    inningHalf = 'Top';
    numInning = 1;
    awayRuns = 0;
    homeRuns = 0;
    numBalls = 0;
    numStrikes = 0;
    numOuts = 0;
}


function createCounterButton(id, text) {
    const btn = document.createElement('button');
    btn.setAttribute('class','counterButton');
    btn.setAttribute('id', id);
    const btnText = document.createElement('span');
    btnText.textContent = text;
    btn.appendChild(btnText);
    return btn;
}

function createCounterDiv(id) {
    const div = document.createElement('div');
    div.setAttribute('class', 'container');
    div.setAttribute('id', id);
    return div;
}

function createHeader(id, text) {
    const header = document.createElement('h1');
    header.setAttribute('id', id);
    header.textContent = text;
    return header;
}

function createBatterInfoDiv(firstName, jerseyNum) {
    const div = document.createElement('div');
    div.setAttribute('id', 'batterInfoDiv');
    const para = document.createElement('p');
    para.setAttribute('id', 'batterInfo');
    para.textContent = `Up to bat: ${firstName}, #${jerseyNum}`;
    div.appendChild(para);
    return div;
}

function createInningCounter() {
    const inningCounter = createCounterButton('inningCounter', 'Top 1');
    inningCounter.addEventListener('click', advanceInning);
    return inningCounter;
    
}

function createRunCounterAway() {
    const runCounterAway = createCounterButton('runCounterAway', 'Away: 0');
    runCounterAway.addEventListener('click', addRunAway);
    return runCounterAway;
}    


function createRunCounterHome() {
    const runCounterHome = createCounterButton('runCounterHome', 'Home: 0');
    runCounterHome.addEventListener('click', addRunHome);
    return runCounterHome;
}


function createBallCounter() {
    const ballCounter = createCounterButton('ballCounter', 'B: 0');
    ballCounter.addEventListener('click', addBall);
    return ballCounter;
}


function createStrikeCounter() {
    const strikeCounter = createCounterButton('strikeCounter', 'S: 0');
    strikeCounter.addEventListener('click', addStrike);
    return strikeCounter;
}


function createOutCounter() {
    const outCounter = createCounterButton('outCounter', 'O: 0');
    outCounter.addEventListener('click', addOut);
    return outCounter;
}


// Button logic

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


// Page Loader
function loadAtBatTracker() {
    // create divs
    const atBatHeader = createHeader('atBatHeader', 'At Bat Tracker');
    const batterInfoDiv = createBatterInfoDiv('Ellie', '1'); // Hard coded name/number for now
    const inningDiv = createCounterDiv('inningDiv');
    const scoreDiv = createCounterDiv('scoreDiv');
    const BSODiv = createCounterDiv('BSODiv');

    // create counter buttons
    const inningCounter = createInningCounter();
    inningDiv.appendChild(inningCounter);
    
    const runCounterAway = createRunCounterAway();
    scoreDiv.appendChild(runCounterAway);

    const runCounterHome = createRunCounterHome();
    scoreDiv.appendChild(runCounterHome);

    const ballCounter = createBallCounter();
    BSODiv.appendChild(ballCounter);

    const strikeCounter = createStrikeCounter();
    BSODiv.appendChild(strikeCounter);

    const outCounter = createOutCounter();
    BSODiv.appendChild(outCounter);

    // add elements to main section of page
    const tabContent = document.getElementById('tabContent');
    tabContent.textContent = '';
    resetCounters();
    tabContent.appendChild(atBatHeader);
    tabContent.appendChild(batterInfoDiv);
    tabContent.appendChild(inningDiv);
    tabContent.appendChild(scoreDiv);
    tabContent.appendChild(BSODiv);
}


export { loadAtBatTracker }
