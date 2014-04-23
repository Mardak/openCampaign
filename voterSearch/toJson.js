var voters = require("fs").readFileSync(process.argv[2], "utf8").trim().split("\n").map(function(line) {
  var parts = line.split(",");
  return [parts[0].toLowerCase(), parts[1].toLowerCase(), parts[2], parts[3]];
});
console.log("const voters = " + JSON.stringify(voters) + ";");
console.log("const numVoters = " + voters.length + ";");

function match(query, target) {
  if (query == null) {
    return true;
  }
  if (query.length > target.length) {
    return false;
  }
  if (query.length == target.length && query.slice(-1) != target.slice(-1)) {
    return false;
  }
  return target.indexOf(query.slice(0, 2)) == 0;
}
console.log(match.toString());

function init() {
  var nameInput = document.getElementById("nameInput");
  var outputTable = document.getElementById("outputTable");

  var filterVoters = function() {
    var names = nameInput.value.trimLeft().toLowerCase().split(/\s+/);
    if (nameInput.first == names[0] && nameInput.last == names[1]) {
      return;
    }
    nameInput.first = names[0];
    nameInput.last = names[1];

    var matched = [];
    for (var i = 0; i < numVoters; i++) {
      var entry = voters[i];
      if (match(names[0], entry[0]) && match(names[1], entry[1]) ||
          match(names[1], entry[0]) && match(names[0], entry[1])) {
        matched.push(entry);
        if (matched.length == 100) {
          break;
        }
      }
    }

    outputTable.innerHTML = "<tr><th>First</th><th>Last</th><th>Area</th><th>Age</th></tr>";
    matched.forEach(function(entry) {
      var tr = outputTable.appendChild(document.createElement("tr"));
      var subject = "";
      for (var i = 0; i < 4; i++) {
        var upperFirst = entry[i][0].toUpperCase() + entry[i].slice(1);
        tr.appendChild(document.createElement("td")).textContent = upperFirst;
        subject += upperFirst + " ";
      }
      subject += "is ..";
      tr.addEventListener("click", function() {
        open("mailto:help@edlee2014.com?subject=" + encodeURIComponent(subject) +
             "&body=The best method of contact for .. is ..");
      });
    });
    if (matched.length == 0) {
      outputTable.innerHTML += "<tr><td colspan=\"4\">No matched voters</td></tr>";
    }
  }

  nameInput.addEventListener("input", filterVoters);
  filterVoters();
}
console.log("(" + init.toString() + ")();");
