var questRegex = /^\s*([a-z]{1,2}\d+)\s*$/i

function input(text) {
    if (match = questRegex.exec(text)) {
        quest(match[1])
    }
}

function quest(questID) {
    var url = "https://kancolle.wikia.com/wiki/Quests#" + questID.toUpperCase();
    chrome.tabs.update({url: url})
}

chrome.omnibox.onInputEntered.addListener(input)