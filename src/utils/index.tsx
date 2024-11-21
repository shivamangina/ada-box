import { FcOpenedFolder, FcFolder, FcAudioFile, FcVideoFile, FcImageFile, FcDiploma2, FcFile } from "react-icons/fc"

export const getIcon = (filename: any) => {
    const extension = filename.split(".").pop()
    if (extension === "pdf") return <FcFile className="w-6 h-6" />
    if (extension === "docx") return <FcDiploma2 className="w-6 h-6" />
    if (extension === "txt") return <FcFile className="w-6 h-6" />
    if (extension === "jpg" || extension === "png") return <FcImageFile className="w-6 h-6" />
    if (extension === "mp3" || extension === "wav") return <FcAudioFile className="w-6 h-6" />
    if (extension === "mp4") return <FcVideoFile className="w-6 h-6" />
}

export const getFolderIcon = (expanded: boolean) => {
    return expanded ? <FcOpenedFolder className="w-6 h-6" /> : <FcFolder className="w-6 h-6" />
}

export function getExpandedFilenames(node: any[]) {
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

export function setKeysExpanded(fileTree: any[], expandedKeys: any[]) {
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
