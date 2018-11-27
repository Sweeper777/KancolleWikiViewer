function saveOptions() {
    var wiki = document.getElementById('wikiSelector').value
    chrome.storage.sync.set({
      wiki: wiki,
    }, function() {
      var status = document.getElementById('status')
      status.textContent = 'Options saved.'
      setTimeout(function() {
        status.textContent = ''
      }, 750)
    })
  }
  
