<template>
  <CreateDocC :doc-shema-class="DocOneShema"></CreateDocC>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DocOneShemaClass } from "@/components/DocsShemas/docOneShemaClass";
import CreateDocC from "@/components/CreateDocC.vue";

export default defineComponent({
  name: "DocOneV",
  components: { CreateDocC },
  setup() {
    return {
      DocOneShema: DocOneShemaClass,
    };
  },
});
</script>

<style scoped></style>
