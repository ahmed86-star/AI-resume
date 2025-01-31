'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ResumeEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function ResumeEditor({ content, onChange }: ResumeEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="prose max-w-none w-full">
      <EditorContent editor={editor} className="min-h-[500px] p-4 border rounded-lg" />
    </div>
  );
} 