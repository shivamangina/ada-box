export const initialState: any = {
    appLoading: false,
    version: "1.0.0",
    fileTree: [
        {
            label: "docs",
            value: "docs",
            type: "folder",
            children: [
                {
                    label: "pages",
                    value: "pages",
                    type: "folder",
                    children: [
                        {
                            label: "components",
                            value: "pages-components",
                            children: [
                                {
                                    label: "tree",
                                    value: "pages-tree",
                                    type: "folder",
                                    children: [
                                        {
                                            label: "fragments",
                                            value: "pages-fragments",
                                            children: [
                                                {
                                                    label: "async",
                                                    value: "pages-async",
                                                    type: "folder",
                                                    children: [
                                                        {
                                                            label: "index.tsx",
                                                            value: "pages-index.tsx",
                                                            type: "file",
                                                        },
                                                        {
                                                            label: "styles.css",
                                                            value: "pages-styles.css",
                                                            type: "file",
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
            type: "folder",
            children: [
                {
                    label: "rsuite",
                    value: "packages-rsuite",
                    type: "folder",
                    children: [
                        {
                            label: "src",
                            value: "packages-src",
                            children: [
                                {
                                    label: "components",
                                    value: "packages-components",
                                    type: "folder",
                                    children: [
                                        {
                                            label: "Tree",
                                            value: "packages-Tree",
                                            children: [
                                                {
                                                    label: "index.tsx",
                                                    value: "packages-index.tsx",
                                                    type: "file",
                                                },
                                                {
                                                    label: "styles.css",
                                                    value: "packages-styles.css",
                                                    type: "file",
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
            type: "folder",
            expanded: true,
            children: [
                {
                    label: "rsuite",
                    value: "node_modules-rsuite",
                    expanded: true,
                    type: "folder",
                    children: [
                        {
                            label: "src",
                            value: "node_modules-src",
                            type: "folder",
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
                                                    type: "file",
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
                            type: "file",
                        },
                    ],
                },
            ],
        },
        {
            label: "README.md",
            value: "README.md",
            type: "file",
        },
        {
            label: "LICENSE",
            value: "LICENSE",
            type: "file",
        },
        {
            label: "package.json",
            value: "package.json",
            type: "file",
        },
        {
            label: "tsconfig.json",
            value: "tsconfig.json",
            type: "file",
        },
        {
            label: "webpack.config.js",
            value: "webpack.config.js",
            type: "file",
        },
    ],

    setAppLoading: () => Promise.resolve(),
}
