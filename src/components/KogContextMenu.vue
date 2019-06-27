<template>
  <div class="KogContextMenu">
    <div class="KogContextMenu-container">
      <div class="KogContextMenu-content" @mouseup="$event.stopPropagation()">
        <div class="KogContextMenu-tip"/>
        <div class="KogContextMenu-menuBody">
          <slot name="menuBody"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KogContextMenu"
};
</script>

<style scoped>
.KogContextMenu {
  display: inline;
  position: relative;
  user-select: none;
}

.KogContextMenu-container {
  height: 0;
  left: 0;
  position: absolute;
  top: 28px;
  z-index: 5;
  user-select: none;
}

.KogContextMenu-content {
  left: -50%;
  position: relative;
  user-select: none;
  white-space: nowrap;
}

.KogContextMenu-tip {
  border-bottom: 8px solid black;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  height: 0;
  margin: auto;
  width: 0;
}

.KogContextMenu-menuBody {
  background-color: black;
  border-radius: 3px;
  color: white;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  text-align: center;
}
</style>
