import FolderFillIcon from "@rsuite/icons/FolderFill"
import PageIcon from "@rsuite/icons/Page"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md"
import "rsuite/Tree/styles/index.css"
import { useGlobalContext } from "../context/ContextProvider"
import { Tree } from "rsuite"
import io from "socket.io-client"
import { useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

const socket = io("http://localhost:8292")

function Home() {
    const { fileTree, setFileTree } = useGlobalContext()

    function getExpandedFilenames(node: any[]) {
        let filenames: string[] = []

        node.forEach((item) => {
            if (item.expanded) {
                filenames.push(item.value)
            }

            if (item.children) {
                filenames = filenames.concat(getExpandedFilenames(item.children))
            }
        })

        return filenames
    }

    function setKeysExpanded(fileTree: any[], expandedKeys: any[]) {
        fileTree.forEach((item) => {
            if (expandedKeys.includes(item.value)) {
                item.expanded = true
            } else {
                item.expanded = false
            }

            if (item.children) {
                setKeysExpanded(item.children, expandedKeys)
            }
        })

        return fileTree
    }

    const sendMessage = (fileTree: any[]) => {
        socket.emit("update_file_tree", fileTree)
    }

    useEffect(() => {
        // get the file tree from the server
        socket.emit("send_file_tree")
        const handleReceiveFileTree = (fileTree: any[]) => {
            setFileTree(fileTree)
        }
        socket.on("receive_file_tree", handleReceiveFileTree)

        return () => {
            socket.off("receive_file_tree", handleReceiveFileTree)
        }
    }, [])

    useEffect(() => {
        const handleMessage = (fileTree: any[]) => {
            console.log("message: ", fileTree)
            setFileTree(fileTree)
        }

        socket.on("receive_update_file_tree", handleMessage)

        return () => {
            socket.off("receive_update_file_tree", handleMessage)
        }
    }, [])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2>My storage</h2>

                <div>
                    <button
                        onClick={() => {
                            console.log("create file")
                            const id = uuidv4()
                            setFileTree([{ label: `new-file-${id}`, value: `new-file-${id}`, type: "file" }, ...fileTree])
                            sendMessage([{ label: `new-file-${id}`, value: `new-file-${id}`, type: "file" }, ...fileTree])
                        }}
                    >
                        Create File
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => {
                            console.log("create folder")
                            const id = uuidv4()
                            setFileTree([{ label: `newfolder-${id}`, value: `newfolder-${id}`, type: "folder" }, ...fileTree])
                            sendMessage([{ label: `newfolder-${id}`, value: `newfolder-${id}`, type: "folder" }, ...fileTree])
                        }}
                    >
                        Create Folder
                    </button>
                </div>
            </div>
            <Tree
                data={fileTree}
                draggable
                expandItemValues={getExpandedFilenames(fileTree)}
                onDrop={({ createUpdateDataFunction, dropNode, dropNodePosition }, event) => {
                    if (dropNode.type === "folder" || dropNodePosition === 1 || dropNodePosition === 2) {
                        // Only allow drop if the target node has children
                        const newFileTree = createUpdateDataFunction(fileTree)
                        // keep the folder logos

                        setFileTree(newFileTree)
                        sendMessage(newFileTree)
                    }
                }}
                renderTreeNode={(node) => {
                    return (
                        <div key={Math.random()}>
                            {node.type === "folder" ? <FolderFillIcon /> : <PageIcon />} {node.label}
                        </div>
                    )
                }}
                renderTreeIcon={(treeNode, expanded) => {
                    if (treeNode.children) {
                        return expanded ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />
                    }
                    return null
                }}
                onExpand={(expandedKeys) => {
                    console.log("expandedKeys: ", expandedKeys)
                    const newFileTree = setKeysExpanded(fileTree, expandedKeys)
                    setFileTree(newFileTree)
                    sendMessage(newFileTree)
                }}
            />
        </div>
    )
}

export default Home
