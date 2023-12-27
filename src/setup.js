const prompt = require("prompt-sync")();
var fs = require("fs");

function replaceName(newName) {
  const filepath = "./package.json";

  fs.readFile(filepath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }

    const package = JSON.parse(data);

    const oldName = package.name;

    const result = data.replace(oldName, newName);

    fs.writeFile(filepath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });
}

const projectName = prompt("# What's going to be your project name?");
console.log("You selected: ", projectName);
replaceName(projectName);
