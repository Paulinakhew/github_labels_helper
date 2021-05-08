var body = document.getElementsByClassName("subnav")[0];

function getInfo() {
  var length = document.getElementsByClassName("Link--secondary btn-link ml-3 js-edit-label js-hide-on-label-edit").length;
  if (length > 0) {
    for (i = 0; i < length; i++) {
      document.getElementsByClassName("Link--secondary btn-link ml-3 js-edit-label js-hide-on-label-edit")[i].click();
    }
    let label_names = []
    let label_descriptions = []
    let label_colours = []
  
    for (i = 0; i <= length; i++) {
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
      }, function() {}
    )
  } else {
    console.log("No tags exist");
  }
}

function setInfo() {
  chrome.storage.sync.get(['tagCount', 'names', 'descriptions', 'colours'], function(result) {
    if (result) {
      console.log("Creating tags");
      var tag_length = result.tagCount;
      var names = result.names;
      var descriptions = result.descriptions;
      // var colours = result.colours;
      for (i = 0; i < tag_length; i++) {
        document.getElementsByClassName("btn btn-primary js-details-target js-details-target-new-label")[0].click();
        document.getElementById("label-name-").value = names[i];
        document.getElementById("label-description-").value = descriptions[i];
        // document.getElementById("label-color-").value = colours[i];
        document.getElementsByClassName("js-new-label-color rounded-1")[0].click();
        // document.getElementsByClassName("btn btn-primary")[2].click();
        if (document.getElementsByClassName("btn btn-primary")[2].disabled) {
        setTimeout(function(){ document.getElementsByClassName("btn btn-primary")[2].click(); }, 100);
        }
        document.getElementsByClassName("btn btn-primary")[2].click();
      }
    } else {
      console.log("Nothing in storage");
    }
  });
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function deleteLabels() {
  var length = document.getElementsByClassName("ml-3").length;
  if (length > 0) {
    console.log("Deleting tags");
    for (i = length; i > 0; i--) {
      if (i % 2 == 1) {
        document.getElementsByClassName("ml-3")[i].click();
      }
    }
  } else {
    console.log("No tags to delete");
  }
}

let saveButton = document.createElement("button");
saveButton.innerHTML = "Save";
saveButton.className = "btn";
body.appendChild(saveButton);
saveButton.addEventListener("click", getInfo);

let deleteButton = document.createElement("button");
deleteButton.innerHTML = "Delete Labels";
deleteButton.className = "btn";
body.appendChild(deleteButton);
deleteButton.addEventListener("click", deleteLabels);

createFillButton();

function createFillButton() {
  chrome.storage.sync.get(['tagCount'], function(result) {
    if (result && result.tagCount && result.tagCount > 0) {
      let fillButton = document.createElement("button");
      fillButton.innerHTML = "Fill";
      fillButton.className = "btn";
      body.appendChild(fillButton);
      fillButton.addEventListener("click", setInfo);
    } else {
      console.log("Nothing to fill");
    }
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value "%s".',
      key,
      namespace,
      storageChange.oldValue,
      storageChange.newValue
    )
  }
});
