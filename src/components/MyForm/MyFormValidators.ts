import {
  IFormNativeValidator,
  IFormSyncValidator,
  IFormValidatorF,
} from "./MyFormTypes";
import { Ref } from "vue";

class MyFormValidatorsClass<T> {
  public maxLength = (maxLength: number, errMes: string): IFormValidatorF => {
    return (formVal: Ref<any>): IFormNativeValidator => {
      const f: IFormNativeValidator = (
        rule: any,
        value: any,
        callback: (err?: any) => string | undefined
      ) => {
        console.log("validator call");
        if (value.length <= maxLength) {
          callback();
        } else {
          callback(new Error(errMes));
        }
      };
      return f;
    };
  };
  public lengthRange = (
    type: "min" | "max" | "range",
    errMes: string,
    minLength = 1,
    maxLength = 5
  ): IFormSyncValidator => {
    return (formVal: Ref<any>): IFormNativeValidator => {
      const f: IFormNativeValidator = (
        rule: any,
        value: any,
        callback: (err?: any) => string | undefined
      ) => {
        console.log("validator call val ", value);
        if (type === "min") {
          if (value.length >= minLength) {
            callback();
          } else {
            callback(new Error(errMes));
          }
        }
        if (type === "max") {
          if (value.length <= maxLength) {
            callback();
          } else {
            callback(new Error(errMes));
          }
        }
        if (type === "range") {
          if (value.length >= minLength && value.length <= maxLength) {
            callback();
          } else {
            callback(new Error(errMes));
          }
        }
      };
      return f;
    };
  };
}

export const MyFormValidators = new MyFormValidatorsClass();
