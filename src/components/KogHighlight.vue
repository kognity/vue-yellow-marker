<template>
  <span
    class="KogHighlight"
    :style="{'background-color': hlColor}"
    @mouseup="select($event)"
    @touchend="select($event)"
  />
</template>
<script>
export default {
  name: "KogHighlight",
  props: {
    selectHandler: {
      type: Function,
      required: true
    },
    context: {
      type: Object,
      required: false,
      default: null,
    },
    color: {
      type: String,
      required: false,
      default: 'greenyellow', 
    }
  },
  computed: {
    hlColor() {
      return this.color;
    }
  },
  methods: {
    select(event) {
      event.stopPropagation();
      this.selectHandler(event, this.context);
    }
  }
};
</script>
<style scoped>
.KogHighlight {
  position: relative;
  cursor: pointer;
}
</style>
