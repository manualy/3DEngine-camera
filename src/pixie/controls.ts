export interface Controls {
  isKeyUpPressed: boolean;
  isKeyDownPressed: boolean;
  isKeyLeftPressed: boolean;
  isKeyRightPressed: boolean;
  isKeyZoomInPressed: boolean;
  isKeyZoomOutPressed: boolean;
  isKeyTurnLeftPressed: boolean;
  isKeyTurnRightPressed: boolean;
  isKeyGoForwardPressed: boolean;
  isKeyGoBackwardPressed: boolean;
}

export const handleKeyUp = (event: KeyboardEvent, controls: Controls) => {
  if (event.key === "w") {
    controls.isKeyUpPressed = false;
    return;
  }
  if (event.key === "a") {
    controls.isKeyLeftPressed = false;
    return;
  }
  if (event.key === "s") {
    controls.isKeyDownPressed = false;
    return;
  }
  if (event.key === "d") {
    controls.isKeyRightPressed = false;
    return;
  }
  if (event.key === "i") {
    controls.isKeyZoomInPressed = false;
    return;
  }
  if (event.key === "o") {
    controls.isKeyZoomOutPressed = false;
    return;
  }
  if (event.key === "q") {
    controls.isKeyTurnLeftPressed = false;
    return;
  }
  if (event.key === "e") {
    controls.isKeyTurnRightPressed = false;
    return;
  }
  if (event.key === "f") {
    controls.isKeyGoForwardPressed = false;
    return;
  }
  if (event.key === "b") {
    controls.isKeyGoBackwardPressed = false;
    return;
  }
};

export const handleKeyDown = (event: KeyboardEvent, controls: Controls) => {
  if (event.key === "w") {
    controls.isKeyUpPressed = true;
    return;
  }
  if (event.key === "a") {
    controls.isKeyLeftPressed = true;
    return;
  }
  if (event.key === "s") {
    controls.isKeyDownPressed = true;
    return;
  }
  if (event.key === "d") {
    controls.isKeyRightPressed = true;
    return;
  }
  if (event.key === "i") {
    controls.isKeyZoomInPressed = true;
    return;
  }
  if (event.key === "o") {
    controls.isKeyZoomOutPressed = true;
    return;
  }
  if (event.key === "q") {
    controls.isKeyTurnLeftPressed = true;
    return;
  }
  if (event.key === "e") {
    controls.isKeyTurnRightPressed = true;
    return;
  }
  if (event.key === "f") {
    controls.isKeyGoForwardPressed = true;
    return;
  }
  if (event.key === "b") {
    controls.isKeyGoBackwardPressed = true;
    return;
  }
};
