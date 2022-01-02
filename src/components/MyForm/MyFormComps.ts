import MyThemeSelectC from "@/components/Company/CommonDocs/Themes/Components/MyThemeSelectC.vue";
import DragListPhotoUploadC from "@/components/UICommon/MyForm/Components/SortableUpload/DragListPhotoUploadC.vue";
import { ElInput } from "element-plus";
import { Component, defineAsyncComponent } from "vue";

export const MyFormComps: { [key: string]: Component } = {
  input: ElInput,
  themeSelect: MyThemeSelectC,
  dragedPhotoUpload: DragListPhotoUploadC,
  modelsSelect: defineAsyncComponent(
    () =>
      import(
        "@/components/Equipment/Models/Components/SelectComp/EqModelsSelectC.vue"
      )
  ),
};
