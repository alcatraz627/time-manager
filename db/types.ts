export type LinkTarget = "Task" | "Note" | "Goal";
export const LinkTargetList: LinkTarget[] = ["Task", "Note", "Goal"];

export type Link = {
  type: "Link";
  target: LinkTarget;
  target_id: string;
};

export type Text = {
  type: "Text";
  content: string;
};
type Line = Link | Text;
export type Content = Line[];
