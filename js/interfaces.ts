export interface PyramidBlockElement extends HTMLSpanElement {
  className: "pyramid-block";
  style: CSSStyleDeclaration & { width: `${number}px` | `${number}%` };
}

export interface PyramidLayerElement extends HTMLDivElement {
  className: "pyramid-layer";
  children: HTMLCollectionOf<PyramidBlockElement>;
}

export interface PyramidFormElements {
  height: HTMLInputElement & {
    id: "height";
    name: "height";
    required: true;
    type: "text";
  };
  colour: HTMLInputElement & { id: "colour"; name: "colour"; type: "text" };
  pyramidDirection: HTMLInputElement & {
    name: "pyramid-direction";
    type: "radio";
  };
  size: HTMLInputElement & {
    id: "size";
    name: "size";
    placeholder: "Enter size";
    type: "text";
  };
  sizeUnit: HTMLInputElement & { name: "size-unit"; type: "radio" };
  generateButton: HTMLButtonElement & {
    onclick: "generatePyramid(getPyramidParameters())";
  };
}
