/**
 * Description:
 *
 * Given an array, find the int that appears an odd number of times.
 *
 * There will always be only one integer that appears an odd number of times.
 *
 */
function findOdd(A) {
    let counts = {}
    A.map(elem => counts[elem] = A.filter(el => el == elem).length)

    for (el in counts) {
        if (counts[el] % 2) {
            return parseInt(el)
        }
    }
    return 0;
}
