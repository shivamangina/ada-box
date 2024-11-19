import React, { useEffect, useState, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import EditorMenu from "./EditorMenu"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import { Post, EditorHandle, Mode } from "../../types"
import { formatDate } from "../../utils"

interface Props {
    selectedPost: Post | null
    mode: Mode
}

const Editor: ForwardRefRenderFunction<EditorHandle, Props> = ({ selectedPost, mode }: Props, forwardedRef) => {
    const [charCount, setCharCount] = useState(selectedPost?.plainText.length)
    const [title, setTitle] = useState(selectedPost?.title)
    useImperativeHandle(forwardedRef, (): EditorHandle => {
        return {
            newPost: {
                ...((selectedPost || {}) as Post),
                title: title || "no title",
                content: editor?.getHTML() || "",
                plainText: editor?.getText() || "",
            },
        }
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Link,
            Placeholder.configure({
                placeholder: "Start typing here...",
            }),
        ],
        content: selectedPost?.content,
        onUpdate: () => {
            setCharCount(editor?.getCharacterCount() || 0)
        },
        editable: false,
    })

    const handleChangeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        if (selectedPost && editor) {
            setTitle(selectedPost.title)
            editor.commands.setContent(selectedPost.content)
            setCharCount(editor.getCharacterCount())
        } else if (!selectedPost && editor) {
            setTitle("")
            editor.commands.setContent("")
        }
    }, [selectedPost])

    useEffect(() => {
        editor?.setEditable(mode === Mode.Edit)
        editor?.commands.focus()
    }, [mode])

    return (
        <div>
            <div className="text-3xl font-medium bg-transparent border-none outline-none mb-6">
                {mode === Mode.Edit ? <input placeholder="Untitled" value={title} onChange={handleChangeTitle} /> : <div>{title}</div>}
            </div>
            {mode === Mode.Edit && <EditorMenu editor={editor} />}

            <div>
                <EditorContent editor={editor} />
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-72 right-0 bg-[#f5f5f5] px-4 py-2 text-xs text-gray-500 flex space-x-4">
                <span>words: {charCount}</span>
                <span>createdAt: {selectedPost?.createdAt && formatDate(selectedPost.createdAt)}</span>
                <span>updatedAt: {selectedPost?.updatedAt && formatDate(selectedPost.updatedAt)}</span>
            </div>
        </div>
    )
}

export default forwardRef(Editor)
