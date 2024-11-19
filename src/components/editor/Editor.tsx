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
            <div>
                <input placeholder="Untitled" value={title} onChange={handleChangeTitle} />
            </div>
            {mode === Mode.Edit && <EditorMenu editor={editor} />}

            <div>
                <EditorContent editor={editor} />
            </div>

            <div>
                <div>
                    <span>words:</span>
                    <span>{charCount}</span>
                </div>
                <div>
                    <span>createdAt:</span>
                    <span>{formatDate(selectedPost?.createdAt)}</span>
                </div>
                <div>
                    <span>updatedAt:</span>
                    <span>{formatDate(selectedPost?.updatedAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Editor)
