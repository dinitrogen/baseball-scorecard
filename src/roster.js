let myRoster = [];


//at Bat prototype
const atBatProto = {
    getFullName() {
        return this.firstName + " " + this.lastName;
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
    }
}

// Player factory function
const createPlayer = function(firstName, lastName, jerseyNum) {
    let player = Object.create(atBatProto);
    player.firstName = firstName;
    player.lastName = lastName;
    player.jerseyNum = jerseyNum;
    player.numAtBats = 0;
    player.numSingles = 0;
    player.numDoubles = 0;
    player.numTriples = 0;
    player.numHRs = 0;
    player.numStrikeouts = 0;
    player.numWalks = 0;
    player.numHBPs = 0;
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
    
    const numHeader = document.createElement('th');
    numHeader.textContent = 'Number';
    
    const delHeader = document.createElement('th');
    delHeader.textContent = 'Remove';

    // Other headers
    
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(numHeader);
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
        
        const numCell = document.createElement('td');
        numCell.textContent = `#${player.jerseyNum}`;
        
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
        
        playerRow.appendChild(nameCell);
        playerRow.appendChild(numCell);
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
    
    // Check for saved roster
    if (localStorage.getItem('mySavedRoster')) {
        alert("Found saved roster.");
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

