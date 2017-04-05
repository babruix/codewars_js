/**
 * Human Readable Time
 * Description:
 *
 * Write a function, which takes a non-negative integer (seconds) as input and returns the time in a human-readable format (HH:MM:SS)
 *
 * HH = hours, padded to 2 digits, range: 00 - 99
 * MM = minutes, padded to 2 digits, range: 00 - 59
 * SS = seconds, padded to 2 digits, range: 00 - 59
 * The maximum time never exceeds 359999 (99:59:59)
 *
 */
function humanReadable(seconds) {
    let timeA = new Date(0)
    timeA.setSeconds(seconds)
    let hh = Math.floor(seconds / 60 / 60)
    if (hh < 10) hh = '0' + hh

    return hh + timeA.toTimeString().substr(2, 6)
}
