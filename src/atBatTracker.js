

let gameScore = {
    inningHalf: 'Top',
    numInning: 1,
    awayRuns: 0,
    homeRuns: 0,
    numBalls: 0,
    numStrikes: 0,
    numOuts: 0
}

// Initialize variables
//let inningHalf = 'Top';
// //let numInning = 1;
// let awayRuns = 0;
// let homeRuns = 0;
// let numBalls = 0;
// let numStrikes = 0;
// let numOuts = 0;

function resetGameScore() {
    gameScore.inningHalf = 'Top';
    gameScore.numInning = 1;
    gameScore.awayRuns = 0;
    gameScore.homeRuns = 0;
    gameScore.numBalls = 0;
    gameScore.numStrikes = 0;
    gameScore.numOuts = 0;
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
    const inningCounter = createCounterButton('inningCounter', `${gameScore.inningHalf} ${gameScore.numInning}`);
    inningCounter.addEventListener('click', advanceInning);
    return inningCounter;
    
}

function createRunCounterAway() {
    const runCounterAway = createCounterButton('runCounterAway', `Away: ${gameScore.awayRuns}`);
    runCounterAway.addEventListener('click', addRunAway);
    return runCounterAway;
}    


function createRunCounterHome() {
    const runCounterHome = createCounterButton('runCounterHome', `Home: ${gameScore.homeRuns}`);
    runCounterHome.addEventListener('click', addRunHome);
    return runCounterHome;
}


function createBallCounter() {
    const ballCounter = createCounterButton('ballCounter', `B: ${gameScore.numBalls}`);
    ballCounter.addEventListener('click', addBall);
    return ballCounter;
}


function createStrikeCounter() {
    const strikeCounter = createCounterButton('strikeCounter', `S: ${gameScore.numStrikes}`);
    strikeCounter.addEventListener('click', addStrike);
    return strikeCounter;
}


function createOutCounter() {
    const outCounter = createCounterButton('outCounter', `O: ${gameScore.numOuts}`);
    outCounter.addEventListener('click', addOut);
    return outCounter;
}


// Button logic

function addBall() {
    if (gameScore.numBalls === 3) {
        gameScore.numBalls = 0;
        gameScore.numStrikes = 0;
        // Display Walk text or record a walk
    }
    else {
        gameScore.numBalls++;
    }
    ballCounter.textContent = `B: ${gameScore.numBalls}`;
    strikeCounter.textContent = `S: ${gameScore.numStrikes}`;
    outCounter.textContent = `O: ${gameScore.numOuts}`;
    saveGame();
}

function addStrike() {
    if (gameScore.numStrikes === 2) {
        gameScore.numStrikes = 0;
        gameScore.numBalls = 0;
        addOut();
        // Display strike out text or record a K
    }
    else {
        gameScore.numStrikes++;
    }
    ballCounter.textContent = `B: ${gameScore.numBalls}`;
    strikeCounter.textContent = `S: ${gameScore.numStrikes}`;
    outCounter.textContent = `O: ${gameScore.numOuts}`;
    saveGame();
}

function addOut() {
    if (gameScore.numOuts === 2) {
        gameScore.numOuts = 0;
        gameScore.numBalls = 0;
        gameScore.numStrikes = 0;
        // Display out text or record an out
    }
    else {
        gameScore.numOuts++;
    }
    ballCounter.textContent = `B: ${gameScore.numBalls}`;
    strikeCounter.textContent = `S: ${gameScore.numStrikes}`;
    outCounter.textContent = `O: ${gameScore.numOuts}`;
    saveGame();
}

function addRunAway() {
    if (gameScore.awayRuns > 24) {
        gameScore.awayRuns = 0;
    }
    else {
        gameScore.awayRuns++;
    }
    runCounterAway.textContent = `Away: ${gameScore.awayRuns}`;
    saveGame();
}

function addRunHome() {
    if (gameScore.homeRuns > 24) {
        gameScore.homeRuns = 0;
    }
    else {
        gameScore.homeRuns++;
    }
    runCounterHome.textContent = `Home: ${gameScore.homeRuns}`;
    saveGame();
}

function advanceInning() {
    if (gameScore.numInning > 9) {
        gameScore.inningHalf = 'Top';
        gameScore.numInning = 1;
    }
    else if (gameScore.inningHalf == 'Top') {
        gameScore.inningHalf = 'Bottom'
    }
    else {
        gameScore.inningHalf = 'Top';
        gameScore.numInning++;
    }
    inningCounter.textContent = `${gameScore.inningHalf} ${gameScore.numInning}`;
    saveGame();
}


// Page Loader
function loadAtBatTracker() {

    if (localStorage.getItem('mySavedGame')) {
        //alert("Found saved game.");
        loadGame();
    } 
    
    let myRoster = JSON.parse(localStorage.getItem("mySavedRoster"));
    console.table(myRoster);
    let batterIndex = 1;
    let batterName = myRoster[batterIndex].firstName;
    let batterJersey = myRoster[batterIndex].jerseyNum;
    
    // create divs
    const atBatHeader = createHeader('atBatHeader', 'At Bat Tracker');
    const batterInfoDiv = createBatterInfoDiv(batterName, batterJersey); // Hard coded name/number for now
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
    tabContent.appendChild(atBatHeader);
    tabContent.appendChild(batterInfoDiv);
    tabContent.appendChild(inningDiv);
    tabContent.appendChild(scoreDiv);
    tabContent.appendChild(BSODiv);

    // add hit buttons
    const singleButton = document.createElement('button');
    singleButton.setAttribute('id','singleButton');
    singleButton.textContent = '1B';
    singleButton.addEventListener('click', function() {
        myRoster[0].numSingles++;
        console.log(myRoster[0].numSingles);
        //saveRoster();
        localStorage.setItem("mySavedRoster", JSON.stringify(myRoster));
        });
    tabContent.appendChild(singleButton);

    
    // Add "new game" button
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New game';
    newGameButton.addEventListener('click', function() {
        if (prompt("Are you sure? (type 'yes')") === 'yes') {
            localStorage.removeItem("mySavedGame");
            resetGameScore();
            loadAtBatTracker();
        } else {
            return;
        }
    });
    tabContent.appendChild(newGameButton);


}

function saveGame() {
    localStorage.setItem("mySavedGame", JSON.stringify(gameScore));
}
function loadGame() {
    gameScore = JSON.parse(localStorage.getItem("mySavedGame"));
}

// function saveRoster() {
//     localStorage.setItem("mySavedRoster", JSON.stringify(myRoster));
// }


export { loadAtBatTracker }
