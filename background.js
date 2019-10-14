var eventOngoing = false
var eventWikiaLink = "https://kancolle.fandom.com/wiki/Summer_2019_Event"
var eventEnWikiLink = "http://en.kancollewiki.net/wiki/Summer_2019_Event"

function getPreferredWiki(completion) {
    chrome.storage.sync.get({
        wiki: "1"
      }, completion)
}

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
    var worldRegex = /^\s*(\d+)(?:-(\d+)\s*(.*))?$/i
    var worldRegexWithEvent = /^\s*(\d+|e)(?:-(\d+)\s*(.*))?$/i
    var shipRegex = /^\s*s:(.+?)(?:\s+(-.*))?$/i
    var equipmentRegex = /^\s*e:(.+?)\s*$/i
    var listRegex = /^list\s+(.+)/i
    if (match = questRegex.exec(text)) {
        quest(match[1])
    } else if (match = worldRegex.exec(text) || (eventOngoing && (match = worldRegexWithEvent.exec(text)))) {
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
    } else if (match = equipmentRegex.exec(text)) {
        equipment(match[1])
    } else if (match = listRegex.exec(text)) {
        list(match[1])
    }
}

function showSuggestions(text, suggest) {
    if (text.match(/^s:/)) {
        let partialName = text.substr(2)
        var suggestions = shipNames.filter(x => x.match(new RegExp(partialName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "i"))).slice(0, 5)
        suggest(suggestions.map(x => ({content: "s:" + x, description: x})))
    }
    else if (text.match(/^e:/)) {
        let partialName = text.substr(2)
        var suggestions = equipmentNames.filter(x => x.match(new RegExp(partialName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "i"))).slice(0, 10)
        suggest(suggestions.map(x => ({content: "e:" + x, description: x})))
    }
}

function quest(questID) {
    if (/^B[A-Z]/i.test(questID)) {
        questID = questID.charAt(0).toUpperCase() + questID.charAt(1).toLowerCase() + questID.slice(2)
    } else {
        questID = questID.toUpperCase()
    }
    getPreferredWiki(function(result) {
        var url = ""
        if (result.wiki == "2") {
            url = "http://en.kancollewiki.net/wiki/Quests#" + questID
        } else {
            url = "https://kancolle.fandom.com/wiki/Quests#" + questID
        }

        chrome.tabs.update({url: url})
    })
}

function world(worldInfo) {
    getPreferredWiki(function(result) {
        var url = ""
        if (result.wiki == "2" && worldInfo.worldNumber.toLowerCase() != "e") {
            url = enWikiWorld(worldInfo)
        } else if (result.wiki == "2") {
            url = enWikiEventWorld(worldInfo)
        } else if (worldInfo.worldNumber.toLowerCase() != "e") {
            url = wikiaWorld(worldInfo)
        } else {
            url = wikiaEventWorld(worldInfo)
        }

        chrome.tabs.update({url: url})
    })
}

function enWikiEventWorld(worldInfo) {
    if (worldInfo.mapNumber == null) {
        return eventEnWikiLink
    }
    return eventEnWikiLink + "#E-" + worldInfo.mapNumber
}

function wikiaEventWorld(worldInfo) {
    if (worldInfo.mapNumber == null) {
        return eventWikiaLink + "/Info"
    }
    return eventWikiaLink + "#/E-" + worldInfo.mapNumber
}

function enWikiWorld(worldInfo) {
    var url = "http://en.kancollewiki.net/wiki/World_" + worldInfo.worldNumber
    if (worldInfo.mapNumber != null) {
        url += "#" + worldInfo.worldNumber + "-" + worldInfo.mapNumber
        if (worldInfo.options[0] == "ep") {
            if (worldInfo.mapNumber == 1) {
                url = "http://en.kancollewiki.net/wiki/World_" + worldInfo.worldNumber + "#Nodes_and_Enemy_Encounters"
            } else {
                url = "http://en.kancollewiki.net/wiki/World_" + worldInfo.worldNumber + "#Nodes_and_Enemy_Encounters_" + worldInfo.mapNumber
            }
        } else if (worldInfo.options[0] == "dl") {
            if (worldInfo.mapNumber == 1) {
                url = "http://en.kancollewiki.net/wiki/World_" + worldInfo.worldNumber + "#Drops"
            } else {
                url = "http://en.kancollewiki.net/wiki/World_" + worldInfo.worldNumber + "#Drops_" + worldInfo.mapNumber
            }
        }
    }
    return url
}

