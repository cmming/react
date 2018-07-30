export function getRedirectPath({ type, avatar }) {
    let url = (type === 'boss') ? '/boss' : '/genius'
    console.log(avatar)
    if (!avatar) {
        url += 'info'
    }
    return url
}