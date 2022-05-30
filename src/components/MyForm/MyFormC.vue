<template>
  <div style="width: 100%">
    <el-form
      ref="form"
      :inline="false"
      :rules="rules"
      :model="formVal"
      :label-position="'top'"
      style="width: 100%"
      label-width="120px"
      size="small"
    >
      <template v-for="value in comps" :key="value.name">
        <transition
          appear
          enter-active-class="animate__animated animate__bounceInLeft"
          leave-active-class="animate__animated animate__bounceOutRight"
          mode="out-in"
        >
          <el-form-item
            :label="value.label"
            :prop="value.name"
            v-if="!value.hidden(formVal)"
          >
            <template #label> {{ value.label }} </template>
            <div style="width: 100%">
              <component
                :is="value.component"
                v-bind="value.componentConfig"
                v-model="formVal[value.name]"
              ></component>
            </div>

            <template #error="err">
              <span style="color: red">{{ err.error }}</span>
            </template>
          </el-form-item>
        </transition>
      </template>
    </el-form>
    <el-row
      v-if="editable === 'create' || editable === 'update'"
      type="flex"
      justify="end"
      class="grid-content"
      :gutter="5"
    >
      <el-popover v-model:visible="confvisible" :width="200" trigger="manual">
        <template #reference>
          <div>
            <el-tooltip
              effect="light"
              :open-delay="700"
              :disabled="confvisible"
              content="Confirm"
            >
              <el-button type="success" round @click="checkForm"
                >Confirm</el-button
              >
            </el-tooltip>
          </div>
        </template>

        <div ref="confContent">
          <el-row justify="center">
            <label>Save</label>
          </el-row>
          <el-row>
            <span>Are you shure?</span>
          </el-row>
          <el-row justify="space-between">
            <el-button size="small" @click="confvisible = false">No</el-button>
            <el-button size="small" type="warning" @click="formIsOk"
              >Yes</el-button
            >
          </el-row>
        </div>
      </el-popover>
    </el-row>
  </div>
</template>

<script lang="ts">
import { onClickOutside, Reactify } from "@vueuse/core";
import {
  defineComponent,
  PropType,
  reactive,
  Ref,
  ref,
  shallowRef,
  watch,
} from "vue";
import {
  IBaseDoc,
  IFieldsArrItem,
  IFormRules,
  MyFormShema,
} from "./MyFormTypes";
import { MyFormClass } from "./MyFormClass";
import type { ElForm } from "element-plus";

export default defineComponent({
  name: "MyFormC",
  emits: ["checked"],
  props: {
    modelValue: {
      type: Object as PropType<{ [key: string]: never }>,
    },
    shema: {
      type: Object as PropType<MyFormShema<IBaseDoc>>,
      required: true,
    },
    editable: {
      type: String as PropType<"read" | "create" | "update">,
      default: "read",
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = ref<InstanceType<typeof ElForm>>();
    const confContent = ref(null);
    const formVal = ref(props.modelValue);
    const rules: Ref<IFormRules | undefined> = ref(undefined);
    const confvisible = ref(false);
    let comps: Ref<IFieldsArrItem[]> = shallowRef([]);
    const FormCl = new MyFormClass();

    comps.value = FormCl.calc(props.shema, formVal);
    rules.value = FormCl.getRules(props.shema, formVal);

    console.log("MyForm rules", rules);

    onClickOutside(confContent, () => {
      confvisible.value = false;
    });

    // watch(
    //   () => formVal.value,
    //   async () => {
    //     console.log("MyForm value changed");
    //     try {
    //       await form.value.validate();
    //     } catch (e) {
    //       console.log("checkForm check fail", e);
    //     }
    //   },
    //   {
    //     deep: true,
    //   }
    // );
    const checkForm = async () => {
      try {
        const res = await form.value.validate();
        console.log("checkForm ", res);
        confvisible.value = true;
      } catch (e) {
        console.log("checkForm check fail", e);
      }
    };
    const formIsOk = () => {
      confvisible.value = false;
      emit("checked");
    };
    return {
      form,
      rules,
      formVal,
      confvisible,
      confContent,
      checkForm,
      formIsOk,
      comps,
    };
  },
});
</script>

<style scoped></style>
