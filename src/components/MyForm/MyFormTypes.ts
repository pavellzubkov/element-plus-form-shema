import { Component, Ref } from "vue";
import { MyFormComps } from "@/components/MyForm/MyFormComps";

export type ReadingShemaParam = "read" | "create" | "update";

export type IValidatorType =
  | "string"
  | "number"
  | "boolean"
  | "method"
  | "regexp"
  | "integer"
  | "float"
  | "array"
  | "object"
  | "enum"
  | "date"
  | "url"
  | "hex"
  | "email"
  | "any";
export type IFormSyncValidator = (formVal: Ref<any>) => IFormNativeValidator;
export type IFormAsyncValidator<T> = (
  formVal: Ref<T>
) => IFormNativeAsyncValidator;
export type IFormTransformFunc<T> = (v: T) => T;

export type ShemaFieldUiFunc = (
  label: string,
  reading: ReadingShemaParam | HiddenCheckFunc,
  columns: number,
  isHiddenFunc: HiddenCheckFunc,
  defaults: never,
  other?: never
) => FieldUi;

export type HiddenCheckFunc = (form?: Record<string, any>) => boolean;

export type CheckFunc = (doc?: IBaseDoc) => Promise<boolean>;

export type ShemaFunc<T> = (
  reading: ReadingShemaParam | HiddenCheckFunc,
  defaults?: T
) => MyFormShema<T>;

export interface ShemaDocInfo<T extends IBaseDoc> {
  name?: string;
  db_name: string;
  doc_type: T["doc_type"]; // balance base layout
  nanoLength: number;
  attWithPreview?: boolean;
  idOnly?: boolean;
  idOnlyType?: boolean;
  idFromField?: boolean;
  idNameField?: string;
  canEdit?: boolean;
}

export interface MyFormShema<T extends IBaseDoc> {
  type: "object"; // need forNC
  properties: {
    [K in keyof T["payload"]]: MyFormField<T["payload"]>;
  };
}

export type IFormNativeValidator = (
  rule: never,
  value: never,
  callback: (err?: any) => string | undefined
) => void;
export type IFormNativeAsyncValidator = (
  rule: never,
  value: never
) => Promise<void>;

interface IBaseRule {
  required?: boolean;
  type?: IValidatorType;
  message?: string;
  trigger?: "blur";
  pattern?: RegExp;
  len?: number;
  min?: number;
  max?: number;
  enum?: any[];
  whitespace?: boolean;
  transform?: IFormTransformFunc<any>;
}

export interface IFormNativeRule extends IBaseRule {
  validator?: IFormNativeValidator;
  asyncValidator?: IFormNativeAsyncValidator;
}

interface IFormItemRule<T> extends IBaseRule {
  validator?: IFormSyncValidator;
  asyncValidator?: IFormAsyncValidator<T>;
}

export type IFormVisF = (form?: { [k: string]: never }) => boolean;

export type IFormValidatorF = (
  formVal: Ref<Record<string, never>>,
  formRef: Ref<Record<string, never>>
) => IFormNativeValidator;

export interface IFieldsArrItem {
  component: any;
  label: string;
  name: string;
  hidden: IFormVisF;
  componentConfig?: any;
}

export interface IShemaField {
  label: string;
  component: never;
  default?: never;
  visibility?: IFormVisF;
  rules?: IShemaFieldRule[];
}

export interface IShemaFieldRule {
  trigger: string;
  required?: boolean;
  message?: string;
  type?: IValidatorType;
  validator?: IFormValidatorF;
}

export interface IFormRules {
  [key: string]: IFormNativeRule[];
}

export interface MyFormField<T> {
  type: IValidatorType;
  ui: FieldUi;
  wrongTypeMessage?: string;
  default?: any;
  rules?: IFormItemRule<T>[];
}

export type IFormComponents = keyof typeof MyFormComps;

export interface FieldUi {
  label: string;
  hidden?: HiddenCheckFunc;
  disabled?: boolean | string;
  placeholder?: string;
  widget?: IFormComponents;
  readonly?: boolean | string | HiddenCheckFunc;
  columns?: number;
  widgetConfig?: any;
  help?: any;
  linkFields?: LinkFieldItem[];
}

interface LinkFieldItem {
  fieldPath: string; // The associated item field path. such as 'user.name'，'user[i].name'
  rules: string[]; // The rules, such as ['required']
}

export interface ShemaConstructor {
  new (): BaseFormShema<IBaseDoc>;
}

export interface IBaseDoc {
  _id?: string;
  _rev?: string;
  doc_type?: string;
  payload?: { [key: string]: any };
}

export class BaseFormShema<T extends IBaseDoc> {
  public docInfo: ShemaDocInfo<T>;
  public getFormShema: ShemaFunc<T>;
  public canCreate?: CheckFunc;
  public canEdit?: CheckFunc;
  constructor() {
    this.canCreate = async () => true;
    this.canEdit = async () => true;
  }
}
