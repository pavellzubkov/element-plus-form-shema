<template>
  <CreateDocC :doc-shema-class="DocOneShema"></CreateDocC>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DocOneShema } from "@/components/DocsShemas/docOneShema";
import CreateDocC from "@/components/CreateDocC.vue";

export default defineComponent({
  name: "DocOneV",
  components: { CreateDocC },
  setup() {
    return {
      DocOneShema,
    };
  },
});
</script>

<style scoped></style>
