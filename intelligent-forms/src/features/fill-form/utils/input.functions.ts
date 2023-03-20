export const capitalizeString = (str: string) => {
    return str.toUpperCase()
}

// create function to capitalize first letter of string
export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// create function to lowercase all string
export const lowercaseString = (str: string) => {
    return str.toLowerCase()
}

// create function to check if first letter of string is a space
export const checkFirstLetter = (str: string) => {
    return str.charAt(0) === " "
}