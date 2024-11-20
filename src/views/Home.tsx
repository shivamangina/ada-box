import React from "react"
import { Table, Button } from "antd"
import { FolderOutlined, FilePdfOutlined, FileExcelOutlined, PlusOutlined } from "@ant-design/icons"
import "rsuite/Tree/styles/index.css"

import { Tree } from "rsuite"
import { mockTreeData } from "./mock"

const data1 = mockTreeData({
    limits: [3, 3, 4],
    labels: (layer: any, value: any, faker: any) => {
        const methodName = ["jobArea", "jobType", "firstName"]
        return faker.person[methodName[layer]]()
    },
})

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
            {/* <Table columns={columns} dataSource={data} pagination={false} /> */}
            <Tree
                data={treeData}
                draggable
                onDrop={({ createUpdateDataFunction }, event) => setTreeData(createUpdateDataFunction(treeData))}
            />
        </div>
    )
}

export default Home
