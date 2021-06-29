let myRoster = [];


// Stats calculations

function calculateAB(player) {
    let atBats = player.numPA - player.numWalks - player.numSacs - player.numHBPs;
    return atBats;
}

function calculateAVG(player) {
    let hits = (player.numSingles + player.numDoubles + player.numTriples + player.numHRs);
    let avg = Math.trunc(hits / player.numAtBats * 1000) / 1000;
    return avg;
}

function calculateOBP(player) {
    let hits = (player.numSingles + player.numDoubles + player.numTriples + player.numHRs);
    let obEvents = hits + player.numWalks + player.numHBPs;
    let obp = Math.trunc(obEvents / player.numPA * 1000) / 1000;
    return obp;
}


//At Bat prototype that new players inherit. But none of these methods are used so remove later.
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
}


// Create a new player factory function
const createPlayer = function(firstName, lastName, jerseyNum) {
    let player = Object.create(atBatProto);
    player.firstName = firstName;
    player.lastName = lastName;
    player.jerseyNum = jerseyNum;
    player.numPA = 0;
    player.numRuns = 0;
    player.numSingles = 0;
    player.numDoubles = 0;
    player.numTriples = 0;
    player.numHRs = 0;
    player.numRBIs = 0;
    player.numSacs = 0;
    player.numStrikeouts = 0;
    player.numWalks = 0;
    player.numHBPs = 0;
    player.numAtBats = calculateAB(player);
    player.avg = calculateAVG(player);
    player.obp = calculateOBP(player);

    return player;
}

// Create the DOM elements for load roster page

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

function createRosterTable() {
    const rosterTable = document.createElement('table');
    const headerRow = document.createElement('tr');
    
    // Player stats headers
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

    const walksHeader = document.createElement('th');
    walksHeader.textContent = 'BB';
    headerRow.appendChild(walksHeader);

    const strikeoutsHeader = document.createElement('th');
    strikeoutsHeader.textContent = 'SO';
    headerRow.appendChild(strikeoutsHeader);

    const sacsHeader = document.createElement('th');
    sacsHeader.textContent = 'SF';
    headerRow.appendChild(sacsHeader);

    const rbiHeader = document.createElement('th');
    rbiHeader.textContent = 'RBI';
    headerRow.appendChild(rbiHeader);

    const avgHeader = document.createElement('th');
    avgHeader.textContent = 'AVG';
    headerRow.appendChild(avgHeader);

    const obpHeader = document.createElement('th');
    obpHeader.textContent = 'OBP';
    headerRow.appendChild(obpHeader);

    // Buttons headers
    const addRunHeader = document.createElement('th');
    addRunHeader.textContent = 'Add run';
    headerRow.appendChild(addRunHeader);

    const moveHeader = document.createElement('th');
    moveHeader.textContent = 'Change order';
    headerRow.appendChild(moveHeader);

    const editHeader = document.createElement('th');
    editHeader.textContent = 'Edit player';
    headerRow.appendChild(editHeader);

    const delHeader = document.createElement('th');
    delHeader.textContent = 'Remove';
    headerRow.appendChild(delHeader);

    // Add header row to table
    rosterTable.appendChild(headerRow);
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id','tbody');
    rosterTable.appendChild(tbody);

    return rosterTable;
}


// Create and display a new player form
function createNewPlayerForm() {

    if (newPlayerFormDiv.firstChild) {
        return;
    }

    const newPlayerForm = document.createElement('form');

    const newFirstNameLabel = document.createElement('label');
    newFirstNameLabel.setAttribute('for','newFirstName');
    newFirstNameLabel.textContent = 'First name:';
    const newFirstNameField = document.createElement('input');
    newFirstNameField.setAttribute('type', 'text');
    newFirstNameField.setAttribute('placeholder', 'First name');
    newFirstNameField.setAttribute('id', 'newFirstName');
    newPlayerForm.appendChild(newFirstNameLabel);
    newPlayerForm.appendChild(newFirstNameField);

    const newLastNameLabel = document.createElement('label');
    newLastNameLabel.setAttribute('for','newLastName');
    newLastNameLabel.textContent = 'Last name:';
    const newLastNameField = document.createElement('input');
    newLastNameField.setAttribute('type', 'text');
    newLastNameField.setAttribute('placeholder', 'Last name');
    newLastNameField.setAttribute('id', 'newLastName');
    newPlayerForm.appendChild(newLastNameLabel);
    newPlayerForm.appendChild(newLastNameField);

    const newJerseyNumLabel = document.createElement('label');
    newJerseyNumLabel.setAttribute('for','newJerseyNum');
    newJerseyNumLabel.textContent = 'Jersey #:';
    const newJerseyNumField = document.createElement('input');
    newJerseyNumField.setAttribute('type', 'text');
    newJerseyNumField.setAttribute('placeholder', 'Jersey #');
    newJerseyNumField.setAttribute('id', 'newJerseyNum');
    newPlayerForm.appendChild(newJerseyNumLabel);
    newPlayerForm.appendChild(newJerseyNumField);

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
    newPlayerForm.appendChild(submitButton);
}

