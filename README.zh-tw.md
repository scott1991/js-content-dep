# JS Content Dependency Viewer

JS Content Dependency Viewer是一款 Node.js 的命令列工具。它可以輸出指定的 JavaScript 檔案內容，以及該檔案在同一專案中直接或間接依賴的所有 JavaScript 相關檔案（如 .js，.jsx，.ts 等）的內容。當您需要與他人討論您的程式碼時(例如 chatGPT)，此工具特別有幫助。它能讓您輕鬆分享主檔案的運作環境及其依賴，而無需將整個專案公開。

## 安裝

要使用 npm global安裝此工具，請執行以下命令：

```bash
npm install https://github.com/scott1991/js-content-dep.git -g
```

## 使用

安裝後，您可以用以的下命令使用此工具：

```bash
js-content-dep <file path>
```

將 `<file path>` 替換為您想要檢視的JavaScript檔案路徑。

這個命令將輸出內容到stdout。若要將輸出內容保存到檔案，請使用以下命令：

```bash
js-content-dep <file path> > <output file path>
```

將 `<output file path>` 替換為您希望保存輸出檔案的路徑。如果該文件已經存在，此命令將覆蓋該文件；如果不存在，將在指定位置創建新檔案。

然後，工具將輸出指定檔案的內容，以及在同一專案中被它 `import` 或 `require` 的所有檔案的內容。不包括來自 `node_modules` 或其他非相對或絕對路徑的檔案。

例如，如果您有一個 `App.js` 檔案，它導入了 `./Header.js` 和 `./Footer.js`，您可以使用以下命令查看這些檔案的內容：

```bash
js-content-dep src/App.js
```

輸出將如下所示：

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

請注意，這個工具是針對具有直接檔案到檔案依賴的相對簡單的專案結構。對於更複雜的專案或有更進階的模組配置的專案，它可能無法按預期工作。
