/**
 * Description:
 *
 * Given a positive number n > 1 find the prime factor decomposition of n.
 * The result will be a string with the following form :
 *
 * "(p1**n1)(p2**n2)...(pk**nk)"
 * with the p(i) in increasing order and n(i) empty if n(i) is 1.
 *
 * Example: n = 86240 should return "(2**5)(5)(7**2)(11)"
 *
 */
function primeFactors(n) {
    let i = 2, obj = {}, result = ''

    while (i <= n) {
        if (n % i === 0) {
            n /= i;
            obj[i] = obj[i] ? obj[i] + 1 : 1
        }
        else {
            i = nextPrime(i)
        }
    }

    for (key in obj) {
        result += obj[key] === 1
            ? `(${key})`
            : `(${key}**${obj[key]})`
    }

    return result
}

function nextPrime(value) {
    if (value > 2) {
        let i, q;
        do {
            i = 3;
            value += 2;
            q = Math.floor(Math.sqrt(value));
            while (i <= q && value % i) {
                i += 2;
            }
        } while (i <= q);
        return value;
    }

    return value === 2 ? 3 : 2;
}
