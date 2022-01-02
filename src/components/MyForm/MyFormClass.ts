import { Ref } from "vue";
import { MyFormComps } from "@/components/MyForm/MyFormComps";
import {
  IBaseDoc,
  IFieldsArrItem,
  IFormNativeRule,
  IFormRules,
  MyFormShema,
} from "@/components/MyForm/MyFormTypes";

export class MyFormClass {
  public calc = (
    shema: MyFormShema<IBaseDoc>,
    formVal: Ref<{ [key: string]: any }>
  ): IFieldsArrItem[] => {
    const fields: IFieldsArrItem[] = [];
    const defVis = () => false;
    Object.keys(shema.properties).forEach((fieldName) => {
      const elt: IFieldsArrItem = {
        name: fieldName,
        component: shema.properties[fieldName].ui.widget,
        label: shema.properties[fieldName].ui.label || "",
        hidden: shema.properties[fieldName].ui.hidden || defVis,
        componentConfig: shema.properties[fieldName].ui.widgetConfig,
      };
      formVal.value[fieldName] = formVal.value[fieldName]
        ? formVal.value[fieldName]
        : shema.properties[fieldName].default;
      fields.push(elt);
    });
    return fields;
  };
  public getRules = (
    shema: MyFormShema<IBaseDoc>,
    formVal: Ref<{ [key: string]: never }>
  ): IFormRules => {
    const outRules: IFormRules = {};
    Object.keys(shema.properties).forEach((fieldName) => {
      if (shema.properties[fieldName].rules) {
        const rules: IFormNativeRule[] = [];
        rules.push({
          type: shema.properties[fieldName].type,
          message:
            shema.properties[fieldName].wrongTypeMessage ||
            `Field must be ${shema.properties[fieldName].type}`,
        });
        shema.properties[fieldName].rules.forEach((rule) => {
          const r: IFormNativeRule = {};
          Object.assign(r, rule);
          if (rule.validator) {
            r.validator = rule.validator(formVal);
          }
          if (rule.asyncValidator) {
            r.asyncValidator = rule.asyncValidator(formVal);
          }
          if (rule.type === "string") {
            r.transform = (value: string) => value.trim();
          }
          rules.push(r);
        });
        outRules[fieldName] = rules;
      }
    });
    return outRules;
  };
}
