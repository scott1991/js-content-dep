import fs from 'fs';
import path from 'path';

// Function to read a file and its imported/required files recursively.
function readFile(filePath, processedFiles = []) {
  // If the file has been processed, skip it.
  if (processedFiles.includes(filePath)) {
    return '';
  }

  // If the file does not exist, log an error and skip it.
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return '';
  }

  // Add the file to the list of processed files.
  processedFiles.push(filePath);

  // Read the file content.
  const content = fs.readFileSync(filePath, 'utf-8');

  // Regular expression to match import/require statements.
  const regex = /(?:import|require)\(['"]([^'"]+)['"]\)|(?:import [^'"]+ from )['"]([^'"]+)['"]/g;
  let match;
  let importedContent = '';
  while ((match = regex.exec(content)) !== null) {
    // Extract the path of the imported/required file.
    const importPath = match[1] || match[2];
    // If the import path does not start with './', '../', or an absolute path, skip it.
    if (!importPath.startsWith('./') && !importPath.startsWith('../') && !path.isAbsolute(importPath)) {
      continue;
    }
    // Resolve the absolute path of the imported/required file.
    let absolutePath = path.resolve(path.dirname(filePath), importPath);
    // Extensions to try if the file does not exist.
    const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];
    // If the file does not exist, try with each extension.
    if (!fs.existsSync(absolutePath)) {
      for (let ext of extensions) {
        if (fs.existsSync(absolutePath + ext)) {
          absolutePath = absolutePath + ext;
          break;
        }
      }
    }
    // Read the imported/required file.
    importedContent += readFile(absolutePath, processedFiles);
  }

  // Return the file content.
  return `// ${filePath}\n\n${content}\n` + importedContent;
}
export default readFile;

