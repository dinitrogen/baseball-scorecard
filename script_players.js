let addPlayerButton = document.querySelector("#addPlayerButton");
let playerStats = document.querySelector("#playerStats");

addPlayerButton.addEventListener('click', addPlayer);

function addPlayer() {
    const player1 = {
        firstName: "Francis",
        lastName: "Knobloch",
        jerseyNum: "6",
        numHits: 0,
    }
    playerStats.textContent = player1.firstName + " " + player1.lastName + ", Hits: " + 
        player1.numHits;
}



