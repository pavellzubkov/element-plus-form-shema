import { ElInput } from "element-plus";
import { defineAsyncComponent } from "vue";
import MyCustomFieldOne from "@/components/MyForm/CustomFields/MyCustomFieldOne.vue";

export const MyFormComps = {
  input: ElInput,
  customOne: MyCustomFieldOne,
  customTwo: defineAsyncComponent(
    () => import("@/components/MyForm/CustomFields/MyCustomFieldTwo.vue")
  ),
};
