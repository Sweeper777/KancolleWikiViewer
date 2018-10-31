function extractOptions(optionString) {
    var optionsRegex = /-([a-z]+)/gi
    var options = []
    var match = null
    while (match = optionsRegex.exec(optionString)) {
        options.push(match[1])
    }

    return options
}

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