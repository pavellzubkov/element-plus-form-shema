import { IDocOne } from "@/components/DocsShemas/docsTypes";
import {
  BaseFormShema,
  HiddenCheckFunc,
  MyFormShema,
  ReadingShemaParam,
  ShemaDocInfo,
  ShemaFunc,
} from "@/components/MyForm/MyFormTypes";

export class DocOneShemaClass extends BaseFormShema<IDocOne> {
  docInfo: ShemaDocInfo<IDocOne> = {
    db_name: "myBase",
    nanoLength: 6,
    doc_type: "model",
    name: "Модель",
  };
  private NumberRegexp = /^[0-9]+[,|.]?\d*$/;
  getNcShema: ShemaFunc<IDocOne> = (
    reading: ReadingShemaParam | HiddenCheckFunc,
    defaults = { payload: {} }
  ): MyFormShema<IDocOne> => {
    return {
      type: "object",
      properties: {
        text1: {
          type: "string",
          default: defaults.payload.text1 || "",
          ui: {
            hidden: () => false,
            label: "My text",
            widget: "input",
            readonly: false,
          },
          rules: [
            {
              min: 5,
              message: "Min 5 symbols",
            },
          ],
        },
        myUrl: {
          type: "url",
          default: defaults.payload.myUrl || "",
          wrongTypeMessage: "Must be url",
          ui: {
            widget: "input",
            label: "My Url",
            hidden: (form) => form.text1.length < 5,
          },
        },
        myRegexp: {
          type: "string",
          default: defaults.payload.myRegexp || "",
          ui: {
            label: "MyRegexp",
            widget: "input",
            hidden: () => false,
          },
          rules: [
            {
              pattern: this.NumberRegexp,
              message: "Only numbers letters",
            },
          ],
        },
        custom: {
          type: "array",
          default: defaults.payload.custom || [],
          ui: {
            widget: "customOne",
            label: "My Tags",
          },
          rules: [
            {
              min: 3,
              max: 6,
              message: "Min 3 Max6",
            },
          ],
        },
      },
    };
  };
}
