import readFile from './readFile.js';

function main() {
  // Get the file path from the command line arguments.
  const filePath = process.argv[2];
  // If no file path is provided, log an error and return.
  if (!filePath) {
    console.error('Usage: js-content-dep <file path>');
    return;
  }

  // Start reading the provided file.
  const output = readFile(filePath);

  // Print the output.
  console.log(output);
}

// Start the program.
main();
