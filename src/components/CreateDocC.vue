<template>
  <MyFormC
    :shema="shemaObj"
    v-model="docDoc.payload"
    editable="create"
    @checked="formIsOk"
  ></MyFormC>
</template>

<script lang="ts">
import { defineComponent, h, PropType, ref, Ref } from "vue";
import {
  BaseFormShema,
  IBaseDoc,
  MyFormShema,
  ShemaConstructor,
} from "@/components/MyForm/MyFormTypes";
import MyFormC from "@/components/MyForm/MyFormC.vue";
import { ElNotification } from "element-plus";

export default defineComponent({
  name: "CreateDocC",
  components: { MyFormC },
  props: {
    docShemaClass: {
      type: Function as PropType<unknown | ShemaConstructor>,
      default: undefined,
      required: true,
    },
  },
  setup(props) {
    const S = props.docShemaClass as ShemaConstructor;
    const shemaInst = new S() as BaseFormShema<IBaseDoc>;
    const shemaObj: Ref<MyFormShema<IBaseDoc>> = ref(undefined);
    const docDoc: Ref<IBaseDoc> = ref({ payload: {} });
    shemaObj.value = shemaInst.getFormShema("create");
    const formIsOk = (doc) => {
      ElNotification({
        title: "Success",
        message: "Doc is ok.Go save.",
        type: "success",
      });
    };
    return {
      shemaObj,
      docDoc,
      formIsOk,
    };
  },
});
</script>

<style scoped></style>
