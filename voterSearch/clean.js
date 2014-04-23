function clean(text, index) {
  return text.split(",")[0].split("").reduce(function(acc, next) {
    var last = acc.slice(-1);
    return acc + next[last.toLowerCase() == last.toUpperCase() ? "toUpperCase" : "toLowerCase"]();
  }, "");
}

require("fs").readFileSync(process.argv[2], "utf8").trim().split("\n").forEach(function(line) {
  console.log(line.split("|").map(clean) + "");
});
