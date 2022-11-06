import "./style.css";
import { generatePixiApp } from "./pixie";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="display"> </div>
  <div id="controls">controls</div>
`;

generatePixiApp();
