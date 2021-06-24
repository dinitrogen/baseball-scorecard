let myRoster = [];


//at Bat prototype
const atBatProto = {
    getFullName() {
        return this.firstName + " " + this.lastName;
    },
    plateApp() {
        this.numPA++;
    },
    atBat() {
        this.numAtBats++;
    },
    hitSingle() {
        this.numSingles++;
    },
    hitDouble() {
        this.numDoubles++;
    },
    hitTriple() {
        this.numTriples++;
    },
    hitHR() {
        this.numHRs++;
    },
    strikeout() {
        this.numStrikeouts++;
    },
    walk() {
        this.numWalks++;
    },
    HBP() {
        this.numHBPs++;
    },
    sacrifice() {
        this.numSacs++;
    },
    calculateAB() {
        let atBats = this.numPA - this.numWalks - this.numSacs - this.numHBPs;
        return atBats;
    },
    calculateAVG() {
        let hits = (this.numSingles + this.numDoubles + this.numTriples + this.numHRs);
        let avg = Math.trunc(hits / this.numAtBats * 1000) / 1000;
        return avg;
    },
    calculateOBP() {
        let hits = (this.numSingles + this.numDoubles + this.numTriples + this.numHRs);
        let obEvents = hits + this.numWalks + this.numHBPs;
        let obp = Math.trunc(obEvents / this.numPA * 1000) / 1000;
        return obp;
    },


}

// Player factory function
const createPlayer = function(firstName, lastName, jerseyNum) {
    let player = Object.create(atBatProto);
    player.firstName = firstName;
    player.lastName = lastName;
    player.jerseyNum = jerseyNum;
    player.numPA = 10
    player.numRuns = 0;
    player.numSingles = 1;
    player.numDoubles = 2;
    player.numTriples = 3;
    player.numHRs = 0;
    player.numRBIs = 0;
    player.numSacs = 0;
    player.numStrikeouts = 3;
    player.numWalks = 2;
    player.numHBPs = 0;
    player.numAtBats = player.calculateAB();
    player.avg = player.calculateAVG();
    player.obp = player.calculateOBP();

    return player;
}


// Assign DOM elements
function createNewPlayerFormDiv() {
    const newPlayerFormDiv = document.createElement('div')
    newPlayerFormDiv.setAttribute('id','newPlayerFormDiv');
    return newPlayerFormDiv;
}

function createAddPlayerButton() {
    const addPlayerButton = document.createElement('button');
    addPlayerButton.setAttribute('id','addPlayerButton');
    addPlayerButton.addEventListener('click', createNewPlayerForm);
    const btnText = document.createElement('span');
    btnText.textContent = 'Add Player';
    addPlayerButton.appendChild(btnText);
    return addPlayerButton;
}


// At bat buttons
const singleButton = document.createElement('button');
singleButton.setAttribute('id','singleButton');
singleButton.addEventListener('click', function() {
    myRoster[0].hitSingle();
    console.log(myRoster[0].numSingles);
    console.table(myRoster);
});


function createNewPlayerForm() {

    const newPlayerForm = document.createElement('form');

    const newFirstNameField = document.createElement('input');
    newFirstNameField.setAttribute('type', 'text');
    newFirstNameField.setAttribute('placeholder', 'First name');
    newFirstNameField.setAttribute('id', 'newFirstName');

    const newLastNameField = document.createElement('input');
    newLastNameField.setAttribute('type', 'text');
    newLastNameField.setAttribute('placeholder', 'Last name');
    newLastNameField.setAttribute('id', 'newLastName');

    const newJerseyNumField = document.createElement('input');
    newJerseyNumField.setAttribute('type', 'text');
    newJerseyNumField.setAttribute('placeholder', 'Jersey number');
    newJerseyNumField.setAttribute('id', 'newJerseyNum');

    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('value', 'Submit');
    submitButton.addEventListener('click', function() {
        addPlayer();
        displayRosterTable();
        while (newPlayerFormDiv.firstChild) {
            newPlayerFormDiv.removeChild(newPlayerFormDiv.lastChild);
        }
    });

    newPlayerForm.reset();
    newPlayerFormDiv.appendChild(newPlayerForm);
    newPlayerForm.appendChild(newFirstNameField);
    newPlayerForm.appendChild(newLastNameField);
    newPlayerForm.appendChild(newJerseyNumField);
    newPlayerForm.appendChild(submitButton);
}

function addPlayer() {
    let newFirstName = document.getElementById('newFirstName').value;
    let newLastName = document.getElementById('newLastName').value;
    let newJerseyNum = document.getElementById('newJerseyNum').value;
    let newPlayer = createPlayer(newFirstName, newLastName, newJerseyNum);
    myRoster.push(newPlayer);
    saveRoster();
    console.table(myRoster);
    
    // playerStats.textContent = player1.getFullName();
    // console.log(player1.numAtBats);
    // player1.atBat();
    // console.log(player1.numAtBats);
    // player1.hitSingle();
    // console.log(player1.numSingles);
}

