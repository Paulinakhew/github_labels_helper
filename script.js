var length = document.getElementsByClassName("js-edit-label").length;
for (i = 0; i < length; i++) {
    var edit = document.getElementsByClassName("js-edit-label")[i];
    edit.click();
}

var elems = document.querySelectorAll("[id^='label-name']");
let label_names = []

for (i = 1; i <= length; i++) {
    label_names.push(elems[i].value);
}

console.log(label_names);
