import { useEffect } from "react"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { VscNewFile, VscNewFolder } from "react-icons/vsc"
import { useGlobalContext } from "../context/ContextProvider"
import { Tree } from "rsuite"
import io from "socket.io-client"

import { generate } from "random-words"
import { getIcon, getFolderIcon, getExpandedFilenames, setKeysExpanded } from "../utils"

import "rsuite/Tree/styles/index.css"

const socket = io("http://localhost:8292")

const extensions = ["pdf", "docx", "txt", "jpg", "png", "mp4", "mp3", "wav"]

function createNewFile(fileTree: any[], setFileTree: Function, sendMessage: Function) {
    let id = generate({ exactly: 2, join: "-" })
    id = id.concat(".", extensions[Math.floor(Math.random() * extensions.length)])
    const newFileTree = [{ label: `${id}`, value: `${id}`, type: "file" }, ...fileTree]
    setFileTree(newFileTree)
    sendMessage(newFileTree)
}

function createNewFolder(fileTree: any[], setFileTree: Function, sendMessage: Function) {
    const id = generate({ exactly: 2, join: "-" })
    const newFolder = { label: `${id}`, value: `${id}`, type: "folder" }
    const newFileTree = [newFolder, ...fileTree]
    setFileTree(newFileTree)
    sendMessage(newFileTree)
}

function Home() {
    const { fileTree, setFileTree } = useGlobalContext()

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

    const sendMessage = (fileTree: any[]) => {
        socket.emit("update_file_tree", fileTree)
    }

    return (
        <div className="h-screen">
            <header className="flex items-start p-4 bg-white max-w-7xl mx-auto ">
                <div className="">
                    <a className="text-purple-600 font-semibold border font-mono bg-gray-100 px-2 py-1 rounded-md">Ada.box</a>
                </div>
            </header>
            <div className="flex flex-col max-w-7xl mx-auto">
                <div className="flex items-center justify-between p-4 bg-white ">
                    <h1 className="text-lg font-bold">All Files</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => createNewFile(fileTree, setFileTree, sendMessage)}
                            className="flex items-center px-4 py-2 border rounded-2xl text-gray-700 hover:bg-gray-100"
                        >
                            <VscNewFile className="mr-0.5" />
                        </button>
                        <button
                            onClick={() => createNewFolder(fileTree, setFileTree, sendMessage)}
                            className="flex items-center px-4 py-2 border rounded-2xl text-gray-700 hover:bg-gray-100"
                        >
                            <VscNewFolder className="mr-0.5" />
                        </button>
                    </div>
                </div>
                <Tree
                    height={600}
                    data={fileTree}
                    draggable
                    expandItemValues={getExpandedFilenames(fileTree)}
                    onDrop={({ createUpdateDataFunction, dropNode, dropNodePosition }, event) => {
                        if (dropNode.type === "folder" || dropNodePosition === 1 || dropNodePosition === 2) {
                            // Only allow drop if the target node has children
                            const newFileTree = createUpdateDataFunction(fileTree)
                            setFileTree(newFileTree)
                            sendMessage(newFileTree)
                        }
                    }}
                    renderTreeNode={(node) => {
                        return (
                            <div key={Math.random()} className="flex items-center space-x-4 text-2xl ">
                                <span className="">{node.type === "folder" ? getFolderIcon(node.expanded) : getIcon(node.label)}</span>{" "}
                                <p>{node.label}</p>
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
                        const newFileTree = setKeysExpanded(fileTree, expandedKeys)
                        setFileTree(newFileTree)
                        sendMessage(newFileTree)
                    }}
                />
            </div>
        </div>
    )
}

export default Home
