export const getLastName = (name: string): string => {
    const lastName = name.split(' ')
    return lastName[lastName.length - 1]
}
