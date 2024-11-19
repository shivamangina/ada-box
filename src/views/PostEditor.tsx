import React, { useState, useRef } from "react"
import Editor from "../components/editor/Editor"
import { Button, Tooltip, Spin } from "antd"
import { PlusOutlined, EyeOutlined, EditOutlined, ShareAltOutlined } from "@ant-design/icons"

import classnames from "classnames"
import { EditorHandle, Mode, Post } from "../types"
import { formatDate, getShareLink } from "../utils"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { DEFAULT_POSTS } from "../utils/contants"

function PostEditor() {
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

    const sharePostLink = () => {
        console.log(link)
        console.log({ content: "Share Link copied." })
    }

    return (
        <Spin spinning={false}>
            <div>
                <div>
                    <div>
                        <div>
                            <span className="app-name">ARAZZO</span>
                        </div>

                        <Tooltip title="Add Post">
                            <Button icon={<PlusOutlined />} shape="circle" type="text" onClick={() => selectPost(null)} />
                        </Tooltip>
                    </div>

                    <div>
                        <div>
                            {DEFAULT_POSTS.map((item, index) => (
                                <div
                                    className={classnames("post-item", {
                                        "is-active": selectedPost?.randomUUID === item.randomUUID,
                                    })}
                                    key={index}
                                    onClick={() => selectPost(item)}
                                >
                                    <div>{item.title}</div>
                                    <div dangerouslySetInnerHTML={{ __html: item.plainText }} />
                                    <div>{formatDate(item.updatedAt)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>{Math.random()}</div>
                        <div>
                            {selectedPost ? (
                                <>
                                    <CopyToClipboard text={link}>
                                        <Tooltip title="Share Post">
                                            <Button icon={<ShareAltOutlined />} type="text" onClick={sharePostLink} />
                                        </Tooltip>
                                    </CopyToClipboard>
                                </>
                            ) : null}
                            {mode === Mode.Edit ? (
                                <Tooltip title="View">
                                    <Button icon={<EyeOutlined />} type="text" onClick={() => setMode(Mode.View)} />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Edit">
                                    <Button icon={<EditOutlined />} type="text" onClick={() => setMode(Mode.Edit)} />
                                </Tooltip>
                            )}

                            {
                                <Button
                                    type="text"
                                    onClick={() => {
                                        console.log("clicked")
                                    }}
                                >
                                    Get Started
                                </Button>
                            }
                        </div>
                    </div>
                    <Editor selectedPost={selectedPost} ref={editorRef} mode={mode} />
                </div>
            </div>
        </Spin>
    )
}

export default PostEditor
