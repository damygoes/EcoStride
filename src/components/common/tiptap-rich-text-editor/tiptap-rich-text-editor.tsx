import { EditorContent, useEditor } from "@tiptap/react";
import { tipTapExtensions } from "./tiptap-extensions";
import Toolbar from "./toolbar";

type TipTapRichTextEditor = {
  richText: string;
  onChange: (richText: string) => void;
};

function TipTapRichTextEditor({ richText, onChange }: TipTapRichTextEditor) {
  const editor = useEditor({
    extensions: tipTapExtensions,
    content: richText,
    editorProps: {
      attributes: {
        class:
          "prose w-full h-[95%] flex-1 text-text-color px-4 mt-5 cursor-text",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col bg-white rounded-lg justify-stretch min-h-44">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTapRichTextEditor;
