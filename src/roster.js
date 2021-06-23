let teamArray = [];

// Assign new player form


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
    addPlayerButton.addEventListener('click', generateNewPlayerForm);
    const btnText = document.createElement('span');
    btnText.textContent = 'Add Player';
    addPlayerButton.appendChild(btnText);
    return addPlayerButton;
}

function createPlayerListDiv() {
    const playerListDiv = document.createElement('div');
    playerListDiv.setAttribute('id','playerListDiv');
    return playerListDiv;
}


// New player form elements

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
        displayPlayers();
        while (newPlayerFormDiv.firstChild) {
            newPlayerFormDiv.removeChild(newPlayerFormDiv.lastChild);
        }
    });


// At bat buttons
const singleButton = document.createElement('button');
singleButton.setAttribute('id','singleButton');
singleButton.addEventListener('click', function() {
    teamArray[0].hitSingle();
    console.log(teamArray[0].numSingles);
    console.table(teamArray);
});


function generateNewPlayerForm() {
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
    teamArray.push(newPlayer);
    console.table(teamArray);
    
    // playerStats.textContent = player1.getFullName();
    // console.log(player1.numAtBats);
    // player1.atBat();
    // console.log(player1.numAtBats);
    // player1.hitSingle();
    // console.log(player1.numSingles);
}


function displayPlayers() {
    while (playerListDiv.firstChild) {
        playerListDiv.removeChild(playerListDiv.lastChild);
    }

    for (let player of teamArray) {
        const playerCardDiv = document.createElement('div');
        playerCardDiv.setAttribute('class', 'playerCardDiv');
        playerCardDiv.setAttribute('id', `player${teamArray.indexOf(player)}`);
        playerListDiv.appendChild(playerCardDiv);

        const playerNameDiv = document.createElement('div');
        playerNameDiv.setAttribute('class', 'playerNameDiv');
        playerCardDiv.appendChild(playerNameDiv);
        playerNameDiv.textContent = `${player.firstName}`;

        // other player info

        const buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('class', 'buttonDiv');
        playerCardDiv.appendChild(buttonDiv);
        
        const delButton = document.createElement('button');
        delButton.setAttribute('class', 'delButton');
        buttonDiv.appendChild(delButton);
        delButton.textContent = 'remove player';
        delButton.onclick = function() {
            playerListDiv.removeChild(playerCardDiv);
            teamArray.splice(teamArray.indexOf(player), 1);
            console.table(teamArray); //remove later
        }
    }
}


function loadRosterPage() {
    const newPlayerFormDiv = createNewPlayerFormDiv();
    const addPlayerButton = createAddPlayerButton();
    const playerListDiv = createPlayerListDiv();

    
    const tabContent = document.getElementById('tabContent');
    tabContent.textContent = '';

    tabContent.appendChild(addPlayerButton);
    tabContent.appendChild(newPlayerFormDiv);
    tabContent.appendChild(playerListDiv);
    generateNewPlayerForm();


}

export { loadRosterPage }

