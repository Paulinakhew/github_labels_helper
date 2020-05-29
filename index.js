let fillButtonExists = false;

function getInfo() {
  var length = document.getElementsByClassName("js-edit-label").length;
  console.log(length + " tags found");
  if (length > 0) {
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
  
    chrome.storage.sync.set(
      {
        'names': label_names,
        'descriptions': label_descriptions,
        'colours': label_colours,
        'tagCount': length
      }, function() {
        console.log(label_names);
        console.log(label_descriptions);
        console.log(label_colours);
        console.log(length);
      }
    )
    if (!fillButtonExists) {
      createFillButton();
    }
  }
}

function setInfo() {
  var length = document.getElementsByClassName("ml-3").length;
  console.log(length);
  if (length > 0) {
    for (i = length; i > 0; i--) {
      if (i % 2 == 1) {
        document.getElementsByClassName("ml-3")[i].click();
      }
    }
  } else {
    console.log("Nothing in storage");
  }

  chrome.storage.sync.get(['tagCount', 'names', 'descriptions', 'colours'], function(result) {
    if (result) {
      var tag_length = result.tagCount;
      var names = result.names;
      var descriptions = result.descriptions;
      var colours = result.colours;
      for (i = 0; i < tag_length; i++) {
        document.getElementsByClassName("js-details-target-new-label")[0].click();
        document.getElementById("label-name-").value = names[i];
        document.getElementById("label-description-").value = descriptions[i];
        document.getElementById("label-color-").value = colours[i];
        document.getElementsByClassName("js-new-label-color rounded-1")[0].click();
        // need to click enter on label color field here
        // event = new KeyboardEvent("enter", {
        //   key:'Enter',
        //   code:'Enter'
        // });
        // document.getElementById("label-color-").dispatchEvent(event);
        setTimeout(function(){ document.getElementsByClassName("btn btn-primary")[2].click(); }, 1000);
      }
    } else {
      console.log("Nothing in storage");
    }
  });
}

var body = document.getElementsByClassName("subnav")[0];

let saveButton = document.createElement("button");
saveButton.innerHTML = "Save";
saveButton.className = "btn";
body.appendChild(saveButton);
saveButton.addEventListener("click", getInfo);

function createFillButton() {
  fillButtonExists = true;
  chrome.storage.sync.get(['tagCount'], function(result) {
    if (result && result.tagCount && result.tagCount > 0) {
      let fillButton = document.createElement("button");
      fillButton.innerHTML = "Fill";
      fillButton.className = "btn";
      body.appendChild(fillButton);
      fillButton.addEventListener("click", setInfo);
    }
  });
}
