import { IDocTwo } from "@/components/DocsShemas/docsTypes";
import {
  BaseFormShema,
  HiddenCheckFunc,
  IFormAsyncValidator,
  IFormNativeAsyncValidator,
  MyFormShema,
  ReadingShemaParam,
  ShemaDocInfo,
  ShemaFunc,
} from "@/components/MyForm/MyFormTypes";
import { MyFormValidators } from "@/components/MyForm/MyFormValidators";
import { promiseTimeout } from "@vueuse/core";

export class DocTwoShemaClass extends BaseFormShema<IDocTwo> {
  docInfo: ShemaDocInfo<IDocTwo> = {
    db_name: "myBase",
    doc_type: "doc_one",
    name: "DocOne",
    discription:
      "Example with sync validator. My Url fild visibility depends on My text value length",
  };
  private NumberRegexp = /^[0-9]+[,|.]?\d*$/;

  private checkAsyncValue = (
    delayMs: number,
    errMsg: string
  ): IFormAsyncValidator<IDocTwo["payload"]> => {
    return (formVal): IFormNativeAsyncValidator => {
      const f: IFormNativeAsyncValidator = async (rule: any, value: any) => {
        await promiseTimeout(delayMs);
        if (value === "567") return;
        throw new Error(errMsg);
      };
      return f;
    };
  };

  getFormShema: ShemaFunc<IDocTwo> = (
    reading: ReadingShemaParam | HiddenCheckFunc,
    defaults = { payload: {} }
  ): MyFormShema<IDocTwo> => {
    return {
      type: "object",
      properties: {
        textNew: {
          type: "string",
          default: defaults.payload.textNew || "",
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
            hidden: (form) => form.textNew.length < 4,
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
            { required: true },
            {
              pattern: this.NumberRegexp,
              message: "Only numbers symbols",
            },
            {
              asyncValidator: this.checkAsyncValue(
                2000,
                "Async check. Must be 567"
              ),
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
        custom1: {
          type: "array",
          default: defaults.payload.custom1 || [],
          ui: {
            widget: "customTwo",
            label: "My Second Tags",
            hidden: (form) => form.custom.length < 2,
          },
          rules: [
            {
              required: true,
              message: "Required",
            },
            {
              validator: MyFormValidators.lengthRange("min", "Array min 3", 3),
            },
          ],
        },
      },
    };
  };
}