// Takes player form values to create new player and add to roster array
function addPlayer() {
    let newFirstName = document.getElementById('newFirstName').value;
    let newLastName = document.getElementById('newLastName').value;
    let newJerseyNum = document.getElementById('newJerseyNum').value;
    let newPlayer = createPlayer(newFirstName, newLastName, newJerseyNum);
    myRoster.push(newPlayer);
    saveTempRoster();
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
        player.numAtBats = calculateAB(player);
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

        const walksCell = document.createElement('td');
        walksCell.textContent = `${player.numWalks}`;
        playerRow.appendChild(walksCell);

        const strikeoutsCell = document.createElement('td');
        strikeoutsCell.textContent = `${player.numStrikeouts}`;
        playerRow.appendChild(strikeoutsCell);

        const sacsCell = document.createElement('td');
        sacsCell.textContent = `${player.numSacs}`;
        playerRow.appendChild(sacsCell);

        const rbiCell = document.createElement('td');
        rbiCell.textContent = `${player.numRBIs}`;
        playerRow.appendChild(rbiCell);
        
        const avgCell = document.createElement('td');
        player.avg = calculateAVG(player);
        avgCell.textContent = `${player.avg}`;
        playerRow.appendChild(avgCell);

        const obpCell = document.createElement('td');
        player.obp = calculateOBP(player);
        obpCell.textContent = `${player.obp}`;
        playerRow.appendChild(obpCell);
        
        // Can add other stats here

        // Table buttons
        const addRunCell = document.createElement('td');
        const addRunButton = document.createElement('button');
        addRunButton.textContent = 'Add run';
        addRunButton.onclick = function() {
            player.numRuns++;
            runsCell.textContent = `${player.numRuns}`;
            saveTempRoster();
        }
        addRunCell.appendChild(addRunButton);
        playerRow.appendChild(addRunCell);

        const moveCell = document.createElement('td');
        const moveDownButton = document.createElement('button');
        moveDownButton.textContent = 'Move down';
        moveDownButton.onclick = function() {
            let index = myRoster.indexOf(player);
            if (myRoster.length === 1) {
                return;
            } else if (index === myRoster.length - 1) {
                [myRoster[0], myRoster[index]] = [myRoster[index], myRoster[0]];
            } else {
                [myRoster[index], myRoster[index + 1]] = [myRoster[index + 1], myRoster[index]];
            }       
            displayRosterTable();
            saveTempRoster();
        }

        const moveUpButton = document.createElement('button');
        moveUpButton.textContent = 'Move up';
        moveUpButton.onclick = function() {
            let index = myRoster.indexOf(player);
            if (myRoster.length === 1) {
                return;
            } else if (index === 0) {
                [myRoster[myRoster.length - 1], myRoster[index]] = [myRoster[index], myRoster[myRoster.length - 1]];
            } else {
                [myRoster[index], myRoster[index - 1]] = [myRoster[index - 1], myRoster[index]];
            }       
            displayRosterTable();
            saveTempRoster();
        }

        moveCell.appendChild(moveUpButton);
        moveCell.appendChild(moveDownButton);
        playerRow.appendChild(moveCell);
        
        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit player';
        editButton.onclick = function() {
            loadEditPlayerPage(player);
        }
        editCell.appendChild(editButton);
        playerRow.appendChild(editCell);

        const delCell = document.createElement('td');
        const delButton = document.createElement('button');
        delButton.textContent = 'Remove player';
        delButton.onclick = function() {
            if (prompt("Are you sure? (type 'yes')") === 'yes') {
                tbody.removeChild(playerRow);
                myRoster.splice(myRoster.indexOf(player), 1);
                displayRosterTable();
                saveTempRoster();
            } else {
                return;
            }
        }
        delCell.appendChild(delButton);
        playerRow.appendChild(delCell);
        
        tbody.appendChild(playerRow);
    }
}

