let gameScore = {
  inningHalf: "Top",
  numInning: 1,
  awayRuns: 0,
  homeRuns: 0,
  numBalls: 0,
  numStrikes: 0,
  numOuts: 0,
  awayTeamName: "Away",
  homeTeamName: "Home",
};

function resetGameScore(awayTeamName, homeTeamName) {
  gameScore.inningHalf = "Top";
  gameScore.numInning = 1;
  gameScore.awayRuns = 0;
  gameScore.homeRuns = 0;
  gameScore.numBalls = 0;
  gameScore.numStrikes = 0;
  gameScore.numOuts = 0;
  gameScore.awayTeamName = awayTeamName;
  gameScore.homeTeamName = homeTeamName;
}

// Create DOM elements for at Bat Tracker page
function createCounterButton(id, text) {
  const btn = document.createElement("button");
  btn.setAttribute("class", "counterButton");
  btn.setAttribute("id", id);
  const btnText = document.createElement("span");
  btnText.textContent = text;
  btn.appendChild(btnText);
  return btn;
}

function createCounterDiv(id) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");
  div.setAttribute("id", id);
  return div;
}

function createHeader(id, text) {
  const header = document.createElement("h1");
  header.setAttribute("id", id);
  header.textContent = text;
  return header;
}

function createBatterInfoDiv() {
  const div = document.createElement("div");
  div.setAttribute("id", "batterInfoDiv");
  const para = document.createElement("p");
  para.setAttribute("id", "batterInfo");
  para.textContent = "Up to bat:";
  div.appendChild(para);
  return div;
}

function createInningCounter() {
  const inningCounter = createCounterButton(
    "inningCounter",
    `${gameScore.inningHalf} ${gameScore.numInning}`
  );
  inningCounter.addEventListener("click", advanceInning);
  return inningCounter;
}

function createRunCounterAway() {
  const runCounterAway = createCounterButton(
    "runCounterAway",
    `${gameScore.awayTeamName} (Away): ${gameScore.awayRuns}`
  );
  runCounterAway.addEventListener("click", addRunAway);
  return runCounterAway;
}

function createRunCounterHome() {
  const runCounterHome = createCounterButton(
    "runCounterHome",
    `${gameScore.homeTeamName} (Home): ${gameScore.homeRuns}`
  );
  runCounterHome.addEventListener("click", addRunHome);
  return runCounterHome;
}

function createBallCounter() {
  const ballCounter = createCounterButton(
    "ballCounter",
    `B: ${gameScore.numBalls}`
  );
  ballCounter.addEventListener("click", addBall);
  return ballCounter;
}

function createStrikeCounter() {
  const strikeCounter = createCounterButton(
    "strikeCounter",
    `S: ${gameScore.numStrikes}`
  );
  strikeCounter.addEventListener("click", addStrike);
  return strikeCounter;
}

function createOutCounter() {
  const outCounter = createCounterButton(
    "outCounter",
    `O: ${gameScore.numOuts}`
  );
  outCounter.addEventListener("click", addOut);
  return outCounter;
}

// Button logic
function addBall() {
  if (gameScore.numBalls === 3) {
    gameScore.numBalls = 0;
    gameScore.numStrikes = 0;
    // Display Walk text or record a walk
  } else {
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
  } else {
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
  } else {
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
  } else {
    gameScore.awayRuns++;
  }
  runCounterAway.textContent = `${gameScore.awayTeamName} (Away): ${gameScore.awayRuns}`;
  saveGame();
}

function addRunHome() {
  if (gameScore.homeRuns > 24) {
    gameScore.homeRuns = 0;
  } else {
    gameScore.homeRuns++;
  }
  runCounterHome.textContent = `${gameScore.homeTeamName} (Home): ${gameScore.homeRuns}`;
  saveGame();
}

function advanceInning() {
  if (gameScore.numInning > 9) {
    gameScore.inningHalf = "Top";
    gameScore.numInning = 1;
  } else if (gameScore.inningHalf == "Top") {
    gameScore.inningHalf = "Bottom";
  } else {
    gameScore.inningHalf = "Top";
    gameScore.numInning++;
  }
  inningCounter.textContent = `${gameScore.inningHalf} ${gameScore.numInning}`;
  saveGame();
}

function updateBatterDiv(name, jerseyNum) {
  const para = document.getElementById("batterInfo");
  para.textContent = `Up to bat: ${name}, #${jerseyNum}`;
}

