<template>
  <div style="width: 100%; alignment: center">
    <div class="form-block">
      <MyFormC
        :shema="shemaObj"
        v-model="docDoc.payload"
        editable="create"
        @checked="formIsOk"
      ></MyFormC>
    </div>
    <div class="form-block">
      {{ docDoc.payload }}
    </div>
  </div>
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

<style scoped>
.form-block {
  width: 80%;
  height: 50vh;
  padding: 7px;
  overflow: auto;
  text-align: left;
  margin: auto;
  border: 2px ridge #b3b3b3;
  box-shadow: 0 0 4px rgba(35, 35, 35, 0.5); /* Параметры тени */
  border-radius: 5px;
}
</style>
