import * as clipboard from "clipboard-polyfill/text";

function copyToCLip(color) {
  clipboard.writeText(color).then(
    function() {
      // console.log("success!");
    },
    function() {
      // console.log("error!");
    }
  );
}

// window.addEventListener("DOMContentLoaded", function() {
//   const button = document.createElement("button");
//   button.textContent = "Copy";
//   button.addEventListener("click", copyToCLip);
//   document.body.appendChild(button);
// });

export default copyToCLip;
