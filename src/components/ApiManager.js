export const getAllUsers = () => {
    return fetch("https://machining-api-e3mht.ondigitalocean.app/users")
        .then(res => res.json())
}

export const getAllQuotes = () => {
    return fetch("https://machining-api-e3mht.ondigitalocean.app/quotes?_expand=user&_expand=request&_sort=status&_order=asc")
        .then(res => res.json())
}
export const getSortQuotesByDateOlder = () => {
    return fetch("https://machining-api-e3mht.ondigitalocean.app/quotes?_sort=date&_order=desc")
        .then(res => res.json())
}
export const getSortQuotesByDateNewer = () => {
    return fetch("https://machining-api-e3mht.ondigitalocean.app/quotes?_sort=date&_order=asc")
        .then(res => res.json())
}

export const getAllRequests = () => {
    return fetch("https://machining-api-e3mht.ondigitalocean.app/requests?_expand=user")
        .then(res => res.json())
}