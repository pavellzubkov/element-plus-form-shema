import { ElInput } from "element-plus";
import { defineAsyncComponent } from "vue";
import MyCustomFieldOne from "./CustomFields/MyCustomFieldOne.vue";

export const MyFormComps = {
  input: ElInput,
  customOne: MyCustomFieldOne,
  customTwo: defineAsyncComponent(
    () => import("./CustomFields/MyCustomFieldTwo.vue")
  ),
};
