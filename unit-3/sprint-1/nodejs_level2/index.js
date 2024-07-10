const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case "read":
    readFile(file);
    break;
  case "delete":
    deleteFile(file);
    break;
  case "create":
    createFile(file);
    break;
  case "append":
    appendToFile(file, content);
    break;
  case "rename":
    renameFile(file, content);
    break;
  case "list":
    listDirectory(file);
    break;
  default:
    console.log(`Invalid operation '${operation}'`);
}

function readFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file '${filePath}':`, err.message);
    } else {
      console.log(data);
    }
  });
}

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file '${filePath}':`, err.message);
    } else {
      console.log(`File '${filePath}' deleted`);
    }
  });
}

function createFile(filePath) {
  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.error(`Error creating file '${filePath}':`, err.message);
    } else {
      console.log(`File '${filePath}' created`);
    }
  });
}

function appendToFile(filePath, content) {
  fs.appendFile(filePath, `\n${content}`, (err) => {
    if (err) {
      console.error(`Error appending to file '${filePath}':`, err.message);
    } else {
      console.log(`Content appended to the file '${filePath}'`);
    }
  });
}

function renameFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error(
        `Error renaming file '${oldPath}' to '${newPath}':`,
        err.message
      );
    } else {
      console.log(`File '${oldPath}' renamed to '${newPath}'`);
    }
  });
}

function listDirectory(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error listing directory '${dirPath}':`, err.message);
    } else {
      files.forEach((file) => console.log(file));
    }
  });
}
