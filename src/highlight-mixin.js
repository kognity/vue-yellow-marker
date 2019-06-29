import Vue from "vue";
import { toRange } from "dom-anchor-text-quote";
import highlight from "./utils/highlight";
import _ from "lodash";

function findPos(node) {
  const range = document.createRange();
  range.selectNode(node);
  return range.getBoundingClientRect();
}

// Finds the most right/bottom node in selection regardless of selection direction
function getLatestNode(selection) {
  const { focusNode, focusOffset, anchorNode, anchorOffset } = selection;
  const focusBottom = findPos(focusNode).bottom;
  const anchorBottom = findPos(anchorNode).bottom;
  let node = null;
  let offset = 0;
  if (focusBottom === anchorBottom) {
    if (anchorOffset < focusOffset) {
      node = focusNode;
      offset = focusOffset;
    } else {
      node = anchorNode;
      offset = anchorOffset;
    }
  } else if (focusBottom > anchorBottom) {
    node = focusNode;
    offset = focusOffset;
  } else {
    node = anchorNode;
    offset = anchorOffset;
  }
  return { node, offset };
}

const HighlightMixin = {
  data: function() {
    return {
      hlRange: null,
      hlHighlightMenu: null,
      hlSelectionMenu: null,
      hlMenuHookParent: null,
      hlConfig: {
        debounceDelay: 200,
        menuComponent: null
      }
    };
  },
  mounted: function() {
    document.addEventListener(
      "selectionchange",
      _.debounce(this.selectionChanged, this.hlConfig.debounceDelay)
    );
  },
  methods: {
    selectionAllowed() {
      return true;
    },
    selectionChanged(e) {
      e.preventDefault();
      e.stopPropagation();
      const selection = window.getSelection();
      const { focusNode, anchorNode } = selection;
      if (
        selection.isCollapsed ||
        !anchorNode ||
        !this.$el.contains(anchorNode) ||
        !focusNode ||
        !this.$el.contains(focusNode) ||
        !this.selectionAllowed(selection)
      ) {
        // Do not show menu if selection is collapsed or outside element
        this.removeSelectionMenu();
        console.log('Selection not allowed');
        return;
      }
      this.hlRange = selection.getRangeAt(0);
      this.createSelectionMenu(selection);
    },
    // Highlights text and specifies a click handler
    highlight(
      { prefix, suffix, exact },
      clickHandler,
      props,
      customObject = {}
    ) {
      if (this.$el === undefined) {
        throw Error(
          "highlight: this.$el is undefined. Make sure the component is mounted."
        );
      }
      const range = toRange(this.$el, {
        prefix,
        suffix,
        exact
      });
      return highlight(this.$el, customObject, clickHandler, props, range);
    },
    highlightSelection(clickHandler, props, customObject = {}) {
      if (this.$el === undefined) {
        throw Error(
          "highlight: this.$el is undefined. Make sure the component is mounted."
        );
      }
      return highlight(
        this.$el,
        customObject,
        clickHandler,
        props,
        this.hlRange
      );
    },
    removeMenu() {
      this.removeSelectionMenu();
      this.removeHighlightMenu();
    },
    removeSelectionMenu() {
      if (this.hlSelectionMenu) {
        this.hlSelectionMenu.$destroy();
        this.hlSelectionMenu.$el.remove();
        this.hlSelectionMenu = null;
        if (this.hlMenuHookParent) {
          this.hlMenuHookParent.normalize();
        }
      }
    },
    removeHighlightMenu() {
      if (this.hlHighlightMenu) {
        this.hlHighlightMenu.$destroy();
        this.hlHighlightMenu.$el.remove();
        this.hlHighlightMenu = null;
      }
    },
    removeSelection() {
      window.getSelection().removeAllRanges();
    },
    createMenu(menuComponent, actions, props = {}) {
      console.log('Creating menu component');
      const ComponentBuilder = Vue.extend(Object.assign(menuComponent));
      const menu = new ComponentBuilder({ propsData: props });
      menu.$mount();
      Object.keys(actions).forEach(eventName => {
        menu.$on(eventName, actions[eventName]);
      });
      return menu;
    },
    createHighlightMenu(nodes) {
      this.removeMenu();
      const menu = this.hlConfig.menus.highlight;
      const actions = menu.actions;
      this.hlHighlightMenu = this.createMenu(menu.component, actions);
      const lastNode = nodes.slice(-1).pop();
      lastNode.parentElement.appendChild(this.hlHighlightMenu.$el);
    },
    createSelectionMenu(selection) {
      this.removeMenu();
      const menu = this.hlConfig.menus.selection;
      console.log('Creating menu', menu);
      const actions = menu.actions;
      // Add a range by the end of the selection
      const { node, offset } = getLatestNode(selection);
      const range = new Range();
      range.setStart(node, offset);
      range.setEnd(node, offset);
      this.hlMenuHookParent = node.parentElement;
      this.hlSelectionMenu = this.createMenu(menu.component, actions);
      range.insertNode(this.hlSelectionMenu.$el);
      console.log('Inserted menu into DOM');
    }
  }
};

export default HighlightMixin;
