function anonymize(text, index) {
  switch (index) {
    case 0: // first
    case 1: // last
      var length = text.length;
      return length <= 3 ? text : text.slice(0, 2) + Array(length - 2).join("-") + text.slice(-1)

    case 2: // place
      return text;

    case 3: // age
      return Math.floor(text / 10) * 10 + "s";
  }
}

require("fs").readFileSync(process.argv[2], "utf8").trim().split("\n").forEach(function(line) {
  console.log(line.split(",").map(anonymize) + "");
});