function createRosterTable() {
    const rosterTable = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    headerRow.appendChild(nameHeader);

    const numHeader = document.createElement('th');
    numHeader.textContent = 'Number';
    headerRow.appendChild(numHeader);
    
    const paHeader = document.createElement('th');
    paHeader.textContent = 'PA';
    headerRow.appendChild(paHeader);

    const atBatsHeader = document.createElement('th');
    atBatsHeader.textContent = 'AB';
    headerRow.appendChild(atBatsHeader);

    const runsHeader = document.createElement('th');
    runsHeader.textContent = 'R';
    headerRow.appendChild(runsHeader);

    const singlesHeader = document.createElement('th');
    singlesHeader.textContent = '1B';
    headerRow.appendChild(singlesHeader);

    const doublesHeader = document.createElement('th');
    doublesHeader.textContent = '2B';
    headerRow.appendChild(doublesHeader);

    const triplesHeader = document.createElement('th');
    triplesHeader.textContent = '3B';
    headerRow.appendChild(triplesHeader);

    const homerunsHeader = document.createElement('th');
    homerunsHeader.textContent = 'HR';
    headerRow.appendChild(homerunsHeader);

    const rbiHeader = document.createElement('th');
    rbiHeader.textContent = 'RBI';
    headerRow.appendChild(rbiHeader);

    const walksHeader = document.createElement('th');
    walksHeader.textContent = 'BB';
    headerRow.appendChild(walksHeader);

    const strikeoutsHeader = document.createElement('th');
    strikeoutsHeader.textContent = 'SO';
    headerRow.appendChild(strikeoutsHeader);

    const sacsHeader = document.createElement('th');
    sacsHeader.textContent = 'SF';
    headerRow.appendChild(sacsHeader);

    const avgHeader = document.createElement('th');
    avgHeader.textContent = 'AVG';
    headerRow.appendChild(avgHeader);

    const obpHeader = document.createElement('th');
    obpHeader.textContent = 'OBP';
    headerRow.appendChild(obpHeader);

    // other headers

    const delHeader = document.createElement('th');
    delHeader.textContent = 'Remove';
    headerRow.appendChild(delHeader);
    
    rosterTable.appendChild(headerRow);
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id','tbody');
    rosterTable.appendChild(tbody);

    return rosterTable;
}

function displayRosterTable() {
    let tbody = document.getElementById('tbody');

    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    } 

    for (let player of myRoster) {
        const playerRow = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = `${player.firstName} ${player.lastName}`;
        playerRow.appendChild(nameCell);
        
        const numCell = document.createElement('td');
        numCell.textContent = `#${player.jerseyNum}`;
        playerRow.appendChild(numCell);

        const paCell = document.createElement('td');
        paCell.textContent = `${player.numPA}`;
        playerRow.appendChild(paCell);

        const atBatsCell = document.createElement('td');
        atBatsCell.textContent = `${player.numAtBats}`;
        playerRow.appendChild(atBatsCell);

        const runsCell = document.createElement('td');
        runsCell.textContent = `${player.numRuns}`;
        playerRow.appendChild(runsCell);    

        const singlesCell = document.createElement('td');
        singlesCell.textContent = `${player.numSingles}`;
        playerRow.appendChild(singlesCell);
        
        const doublesCell = document.createElement('td');
        doublesCell.textContent = `${player.numDoubles}`;
        playerRow.appendChild(doublesCell);
        
        const triplesCell = document.createElement('td');
        triplesCell.textContent = `${player.numTriples}`;
        playerRow.appendChild(triplesCell);
        
        const homerunsCell = document.createElement('td');
        homerunsCell.textContent = `${player.numHRs}`;
        playerRow.appendChild(homerunsCell);
        
        const rbiCell = document.createElement('td');
        rbiCell.textContent = `${player.numRBIs}`;
        playerRow.appendChild(rbiCell);

        const walksCell = document.createElement('td');
        walksCell.textContent = `${player.numWalks}`;
        playerRow.appendChild(walksCell);

        const strikeoutsCell = document.createElement('td');
        strikeoutsCell.textContent = `${player.numStrikeouts}`;
        playerRow.appendChild(strikeoutsCell);

        const sacsCell = document.createElement('td');
        sacsCell.textContent = `${player.numSacs}`;
        playerRow.appendChild(sacsCell);
        
        const avgCell = document.createElement('td');
        avgCell.textContent = `${player.avg}`;
        playerRow.appendChild(avgCell);

        const obpCell = document.createElement('td');
        obpCell.textContent = `${player.obp}`;
        playerRow.appendChild(obpCell);
        // other stats
        
        const delCell = document.createElement('td');
        const delButton = document.createElement('button');
        delButton.textContent = 'remove player';
        delButton.onclick = function() {
            tbody.removeChild(playerRow);
            myRoster.splice(myRoster.indexOf(player), 1);
            displayRosterTable();
            saveRoster();
            console.table(myRoster); //remove later
        }
        delCell.appendChild(delButton);
        playerRow.appendChild(delCell);
        
        tbody.appendChild(playerRow);
    }

}


function loadRosterPage() {

    const newPlayerFormDiv = createNewPlayerFormDiv();
    const addPlayerButton = createAddPlayerButton();
    const rosterTable = createRosterTable();
    
    const tabContent = document.getElementById('tabContent');
    tabContent.textContent = '';

    tabContent.appendChild(addPlayerButton);
    tabContent.appendChild(newPlayerFormDiv);
    tabContent.appendChild(rosterTable);

    // add clear roster button
    const clearRosterButton = document.createElement('button');
    clearRosterButton.textContent = 'Clear roster';
    clearRosterButton.addEventListener('click', function() {
        if (prompt("Are you sure? (type 'yes')") === 'yes') {
            localStorage.removeItem("mySavedRoster");
            myRoster = [];
            loadRosterPage();
        } else {
            return;
        }
    });
    tabContent.appendChild(clearRosterButton);
    
    // Check for saved roster
    if (localStorage.getItem('mySavedRoster')) {
        //alert("Found saved roster.");
        loadRoster();
        displayRosterTable();
    } 

}

// local storage functions
function loadRoster() {
    myRoster = JSON.parse(localStorage.getItem("mySavedRoster"));
}

function saveRoster() {
    localStorage.setItem("mySavedRoster", JSON.stringify(myRoster));
}



export { loadRosterPage }