// Player editor
// Create edit player page DOM elements
function createEditPlayerDiv() {
    const editPlayerDiv = document.createElement('div');
    editPlayerDiv.setAttribute('id', 'editPlayerDiv');
    return editPlayerDiv;
}

function createEditPlayerForm(player) {
    
    const editPlayerForm = document.createElement('form');
    editPlayerForm.setAttribute('id', 'editPlayerForm');
    const editPlayerHeader = document.createElement('h2');
    editPlayerHeader.textContent = `Edit player stats: ${player.firstName} ${player.lastName}`;
    editPlayerForm.appendChild(editPlayerHeader);

    const firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'editFirstName');
    firstNameLabel.textContent = 'First Name:';
    const editFirstNameField = document.createElement('input');
    editFirstNameField.setAttribute('type', 'text');
    editFirstNameField.setAttribute('value', `${player.firstName}`);
    editFirstNameField.setAttribute('id', 'editFirstName');
    editPlayerForm.appendChild(firstNameLabel);
    editPlayerForm.appendChild(editFirstNameField);

    const lastNameLabel = document.createElement('label');
    lastNameLabel.setAttribute('for', 'editLastName');
    lastNameLabel.textContent = 'Last Name:';
    const editLastNameField = document.createElement('input');
    editLastNameField.setAttribute('type', 'text');
    editLastNameField.setAttribute('value', `${player.lastName}`);
    editLastNameField.setAttribute('id', 'editLastName');
    editPlayerForm.appendChild(lastNameLabel);
    editPlayerForm.appendChild(editLastNameField);

    const jerseyNumLabel = document.createElement('label');
    jerseyNumLabel.setAttribute('for', 'editJerseyNum');
    jerseyNumLabel.textContent = 'Jersey #:';
    const editJerseyNumField = document.createElement('input');
    editJerseyNumField.setAttribute('type', 'text');
    editJerseyNumField.setAttribute('value', `${player.jerseyNum}`);
    editJerseyNumField.setAttribute('id', 'editJerseyNum');
    editPlayerForm.appendChild(jerseyNumLabel);
    editPlayerForm.appendChild(editJerseyNumField);

    const PALabel = document.createElement('label');
    PALabel.setAttribute('for', 'editPA');
    PALabel.textContent = 'PA:';
    const editPAField = document.createElement('input');
    editPAField.setAttribute('type', 'number');
    editPAField.setAttribute('value', `${player.numPA}`);
    editPAField.setAttribute('id', 'editPA');
    editPlayerForm.appendChild(PALabel);
    editPlayerForm.appendChild(editPAField);
    
    const runsLabel = document.createElement('label');
    runsLabel.setAttribute('for', 'editRuns');
    runsLabel.textContent = 'R:';
    const editRunsField = document.createElement('input');
    editRunsField.setAttribute('type', 'number');
    editRunsField.setAttribute('value', `${player.numRuns}`);
    editRunsField.setAttribute('id', 'editRuns');
    editPlayerForm.appendChild(runsLabel);
    editPlayerForm.appendChild(editRunsField);

    const singlesLabel = document.createElement('label');
    singlesLabel.setAttribute('for', 'editSingles');
    singlesLabel.textContent = '1B:';
    const editSinglesField = document.createElement('input');
    editSinglesField.setAttribute('type', 'number');
    editSinglesField.setAttribute('value', `${player.numSingles}`);
    editSinglesField.setAttribute('id', 'editSingles');
    editPlayerForm.appendChild(singlesLabel);
    editPlayerForm.appendChild(editSinglesField);

    const doublesLabel = document.createElement('label');
    doublesLabel.setAttribute('for', 'editDoubles');
    doublesLabel.textContent = '2B:';
    const editDoublesField = document.createElement('input');
    editDoublesField.setAttribute('type', 'number');
    editDoublesField.setAttribute('value', `${player.numDoubles}`);
    editDoublesField.setAttribute('id', 'editDoubles');
    editPlayerForm.appendChild(doublesLabel);
    editPlayerForm.appendChild(editDoublesField);

    const triplesLabel = document.createElement('label');
    triplesLabel.setAttribute('for', 'editTriples');
    triplesLabel.textContent = '3B:';
    const editTriplesField = document.createElement('input');
    editTriplesField.setAttribute('type', 'number');
    editTriplesField.setAttribute('value', `${player.numTriples}`);
    editTriplesField.setAttribute('id', 'editTriples');
    editPlayerForm.appendChild(triplesLabel);
    editPlayerForm.appendChild(editTriplesField);

    const homerunsLabel = document.createElement('label');
    homerunsLabel.setAttribute('for', 'editHomeruns');
    homerunsLabel.textContent = 'HR:';
    const editHomerunsField = document.createElement('input');
    editHomerunsField.setAttribute('type', 'number');
    editHomerunsField.setAttribute('value', `${player.numHRs}`);
    editHomerunsField.setAttribute('id', 'editHomeruns');
    editPlayerForm.appendChild(homerunsLabel);
    editPlayerForm.appendChild(editHomerunsField);

    const walksLabel = document.createElement('label');
    walksLabel.setAttribute('for', 'editWalks');
    walksLabel.textContent = 'BB:';
    const editWalksField = document.createElement('input');
    editWalksField.setAttribute('type', 'number');
    editWalksField.setAttribute('value', `${player.numWalks}`);
    editWalksField.setAttribute('id', 'editWalks');
    editPlayerForm.appendChild(walksLabel);
    editPlayerForm.appendChild(editWalksField);
    
    const strikeoutsLabel = document.createElement('label');
    strikeoutsLabel.setAttribute('for', 'editStrikeouts');
    strikeoutsLabel.textContent = 'SO:';
    const editStrikeoutsField = document.createElement('input');
    editStrikeoutsField.setAttribute('type', 'number');
    editStrikeoutsField.setAttribute('value', `${player.numStrikeouts}`);
    editStrikeoutsField.setAttribute('id', 'editStrikeouts');
    editPlayerForm.appendChild(strikeoutsLabel);
    editPlayerForm.appendChild(editStrikeoutsField);

    const sacsLabel = document.createElement('label');
    sacsLabel.setAttribute('for', 'editSacs');
    sacsLabel.textContent = 'SF:';
    const editSacsField = document.createElement('input');
    editSacsField.setAttribute('type', 'number');
    editSacsField.setAttribute('value', `${player.numSacs}`);
    editSacsField.setAttribute('id', 'editSacs');
    editPlayerForm.appendChild(sacsLabel);
    editPlayerForm.appendChild(editSacsField);

    const RBILabel = document.createElement('label');
    RBILabel.setAttribute('for', 'editRBIs');
    RBILabel.textContent = 'RBI:';
    const editRBIField = document.createElement('input');
    editRBIField.setAttribute('type', 'number');
    editRBIField.setAttribute('value', `${player.numRBIs}`);
    editRBIField.setAttribute('id', 'editRBIs');
    editPlayerForm.appendChild(RBILabel);
    editPlayerForm.appendChild(editRBIField);

    const HBPLabel = document.createElement('label');
    HBPLabel.setAttribute('for', 'editHBPs');
    HBPLabel.textContent = 'HBP:';
    const editHBPField = document.createElement('input');
    editHBPField.setAttribute('type', 'number');
    editHBPField.setAttribute('value', `${player.numHBPs}`);
    editHBPField.setAttribute('id', 'editHBPs');
    editPlayerForm.appendChild(HBPLabel);
    editPlayerForm.appendChild(editHBPField);

    // Can add other player stats here

    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('value', 'Update player');
    submitButton.addEventListener('click', function() {
        updatePlayer(player);
        loadRosterPage();
    });
    editPlayerForm.appendChild(submitButton);
    
    return editPlayerForm;
}

