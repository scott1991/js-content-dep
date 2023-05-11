# JS Content Dependency Viewer

[中文說明](README.zh-tw.md)

JS Content Dependency Viewer is a command-line utility for Node.js. It outputs the content of a specified JavaScript file along with the contents of all the JavaScript-related files (like .js, .jsx, .ts, etc.) it directly or indirectly depends on within the same project.

This tool can be particularly helpful when you need to discuss your code with others (like chatGPT), as it allows you to easily share the context of your main file, as well as its dependencies, without requiring you to expose the entire project.

## Installation

To install the tool globally using npm, run the following command:

```bash
npm install https://github.com/scott1991/js-content-dep.git -g
```

## Usage

After installation, you can use the tool with the following command:

```bash
js-content-dep <file path>
```

Replace `<file path>` with the path to the JavaScript file you want to view.

This command prints the output to stdout. To save the output to a file, use the following:

```bash
js-content-dep <file path> > <output file path>
```

Replace `<output file path>` with the path where you want to save. This command will overwrite the file if it already exists or create a new one at the specified location.

The tool will then print the contents of the specified file, followed by the contents of all files that are `import`ed or `require`d by it within the same project. Files from `node_modules` or other non-relative or absolute paths are not included.

For example, if you have a file `App.js` which imports `./Header.js` and `./Footer.js`, you can view the content of these files with the following command:

```bash
js-content-dep src/App.js
```

The output will look like this:

```jsx
// src/App.js

import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;



// src/Header.js

import React from 'react';

function Header() {
  // ... header component
}

export default Header;



// src/Footer.js

import React from 'react';

function Footer() {
  // ... footer component
}

export default Footer;
```
Please note, this tool is suited for simpler projects with direct file dependencies. It may not function as expected with complex or advanced module configurations.
