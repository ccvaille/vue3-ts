<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="buttonClick">close</button>
    </div>
  </teleport>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Modal",
  props: {
    isOpen: Boolean,
  },
  emits: {
    // 需要校验
    "close-modal": (payload) => {
      return payload.type === "close";
    },
    // 不需要校验
    test: null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal", {
        type: "close",
      });
      context.emit("test");
    };
    return {
      buttonClick,
    };
  },
});
</script>

<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>