export const formatTime = (t: Date): string => {
    return `${t.getFullYear()}.${t.getMonth()}.${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
}