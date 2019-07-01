<template>
  <div class="ContextMenu">
    <div class="ContextMenu-container">
      <div class="ContextMenu-content" @mouseup="$event.stopPropagation()">
        <div class="ContextMenu-tip"/>
        <div class="ContextMenu-menuBody">
          <slot name="menuBody"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu"
};
</script>

<style scoped>
.ContextMenu {
  display: inline;
  position: relative;
  user-select: none;
}

.ContextMenu-container {
  height: 0;
  left: 0;
  position: absolute;
  top: 28px;
  z-index: 5;
  user-select: none;
}

.ContextMenu-content {
  left: -50%;
  position: relative;
  user-select: none;
  white-space: nowrap;
}

.ContextMenu-tip {
  border-bottom: 8px solid black;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 0;
  margin: auto;
  width: 0;
}

.ContextMenu-menuBody {
  background-color: black;
  border-radius: 3px;
  color: white;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  text-align: center;
}
</style>
