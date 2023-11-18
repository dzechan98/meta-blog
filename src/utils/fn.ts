export const getLastName = (name: string): string => {
    const lastName = name.split(' ')
    return lastName[lastName.length - 1]
}

export function capitalizeFirstLetterOfEachWord(str: string) {
    // Tách chuỗi thành mảng các từ
    let words = str.split(' ')

    // Chuyển đổi chữ cái đầu của mỗi từ thành chữ hoa
    let capitalizedWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })

    // Kết hợp các từ thành chuỗi mới
    let result = capitalizedWords.join(' ')

    return result
}
