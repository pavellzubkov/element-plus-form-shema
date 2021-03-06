import { IDocOne } from "@/components/DocsShemas/docsTypes";
import {
  BaseFormShema,
  HiddenCheckFunc,
  MyFormShema,
  ReadingShemaParam,
  ShemaDocInfo,
  ShemaFunc,
} from "@/components/MyForm/MyFormTypes";
import { MyFormValidators } from "@/components/MyForm/MyFormValidators";

export class DocOneShemaClass extends BaseFormShema<IDocOne> {
  docInfo: ShemaDocInfo<IDocOne> = {
    db_name: "myBase",
    doc_type: "doc_one",
    name: "DocOne",
    discription:
      "Example with sync validator. My Url fild visibility depends on My text value length",
  };
  private NumberRegexp = /^[0-9]+[,|.]?\d*$/;
  getFormShema: ShemaFunc<IDocOne> = (
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
              required: true,
              message: "Required",
            },
            {
              min: 5,
              message: "Min 5 symbols",
            },
            { whitespace: true },
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
              required: true,
              message: "Required",
            },
            {
              validator: MyFormValidators.lengthRange(
                "range",
                "Array length 2 to 6",
                2,
                6
              ),
            },
          ],
        },
      },
    };
  };
}
