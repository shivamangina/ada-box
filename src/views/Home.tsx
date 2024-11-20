import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import FolderFillIcon from "@rsuite/icons/FolderFill"
import PageIcon from "@rsuite/icons/Page"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md"
import "rsuite/Tree/styles/index.css"
import { useGlobalContext } from "../context/ContextProvider"
import { Tree } from "rsuite"

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

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2>My storage</h2>
                <div>
                    <Button
                        onClick={() => {
                            console.log("create file")
                            setFileTree([{ label: "new-file.jsx", value: "new-file.jsx", type: "file" }, ...fileTree])
                        }}
                        icon={<PlusOutlined />}
                    >
                        Create File
                    </Button>
                </div>
                <div>
                    <Button
                        onClick={() => {
                            console.log("create file")
                            setFileTree([{ label: "newfolder", value: "newfolder", type: "folder" }, ...fileTree])
                        }}
                        icon={<PlusOutlined />}
                    >
                        Create Folder
                    </Button>
                </div>
            </div>
            <Tree
                data={fileTree}
                draggable
                defaultExpandItemValues={getExpandedFilenames(fileTree)}
                onDrop={({ createUpdateDataFunction, dropNode, dropNodePosition }, event) => {
                    if (dropNode.type === "folder" || dropNodePosition === 1 || dropNodePosition === 2) {
                        // Only allow drop if the target node has children
                        const newFileTree = createUpdateDataFunction(fileTree)
                        // keep the folder logos

                        setFileTree(newFileTree)
                    }
                }}
                renderTreeNode={(node) => {
                    return (
                        <>
                            {node.type === "folder" ? <FolderFillIcon /> : <PageIcon />} {node.label}
                        </>
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
                    // update this in the fileTree
                }}
            />
        </div>
    )
}

export default Home
