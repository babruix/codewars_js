/**
 * Description:
 *
 * Create a function that takes a Roman numeral as its argument and returns
 * its value as a numeric decimal integer. You don't need to validate the form
 * of the Roman numeral.
 *
 * Modern Roman numerals are written by expressing each decimal digit of
 * the number to be encoded separately, starting with the leftmost digit
 * and skipping any 0s. So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC)
 * and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII).
 * The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.
 *
 * Example:
 *
 * solution('XXI'); // should return 21
 */
function solution(roman){
    let decode = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M':1000}

    return roman.split('').reduce((sum, curr, i) => {
        let nextChar = roman.charAt(i+1)

        switch(curr) {
            case 'I':
                sum += nextChar.includes('X') || nextChar.includes('V') ? -1 : decode[curr]
                break
            case 'X':
                sum += nextChar.includes('L') || nextChar.includes('C') ? -10 : decode[curr]
                break
            case 'C':
                sum += nextChar.includes('D') || nextChar.includes('M') ? -100 : decode[curr]
                break
            default:
                sum += decode[curr]
                break
        }

        return sum
    }, 0);
}
