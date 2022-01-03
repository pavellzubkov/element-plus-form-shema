<template>
  <CreateDocC :doc-shema-class="DocOneShema"></CreateDocC>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateDocC from "@/components/CreateDocC.vue";
import { DocTwoShemaClass } from "@/components/DocsShemas/docTwoShemaClass";

export default defineComponent({
  name: "DocTwoV",
  components: { CreateDocC },
  setup() {
    return {
      DocOneShema: DocTwoShemaClass,
    };
  },
});
</script>

<style scoped></style>
