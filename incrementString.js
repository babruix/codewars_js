/**
 * Description:
 *
 * Your job is to write a function which increments a string,
 * to create a new string. If the string already ends with a number,
 * the number should be incremented by 1.
 * If the string does not end with a number the number 1 should be appended
 * to the new string.
 *
 * Examples:
 *
 * foo -> foo1
 *
 * foobar23 -> foobar24
 *
 * foo0042 -> foo0043
 *
 * foo9 -> foo10
 *
 * foo099 -> foo100
 *
 * Attention: If the number has leading zeros the amount of digits
 * should be considered.
 */
function incrementString(str) {
    let lastChar, i = 0, number, len

    do {
        i++
        lastChar = str[str.length - i]
    }
    while (lastChar == parseInt(lastChar))

    i--
    number = parseInt(str.substr(str.length - i)) + 1 || 1

    len = str.substr(str.length - i).length
    if (len > number.toString().length) {
        number = (new Array(len + 1).join('0') + number).slice(-len)
    }

    return lastChar == parseInt(lastChar)
        ? str.substr(i, str.length - i) + number
        : str.substr(0, str.length - i) + number
}
