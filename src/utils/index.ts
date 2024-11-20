import dayjs from "dayjs"

export function formatDate(date: any) {
    if (!date) {
        return ""
    }
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}
