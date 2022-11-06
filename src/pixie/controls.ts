export interface Controls {
  isKeyUpPressed: boolean;
  isKeyDownPressed: boolean;
  isKeyLeftPressed: boolean;
  isKeyRightPressed: boolean;
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
};