// Page Loader
function loadAtBatTracker() {
  if (localStorage.getItem("mySavedGame")) {
    //alert("Found saved game.");
    loadGame();
  }

  let myRoster = [];
  if (localStorage.getItem("tempRoster")) {
    myRoster = JSON.parse(localStorage.getItem("tempRoster"));
  }

  let batterIndex;
  if (localStorage.getItem("savedBatterIndex")) {
    batterIndex = localStorage.getItem("savedBatterIndex");
  } else {
    batterIndex = 0;
  }

  //console.log(batterIndex);
  //console.log(myRoster);

  localStorage.setItem("savedBatterIndex", batterIndex);

  // create divs
  const atBatHeader = createHeader("atBatHeader", "At Bat Tracker");
  const batterInfoDiv = createBatterInfoDiv();
  const inningDiv = createCounterDiv("inningDiv");
  const scoreDiv = createCounterDiv("scoreDiv");
  const BSODiv = createCounterDiv("BSODiv");
  const outcomeDiv = createCounterDiv("outcomeDiv");

  // Batter change button
  const nextBatterButton = document.createElement("button");
  nextBatterButton.setAttribute("id", "nextBatterButton");
  nextBatterButton.textContent = "Next batter";
  nextBatterButton.addEventListener("click", function () {
    gameScore.numBalls = 0;
    gameScore.numStrikes = 0;
    ballCounter.textContent = `B: ${gameScore.numBalls}`;
    strikeCounter.textContent = `S: ${gameScore.numStrikes}`;
    saveGame();
    if (myRoster.length === 0) {
      return;
    } else if (batterIndex >= myRoster.length - 1) {
      batterIndex = 0;
    } else {
      batterIndex++;
    }
    let name = myRoster[batterIndex].firstName;
    let jerseyNum = myRoster[batterIndex].jerseyNum;
    updateBatterDiv(name, jerseyNum);
    localStorage.setItem("savedBatterIndex", batterIndex);
  });
  batterInfoDiv.appendChild(nextBatterButton);

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
  const tabContent = document.getElementById("tabContent");
  tabContent.textContent = "";
  tabContent.appendChild(atBatHeader);
  tabContent.appendChild(batterInfoDiv);
  tabContent.appendChild(inningDiv);
  tabContent.appendChild(scoreDiv);
  tabContent.appendChild(BSODiv);

  if (myRoster.length > 0) {
    updateBatterDiv(
      myRoster[batterIndex].firstName,
      myRoster[batterIndex].jerseyNum
    );
  }

  // add hit buttons
  const singleButton = document.createElement("button");
  singleButton.setAttribute("class", "hitButton");
  singleButton.setAttribute("id", "singleButton");
  singleButton.textContent = "1B";
  singleButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numSingles++;
    console.log(myRoster[batterIndex].numSingles);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(singleButton);

  const doubleButton = document.createElement("button");
  doubleButton.setAttribute("class", "hitButton");
  doubleButton.setAttribute("id", "doubleButton");
  doubleButton.textContent = "2B";
  doubleButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numDoubles++;
    console.log(myRoster[batterIndex].numDoubles);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(doubleButton);

  const tripleButton = document.createElement("button");
  tripleButton.setAttribute("id", "tripleButton");
  tripleButton.setAttribute("class", "hitButton");
  tripleButton.textContent = "3B";
  tripleButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numTriples++;
    console.log(myRoster[batterIndex].numTriples);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(tripleButton);

  const homerunButton = document.createElement("button");
  homerunButton.setAttribute("id", "homerunButton");
  homerunButton.setAttribute("class", "hitButton");
  homerunButton.textContent = "HR";
  homerunButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numHRs++;
    console.log(myRoster[batterIndex].numHRs);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(homerunButton);

  const walkButton = document.createElement("button");
  walkButton.setAttribute("id", "walkButton");
  walkButton.setAttribute("class", "hitButton");
  walkButton.textContent = "BB";
  walkButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numWalks++;
    console.log(myRoster[batterIndex].numWalks);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(walkButton);

  const strikeoutButton = document.createElement("button");
  strikeoutButton.setAttribute("id", "strikeoutButton");
  strikeoutButton.setAttribute("class", "hitButton");
  strikeoutButton.textContent = "SO";
  strikeoutButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numStrikeouts++;
    console.log(myRoster[batterIndex].numStrikeouts);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(strikeoutButton);

  const hbpButton = document.createElement("button");
  hbpButton.setAttribute("id", "hbpButton");
  hbpButton.setAttribute("class", "hitButton");
  hbpButton.textContent = "HBP";
  hbpButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numHBPs++;
    console.log(myRoster[batterIndex].numHBPs);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(hbpButton);

  const sacButton = document.createElement("button");
  sacButton.setAttribute("id", "sacButton");
  sacButton.setAttribute("class", "hitButton");
  sacButton.textContent = "SF";
  sacButton.addEventListener("click", function () {
    myRoster[batterIndex].numPA++;
    myRoster[batterIndex].numSacs++;
    console.log(myRoster[batterIndex].numSacs);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(sacButton);

  const rbiButton = document.createElement("button");
  rbiButton.setAttribute("id", "rbiButton");
  rbiButton.setAttribute("class", "hitButton");
  rbiButton.textContent = "RBI";
  rbiButton.addEventListener("click", function () {
    myRoster[batterIndex].numRBIs++;
    console.log(myRoster[batterIndex].numRBIs);
    localStorage.setItem("tempRoster", JSON.stringify(myRoster));
  });
  outcomeDiv.appendChild(rbiButton);

  tabContent.appendChild(outcomeDiv);

  // Add "new game" button
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("id", "newGameButton");
  newGameButton.textContent = "New game";
  newGameButton.addEventListener("click", function () {
    if (prompt("Are you sure? (type 'yes')") === "yes") {
      localStorage.removeItem("mySavedGame");
      localStorage.removeItem("savedBatterIndex");
      let awayTeamName = prompt("Enter away team");
      let homeTeamName = prompt("Enter home team");
      resetGameScore(awayTeamName, homeTeamName);
      loadAtBatTracker();
    } else {
      return;
    }
  });

  const newGameDiv = document.createElement("div");
  newGameDiv.setAttribute("id", "newGameDiv");
  newGameDiv.appendChild(newGameButton);
  tabContent.appendChild(newGameDiv);
}

function saveGame() {
  localStorage.setItem("mySavedGame", JSON.stringify(gameScore));
}
function loadGame() {
  gameScore = JSON.parse(localStorage.getItem("mySavedGame"));
}

export { loadAtBatTracker };
