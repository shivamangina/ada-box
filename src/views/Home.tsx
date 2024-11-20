import React from "react"
import { Table, Button } from "antd"
import { FolderOutlined, FilePdfOutlined, FileExcelOutlined, PlusOutlined } from "@ant-design/icons"
import "rsuite/Tree/styles/index.css"
import FolderFillIcon from "@rsuite/icons/FolderFill"
import PageIcon from "@rsuite/icons/Page"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight, MdFilePresent, MdFolder } from "react-icons/md"

import { Tree } from "rsuite"

const data1: any = [
    {
        label: "docs",
        value: "docs",
        children: [
            {
                label: "pages",
                value: "pages",
                children: [
                    {
                        label: "components",
                        value: "pages-components",
                        children: [
                            {
                                label: "tree",
                                value: "pages-tree",
                                children: [
                                    {
                                        label: "fragments",
                                        value: "pages-fragments",
                                        children: [
                                            {
                                                label: "async",
                                                value: "pages-async",
                                                children: [
                                                    {
                                                        label: "index.tsx",
                                                        value: "pages-index.tsx",
                                                    },
                                                    {
                                                        label: "styles.css",
                                                        value: "pages-styles.css",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        label: "packages",
        value: "packages",
        children: [
            {
                label: "rsuite",
                value: "packages-rsuite",
                children: [
                    {
                        label: "src",
                        value: "packages-src",
                        children: [
                            {
                                label: "components",
                                value: "packages-components",
                                children: [
                                    {
                                        label: "Tree",
                                        value: "packages-Tree",
                                        children: [
                                            {
                                                label: "index.tsx",
                                                value: "packages-index.tsx",
                                            },
                                            {
                                                label: "styles.css",
                                                value: "packages-styles.css",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        label: "node_modules",
        value: "node_modules",
        children: [
            {
                label: "rsuite",
                value: "node_modules-rsuite",
                children: [
                    {
                        label: "src",
                        value: "node_modules-src",
                        children: [
                            {
                                label: "components",
                                value: "node_modules-components",
                                children: [
                                    {
                                        label: "Tree",
                                        value: "node_modules-Tree",
                                        children: [
                                            {
                                                label: "index.tsx",
                                                value: "node_modules-index.tsx",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: "package.json",
                        value: "node_modules-package.json",
                    },
                ],
            },
        ],
    },
    {
        label: "README.md",
        value: "README.md",
        children: null,
    },
    {
        label: "LICENSE",
        value: "LICENSE",
        children: null,
    },
    {
        label: "package.json",
        value: "package.json",
        children: null,
    },
    {
        label: "tsconfig.json",
        value: "tsconfig.json",
        children: null,
    },
    {
        label: "webpack.config.js",
        value: "webpack.config.js",
        children: null,
    },
]

const data = [
    {
        key: "1",
        name: "Dribbble Shots",
        type: "Folder",
        size: "48 MB",
        modified: "09/04/2023 20:29",
        icon: <FolderOutlined />,
    },
    {
        key: "2",
        name: "Invoice for Victor.pdf",
        type: "Document",
        size: "19 MB",
        modified: "08/04/2023 20:29",
        icon: <FilePdfOutlined />,
    },
    {
        key: "3",
        name: "Marketing",
        type: "Folder",
        size: "36 MB",
        modified: "04/04/2023 20:29",
        icon: <FolderOutlined />,
    },
    {
        key: "4",
        name: "Internship Program.xlsx",
        type: "Document",
        size: "24 MB",
        modified: "01/04/2023 20:29",
        icon: <FileExcelOutlined />,
    },
]

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: any) => (
            <span>
                {record.icon} {text}
            </span>
        ),
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "File size",
        dataIndex: "size",
        key: "size",
    },
    {
        title: "Last modified",
        dataIndex: "modified",
        key: "modified",
    },
]

function Home() {
    const [treeData, setTreeData] = React.useState(data1)
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2>My storage</h2>
                <div>
                    <Button icon={<PlusOutlined />}>Create</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={data} pagination={false} />
            <Tree
                data={treeData}
                draggable
                onDrop={({ createUpdateDataFunction, dropNode }, event) => {
                    if (dropNode.children) {
                        // Only allow drop if the target node has children
                        setTreeData(createUpdateDataFunction(treeData))
                    }
                }}
                renderTreeNode={(node) => {
                    return (
                        <>
                            {node.children ? <FolderFillIcon /> : <PageIcon />} {node.label}
                        </>
                    )
                }}
                renderTreeIcon={(treeNode, expanded) => {
                    if (treeNode.children) {
                        return expanded ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />
                    }
                    return null
                }}
            />
        </div>
    )
}

export default Home