// Takes inputs from edit player page and updates player in roster array
function updatePlayer(player) {
    player.firstName = document.getElementById('editFirstName').value;
    player.lastName = document.getElementById('editLastName').value;
    player.jerseyNum = document.getElementById('editJerseyNum').value;
    player.numPA = parseInt(document.getElementById('editPA').value);
    player.numRuns = parseInt(document.getElementById('editRuns').value);
    player.numSingles = parseInt(document.getElementById('editSingles').value);
    player.numDoubles = parseInt(document.getElementById('editDoubles').value);
    player.numTriples = parseInt(document.getElementById('editTriples').value);
    player.numHRs = parseInt(document.getElementById('editHomeruns').value);
    player.numWalks = parseInt(document.getElementById('editWalks').value);
    player.numStrikeouts = parseInt(document.getElementById('editStrikeouts').value);
    player.numSacs = parseInt(document.getElementById('editSacs').value);
    player.numRBIs = parseInt(document.getElementById('editRBIs').value);
    player.numHBPs = parseInt(document.getElementById('editHBPs').value);
    player.numAtBats = calculateAB(player);
    player.avg = calculateAVG(player);
    player.obp = calculateOBP(player);

    saveTempRoster();
}

function createReturnButton() {
    const returnButton = document.createElement('button');
    returnButton.setAttribute('id', 'returnButton');
    returnButton.textContent = 'Return';
    returnButton.addEventListener('click', loadRosterPage);
    return returnButton;
}

