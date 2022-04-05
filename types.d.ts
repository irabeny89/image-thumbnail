type PatchType = {
  op: PatchOpsType;
  path: string;
  value?: string | number | JsonType;
};

type PatchOpsType = "add" | "remove" | "replace" | "copy" | "move" | "test";

type JsonType = {
  [key: string | number]: string | number | Array<string | number | object>;
};
