import { loadNavBar } from "./landingPage.js";
import { loadAtBatTracker } from "./atBatTracker.js";
import { loadRosterPage } from "./roster.js";
import { loadGameTracker } from "./gameTracker.js";

function addNavListeners() {
  const atBatButton = document.getElementById("atBatButton");
  const gameTrackerButton = document.getElementById("gameTrackerButton");
  const rosterButton = document.getElementById("rosterButton");

  atBatButton.addEventListener("click", loadAtBatTracker);
  gameTrackerButton.addEventListener("click", loadGameTracker);
  rosterButton.addEventListener("click", loadRosterPage);
}

function initializePage() {
  loadNavBar();
  addNavListeners();
}

initializePage();
