
// var loadGame = (name: string): void => {
//   switch (name) {
//     case 'cloak':
//       cloak();
//       break;
//     default:
//       console.log(name);
//       break;
//   }
// }

// var renderGame = () => {
//   const select = document.getElementById('quest-select');
//   if (!select) return;

//   const setGame = function (val: string) {
//     const div = document.getElementById('quest');
//     if (!div) return;

//     let folder = val;
//     let loaded = false
//     if (window.location.search)
//       folder += '-' + window.location.search.substring(1)


//     const myScript = document.createElement("script")
//     myScript.setAttribute("src", folder + '/settings.js')
//     myScript.onload = function () {
//       settings.writeScript(folder)
//     }
//     myScript.onerror = function () {
//       console.log("Failed to load file \"" + folder + "/settings.js\".")
//       console.log("Check the file and folder actually exist.")
//       console.log("This is probably because the folder \"" + folder + "\" does not exist, perhaps because it is wrongly specified in the address.")
//     }
//     document.head.appendChild(myScript);

//     div.innerHTML = `<h1 id="loading">Story loading, please wait...</h1>
  
//   <div id="main">
//   <div id="inner">
//   <div id="output"></div>
//   <div id="input"></div>
//   </div>
//   </div>
  
//   <dialog id="dialog">
//     <form method="dialog">
//       <h4 id="dialog-title"></h4>
//       <hr/>
//       <div id="dialog-content"></div>
//       <div id="dialog-footer" style="text-align:right">
//       <hr/>
//       <button id="dialog-button" value="default">Confirm</button>
//       </div>
//     </form>
//   </dialog>
//   <div id="quest-map"></div>
//   <div id="quest-image"></div>
//   <form style="display:none" id="fileDialogForm">
//   	<input type="file" id="fileDialog" accept=".q6save"/>
//   </form>`;
//   };
//   select.onchange = function () {
//     const self = this as any;
//     setGame(self.value);
//   }
//   setGame('game-cloak');
// }