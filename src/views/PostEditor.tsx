import React, { useState, useRef } from "react"
import Editor from "../components/editor/Editor"
import { Button, Tooltip, Spin } from "antd"
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons"
import classnames from "classnames"
import { EditorHandle, Mode, Post } from "../types"
import { formatDate, getShareLink } from "../utils"
import { useGlobalContext } from "../context/ContextProvider"

function PostEditor() {
    const { notes } = useGlobalContext()
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const editorRef = useRef<EditorHandle>(null)
    const [mode, setMode] = useState(Mode.View)
    const [link, setLink] = useState("")

    const selectPost = (post: Post | null) => {
        if (post) {
            setLink(getShareLink(post.randomUUID))
        }
        setSelectedPost(post)
    }

    return (
        <Spin spinning={false}>
            <div className="min-h-screen bg-[#fffdf7]">
                {/* Left Sidebar */}
                <div className="fixed left-0 top-0 w-72 h-full border-r border-gray-200 bg-[#fffdf7]">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                            <span className="font-mono">Ada Note</span>
                            <Tooltip title="Add Post">
                                <Button icon={<PlusOutlined />} shape="circle" type="text" onClick={() => selectPost(null)} />
                            </Tooltip>
                        </div>
                    </div>

                    {/* Posts List */}
                    <div className="overflow-y-auto h-[calc(100vh-64px)]">
                        {notes.map((item: Post, index: number) => (
                            <div
                                key={index}
                                onClick={() => selectPost(item)}
                                className={classnames("p-4 cursor-pointer hover:bg-gray-100", {
                                    "bg-gray-100": selectedPost?.randomUUID === item.randomUUID,
                                })}
                            >
                                <h3 className="font-medium mb-1">{item.title}</h3>
                                <div className="text-sm text-gray-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.plainText }} />
                                <div className="text-xs text-gray-400 mt-2">{formatDate(item.updatedAt)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="ml-72">
                    {/* Editor Area */}
                    <div className="max-w-4xl mx-auto px-8 py-6">
                        <div>
                            <div>
                                {mode === Mode.Edit ? (
                                    <Tooltip title="View">
                                        <Button icon={<EyeOutlined />} type="text" onClick={() => setMode(Mode.View)} />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Edit">
                                        <Button icon={<EditOutlined />} type="text" onClick={() => setMode(Mode.Edit)} />
                                    </Tooltip>
                                )}
                            </div>
                        </div>

                        <Editor selectedPost={selectedPost} ref={editorRef} mode={mode} />
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default PostEditor
