<template>
  <div class="tags-container" style="line-height: 28px">
    <el-tag
      v-for="tag in locList"
      :key="tag"
      style="cursor: pointer"
      :closable="!readOnly"
      :disable-transitions="false"
      type="warning"
      @close="handleDelete(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-button
      v-if="!readOnly && (onlyOne ? modelValue.length === 0 : true)"
      style="vertical-align: middle"
      type="info"
      round
      @click="openFindDial"
      >Add</el-button
    >
  </div>
  <el-dialog
    title="Select"
    center
    v-model="addDialIsVisible"
    width="95%"
    top="2%"
    append-to-body
  >
    <el-select
      v-model="selvalue"
      class="m-2"
      placeholder="Select"
      size="large"
      @change="selected"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "MyCustomFieldOne",
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
    },
    onlyOne: {
      type: Boolean,
      default: false,
      required: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const addDialIsVisible = ref(false);
    const locList = ref(props.modelValue);
    const selvalue = ref("");
    const options = ["Option1", "Option2", "Option3", "Option4"];

    const openFindDial = () => {
      addDialIsVisible.value = true;
    };

    const handleDelete = (tag: string) => {
      locList.value.splice(locList.value.indexOf(tag), 1);
      emit("update:modelValue", locList.value);
    };

    const selected = (val: string) => {
      console.log("Custom field selected -", val);
      locList.value.push(val);
      emit("update:modelValue", locList.value);
      addDialIsVisible.value = false;
    };
    return {
      addDialIsVisible,
      locList,
      selvalue,
      options,
      handleDelete,
      openFindDial,
      selected,
    };
  },
});
</script>

<style scoped>
.tags-container {
  alignment: left;
  text-align: left;
  display: inline-block;
}
</style>
