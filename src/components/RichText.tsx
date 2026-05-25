import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";

function isEditorState(value: unknown): value is DefaultTypedEditorState {
  return typeof value === "object" && value !== null && "root" in value;
}

type RichTextProps = Readonly<{
  className?: string;
  data: unknown;
}>;

export function RichText({ className, data }: RichTextProps): React.ReactNode {
  if (!isEditorState(data)) {
    return null;
  }

  return (
    <ConvertRichText
      className={`payload-richtext prose prose-neutral dark:prose-invert max-w-none ${className ?? ""}`}
      data={data}
    />
  );
}
