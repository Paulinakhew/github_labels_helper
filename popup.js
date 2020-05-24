let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function() {
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

addLabels.onclick = function(element) {
  console.log(element);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id),
      {code: 'document.body.style.backgroundColor = '}
  });
}