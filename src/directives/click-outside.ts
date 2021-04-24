/* eslint-disable */
import { DirectiveOptions } from "vue";

const directive: DirectiveOptions = {
  bind(el: any, binding: any, vNode: any) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      const compName = vNode.context.name;
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }
      // tslint:disable-next-line
      console.warn(warn);
    }
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble;
    const handler = (e: any) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;
    // add Event Listeners
    document.addEventListener("click", handler);
  },

  unbind(el: any, binding: any) {
    // Remove Event Listeners
    document.removeEventListener("click", el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  },
};

export default directive;
