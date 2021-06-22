// Nav bar creator

    function createNavButton(id, text) {
        const navButton = document.createElement('button');
        navButton.setAttribute('id', id);
        navButton.setAttribute('class', 'navButton');
        const navButtonText = document.createElement('span');
        navButtonText.textContent = text;
        navButton.appendChild(navButtonText);
        return navButton;
    }

    function createNavBar(id) {
        const navBar = document.createElement('nav');
        navBar.setAttribute('id', id);
        
        const atBatButton = createNavButton('atBatButton', 'At Bat Tracker');
        const gameTrackerButton = createNavButton('gameTrackerButton', 'Game Tracker');
        const rosterButton = createNavButton('rosterButton', 'Roster');

        navBar.appendChild(atBatButton);
        navBar.appendChild(gameTrackerButton);
        navBar.appendChild(rosterButton);
        
        return navBar;
    }

    function loadNavBar() {
        const content = document.getElementById('content');

        const nav = createNavBar('navBar');
        content.appendChild(nav);
    }


export { loadNavBar }
