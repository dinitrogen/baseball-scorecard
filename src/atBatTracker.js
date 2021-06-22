const atBatTracker = (function() {


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

    const loadAtBatTracker = (function() {
        const atBatHeader = createHeader('atBatHeader', 'At Bat Tracker');
        const inningDiv = createCounterDiv('inningDiv');
        const scoreDiv = createCounterDiv('scoreDiv');
        const BSODiv = createCounterDiv('BSODiv');
        const inningBtn = createCounterButton('inningCounter', 'Top 1');
        inningDiv.appendChild(inningBtn);
        const runCounterAway = createCounterButton('runCounterAway', 'Away: 0');
        const runCounterHome = createCounterButton('runCounterHome', 'Home: 0');
        scoreDiv.appendChild(runCounterAway);
        scoreDiv.appendChild(runCounterHome);
        const ballCounter = createCounterButton('ballCounter', 'B: 0');
        const strikeCounter = createCounterButton('strikeCounter', 'S: 0');
        const outCounter = createCounterButton('outCounter', 'O: 0');
        BSODiv.appendChild(ballCounter);
        BSODiv.appendChild(strikeCounter);
        BSODiv.appendChild(outCounter);



        const content = document.getElementById('content');
        content.appendChild(atBatHeader);
        content.appendChild(inningDiv);
        content.appendChild(scoreDiv);
        content.appendChild(BSODiv);

    })();
    

    let numBalls = 0;
    let numStrikes = 0;
    let numOuts = 0;
    let awayRuns = 0;
    let homeRuns = 0;
    let numInning = 1;
    let inningHalf = 'Top';


    ballCounter.addEventListener('click', addBall);
    strikeCounter.addEventListener('click', addStrike);
    outCounter.addEventListener('click', addOut);
    runCounterAway.addEventListener('click', addRunAway);
    runCounterHome.addEventListener('click', addRunHome);
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

    return {
        loadAtBatTracker,
    }
})();


export { atBatTracker }
