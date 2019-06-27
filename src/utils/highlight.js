import highlightRange from "./highlight-range";
import { fromRange } from "dom-anchor-text-quote";

function getSelectedRange() {
  const selection = window.getSelection();
  if (selection.focusNode === null) {
    // console.log('focus node null');
    return null;
  }
  const range = selection.getRangeAt(0);
  console.log('range', range, selection);
  if (!range ) {
    // console.log('range null', range);
    return null;
  }
  // console.log('range', range);
  return range;
}

export default function highlight(
  element,
  customObject,
  selectHandler,
  props,
  range = getSelectedRange()
) {
  try {
    const { cleanupMethod, nodes } = highlightRange(
      range,
      customObject,
      selectHandler,
      props,
    );
    return {
      cleanupMethod,
      nodes,
      textQuote: fromRange(element, range)
    };
  } catch (TypeError) {
    // this can happen if the last element is outside of the selected area, ignore and move on
  }
  return null;
}
