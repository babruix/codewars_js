/**
 * Description:
 * Write a function tripledouble(num1,num2)
 * which takes in numbers num1 and num2 and returns 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2.
 * For example:
 * tripledouble(451999277, 41177722899) == 1 // num1 has straight triple 999s and
 * // num2 has straight double 99s
 * tripledouble(1222345, 12345) == 0 // num1 has straight triple 2s but num2 has only a single 2
 * tripledouble(12345, 12345) == 0
 * tripledouble(666789, 12345667) == 1
 */
function findDuplecates(n) {
    let counts ={}
    n = ''+n

    for (var i = 0; i < n.length; i++) {
        counts[n[i]] = n[i-1] === n[i]
            ? parseInt(counts[n[i]]) + 1
            : counts[n[i]] || 1
    }

    return counts
}

function getAllIndexes(counts, val) {
    var indexes = []
    for (key in counts) {
        if (counts[key] >= val) {
            indexes.push(key)
        }
    }

    return indexes
}

function tripledouble(num1, num2) {
    let tripleDigits = getAllIndexes(findDuplecates(num1), 3)
    let doublesDigits = getAllIndexes(findDuplecates(num2), 2)

    return doublesDigits.filter(n => tripleDigits.indexOf(n) !== -1).length ? 1 : 0
}
