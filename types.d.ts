type PatchType = {
  op: PatchOpsType;
  path: string;
  value?: any;
  from?: string;
};

type PatchOpsType = "add" | "remove" | "replace" | "copy" | "move" | "test";

export type JsonType = {
  biscuits: Record<"name", string>[];
};
