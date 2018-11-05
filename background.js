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
    var shipRegex = /^\s*s:(.+?)(?:\s+(-.*))?$/i
    if (match = questRegex.exec(text)) {
        quest(match[1])
    } else if (match = worldRegex.exec(text)) {
        world({
            worldNumber: match[1],
            mapNumber: match[2],
            options: extractOptions(match[3])
        })
    } else if (match = shipRegex.exec(text)) {
        ship({
            shipName: match[1],
            options: extractOptions(match[2])
        })
    }
}

function quest(questID) {
    if (/^B[A-Z]/i.test(questID)) {
        questID = questID.charAt(0).toUpperCase() + questID.charAt(1).toLowerCase() + questID.slice(2)
    } else {
        questID = questID.toUpperCase()
    }
    var url = "https://kancolle.wikia.com/wiki/Quests#" + questID
    chrome.tabs.update({url: url})
}

function world(worldInfo) {
    var url = "https://kancolle.wikia.com/wiki/World_" + worldInfo.worldNumber
    if (worldInfo.mapNumber != null) {
        url += "/" + worldInfo.worldNumber + "-" + worldInfo.mapNumber
        if (worldInfo.options[0] == "ep") {
            url += "/Enemy_patterns"
            if (worldInfo.options[1] != undefined) {
                url += "#" + worldInfo.worldNumber + "-" + worldInfo.mapNumber + "_" + worldInfo.options[1].toUpperCase()
            }
        }
    }
    chrome.tabs.update({url: url})
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function addUnderscores(string) {
    return string.replace(" ", "_")
}

function ship(shipInfo) {
    var url = "https://kancolle.wikia.com/wiki/" + addUnderscores(toTitleCase(shipInfo.shipName))
    if (shipInfo.options[0] == "q") {
        url += "#Quotes"
    } else if (shipInfo.options[0] == "g") {
        url += "/Gallery"
    }
    chrome.tabs.update({url: url})
}

chrome.omnibox.onInputEntered.addListener(input)