/**
 * Given an array of positive or negative integers
 *
 * I= [i1,..,in]
 *
 * you have to produce a sorted array P of the form
 *
 * [ [p, sum of all ij of I for which p is a prime factor (p positive) of ij] ...]
 *
 * P will be sorted by increasing order of the prime numbers.
 * The final result has to be given as a string in Java, C# or C++
 * and as an array of arrays in other languages.
 *
 * Example:
 *
 * I = [12, 15]; //result = [[2, 12], [3, 27], [5, 15]]
 * [2, 3, 5] is the list of all prime factors of the elements of I, hence the result.
 *
 * Notes: It can happen that a sum is 0 if some numbers are negative!
 *
 * Example: I = [15, 30, -45] 5 divides 15, 30 and (-45) so 5 appears in the result,
 * the sum of the numbers for which 5 is a factor is 0 so we have [5, 0] in the result
 * amongst others.
 */
function getPrimeDivisors(n) {
    let arr = [], i = 2
    n = Math.abs(n)

    while (i <= n) {
        if (n % i == 0) {
            arr.push(i)
            n /= i;
        }
        else {
            i = nextPrime(i)
        }
    }

    return arr
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

function sumOfDivided(lst = []) {

    let divs = [...new Set(
        lst.reduce((s, n) =>
            s.concat(getPrimeDivisors(n)), [])
    )].sort((a,b)=>a-b)

    return divs.map(div =>
        [div, lst.reduce((sum, a) =>
            sum += a % div == 0 ? a : 0, 0)]);
}
