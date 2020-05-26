let getData = document.getElementById('getData');

chrome.storage.sync.get('color', function(data) {
  getData.style.backgroundColor = data.color;
  getData.setAttribute('value', data.color);
});

getData.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: "script.js"});
  });
};


let addLabels = document.getElementById('addLabels');

chrome.storage.sync.get('names', function(data) {
  console.log("data names");
  console.log(data.names);
});

addLabels.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = "#d399e7";'});
  });
}