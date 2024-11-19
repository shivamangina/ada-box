import dayjs from "dayjs"

export function formatDate(date: any) {
    if (!date) {
        return ""
    }
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

export function getShareLink(id: string) {
    if (window.location.href.includes("localhost")) {
        return "http://localhost:5222/#/post/" + id
    }

    return "https://arazzo.netlify.app/#/post/" + id
}
