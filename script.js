var length = document.getElementsByClassName("js-edit-label").length;
for (i = 0; i < length; i++) {
    document.getElementsByClassName("js-edit-label")[i].click();
}

let label_names = []
let label_descriptions = []
let label_colours = []

for (i = 1; i <= length; i++) {
  label_names.push(document.querySelectorAll("[id^='label-name']")[i].value);
  label_descriptions.push(document.querySelectorAll("[id^='label-description']")[i].value);
  label_colours.push(document.querySelectorAll("[id^='label-color']")[i].value);
  document.getElementsByClassName("js-edit-label-cancel")[i].click();
}

console.log(label_names)
console.log(label_descriptions)
console.log(label_colours)

chrome.storage.sync.set(
  {
    'names': label_names,
    'descriptions': label_descriptions,
    'colours': label_colours
  }, function(){
    console.log('saved');
  }
)