// Load the edit player page
function loadEditPlayerPage(player) {
    const editPlayerDiv = createEditPlayerDiv();
    const editPlayerForm = createEditPlayerForm(player);
    editPlayerDiv.appendChild(editPlayerForm);
    
    const returnButton = createReturnButton();

    const tabContent = document.getElementById('tabContent');
    tabContent.textContent = '';
    tabContent.appendChild(editPlayerDiv);
    tabContent.appendChild(returnButton);
}


// Load the roster page
function loadRosterPage() {

    const newPlayerFormDiv = createNewPlayerFormDiv();
    const addPlayerButton = createAddPlayerButton();
    const rosterTable = createRosterTable();
    
    const tabContent = document.getElementById('tabContent');
    tabContent.textContent = '';

    tabContent.appendChild(addPlayerButton);
    tabContent.appendChild(newPlayerFormDiv);
    tabContent.appendChild(rosterTable);

    // add save roster button
    const saveRosterButton = document.createElement('button');
    saveRosterButton.setAttribute('id', 'saveRosterButton')
    saveRosterButton.textContent = 'Save roster';
    saveRosterButton.addEventListener('click', function() {
        let saveName = prompt("Name? ");
        saveRoster(saveName);
    });
    tabContent.appendChild(saveRosterButton);

    // add load roster button
    const loadRosterButton = document.createElement('button');
    loadRosterButton.setAttribute('id', 'loadRosterButton')
    loadRosterButton.textContent = 'Load roster';
    loadRosterButton.addEventListener('click', function() {
        let saveName = prompt("Name? ");
        loadRoster(saveName);
        saveTempRoster();
        displayRosterTable();
    });
    tabContent.appendChild(loadRosterButton);

    // add clear roster button
    const clearRosterButton = document.createElement('button');
    clearRosterButton.setAttribute('id', 'clearRosterButton')
    clearRosterButton.textContent = 'Clear current roster';
    clearRosterButton.addEventListener('click', function() {
        if (prompt("Are you sure? (type 'yes')") === 'yes') {
            localStorage.removeItem('tempRoster');
            localStorage.removeItem('savedBatterIndex');
            myRoster = [];
            loadRosterPage();
        } else {
            return;
        }
    });
    tabContent.appendChild(clearRosterButton);
    
    // Check for saved roster
    if (localStorage.getItem('tempRoster')) {
        //alert("Found saved roster.");
        loadRoster('tempRoster');
        displayRosterTable();
    }
}

// local storage functions for saving and loading rosters
// function loadRoster() {
//     myRoster = JSON.parse(localStorage.getItem("mySavedRoster"));
//     listSavedStuff();
// }

function loadRoster(saveName) {
    if (localStorage.getItem(saveName)) {
        myRoster = JSON.parse(localStorage.getItem(saveName));
    } else {
        alert('Roster not found.');
    }
    // listSavedStuff();
}

// function saveRoster() {
//     localStorage.setItem("mySavedRoster", JSON.stringify(myRoster));
// }

function saveTempRoster() {
    localStorage.setItem('tempRoster', JSON.stringify(myRoster));
}

function saveRoster(saveName) {
    if (localStorage.getItem(saveName) === null) {
        localStorage.setItem(saveName, JSON.stringify(myRoster));
    } else {
        if (prompt('Already exists. Overwrite? (type "yes")') === 'yes') {
            localStorage.setItem(saveName, JSON.stringify(myRoster));
        }
        else {
            return;
        }
    }
}


// function listSavedStuff() {
//     console.log(Object.keys(localStorage));
// }

export { loadRosterPage }