function wikiaWorld(worldInfo) {
    var url = "https://kancolle.fandom.com/wiki/World_" + worldInfo.worldNumber
    if (worldInfo.mapNumber != null) {
        url += "/" + worldInfo.worldNumber + "-" + worldInfo.mapNumber
        if (worldInfo.options[0] == "ep") {
            url += "/Enemy_patterns"
            if (worldInfo.options[1] != undefined) {
                url += "#" + worldInfo.worldNumber + "-" + worldInfo.mapNumber + "_" + worldInfo.options[1].toUpperCase()
            }
        } else if (worldInfo.options[0] == "dl") {
            url += "/Drop_list"
        }
    }
    return url
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
    return string.replace(/ +/, "_")
}

function addPluses(string) {
    return string.replace(/ +/, "+")
}

function ship(shipInfo) {
    getPreferredWiki(function(result) {
        var urlHead = ""
        if (result.wiki == "2") {
            urlHead = "http://en.kancollewiki.net/wiki/"
        } else {
            urlHead = "https://kancolle.fandom.com/wiki/"
        }
        var url = urlHead + addUnderscores(toTitleCase(shipInfo.shipName))
        if (shipInfo.options[0] == "q") {
            url += "#Quotes"
        } else if (shipInfo.options[0] == "g") {
            url += "/Gallery"
        }
        chrome.tabs.update({url: url})
    })
}

function equipment(equipmentName) {
    getPreferredWiki(function(result) {
        var wiki = ""
        if (result.wiki == "2") {
            wiki = "en.kancollewiki.net"
        } else {
            wiki = "kancolle.fandom.com"
        }
        var url =  "https://duckduckgo.com/?q=!ducky+" + wiki + "+" + addPluses(toTitleCase(equipmentName))
        chrome.tabs.update({url: url})
    })
}

function enWikiList(shipType) {
    if (["de", "dd", "cl", "ca", "bb", "cvl", "cv", "av", "ss", "clt"].includes(shipType)) {
        return "http://en.kancollewiki.net/wiki/Elite" + shipType
    }
}

function wikiaList(shipType) {
    switch (shipType) {
        case "de":
            return "http://kancolle.fandom.com/wiki/List_of_coastal_defense_ships_by_upgraded_maximum_stats"
        case "dd":
            return "http://kancolle.fandom.com/wiki/List_of_destroyers_by_upgraded_maximum_stats"
        case "cl":
            return "http://kancolle.fandom.com/wiki/List_of_light_cruisers_by_upgraded_maximum_stats"
        case "ca":
            return "http://kancolle.fandom.com/wiki/List_of_heavy_cruisers_by_upgraded_maximum_stats"
        case "bb":
            return "http://kancolle.fandom.com/wiki/List_of_battleships_by_upgraded_maximum_stats"
        case "cvl":
            return "http://kancolle.fandom.com/wiki/List_of_light_aircraft_carriers_by_upgraded_maximum_stats"
        case "cv":
            return "http://kancolle.fandom.com/wiki/List_of_fleet_standard_aircraft_carriers_by_upgraded_maximum_stats"
        case "ss":
            return "http://kancolle.fandom.com/wiki/List_of_submarines_by_upgraded_maximum_stats"
        case "av":
            return "http://kancolle.fandom.com/wiki/List_of_seaplane_tenders_by_upgraded_maximum_stats"
        case "clt":
            return "http://kancolle.fandom.com/wiki/List_of_Torpedo_Cruisers_by_upgraded_maximum_stats"
    }
}

function list(shipType) {
    getPreferredWiki(function(result) {
        var url = ""
        if (result.wiki == "2") {
            url = enWikiList(shipType.toLowerCase())
        } else {
            url = wikiaList(shipType.toLowerCase())
        }
        chrome.tabs.update({url: url})
    })
}

var shipNames = []
var equipmentNames = []

chrome.omnibox.onInputEntered.addListener(input)
chrome.omnibox.onInputChanged.addListener(showSuggestions)

var xhrShips = new XMLHttpRequest()
xhrShips.onreadystatechange = handleShipsFetchCompleted
xhrShips.open("GET", "https://raw.githubusercontent.com/KC3Kai/kc3-translations/master/data/en/ships.json", true)
xhrShips.send()

function handleShipsFetchCompleted() {
    shipNames = Object.values(JSON.parse(xhrShips.responseText))
}

var xhrEquips = new XMLHttpRequest()
xhrEquips.onreadystatechange = handleEquipsFetchCompleted
xhrEquips.open("GET", "https://raw.githubusercontent.com/KC3Kai/kc3-translations/master/data/en/items.json", true)
xhrEquips.send()

function handleEquipsFetchCompleted() {
    equipmentNames = Object.values(JSON.parse(xhrEquips.responseText))
}