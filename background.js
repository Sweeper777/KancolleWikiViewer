function extractOptions(optionString) {
    var optionsRegex = /-([a-z]+)/gi
    var options = []
    var match = null
    while (match = optionsRegex.exec(optionString)) {
        options.push(match[1].toLowerCase())
    }

    return options
}

function input(text) {
    var questRegex = /^\s*([a-z]{1,2}\d+)\s*$/i
    var worldRegex = /^\s*(\d+)(?:-(\d+)\s*(.*))?$/
    if (match = questRegex.exec(text)) {
        quest(match[1])
    } else if (match = worldRegex.exec(text)) {
        world({
            worldNumber: match[1],
            mapNumber: match[2],
            options: extractOptions(match[3])
        })
    }
}

function quest(questID) {
    var url = "https://kancolle.wikia.com/wiki/Quests#" + questID.toUpperCase();
    chrome.tabs.update({url: url})
}

function world(worldInfo) {
    var url = "https://kancolle.wikia.com/wiki/World_" + worldInfo.worldNumber
    if (worldInfo.mapNumber != null) {
        url += "/" + worldInfo.worldNumber + "-" + worldInfo.mapNumber
    chrome.tabs.update({url: url})
}

chrome.omnibox.onInputEntered.addListener(input)