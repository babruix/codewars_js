/*
 Count the number of Duplicates

 https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1

 Write a function that will return the count of distinct case-insensitive alphabetic characters and numeric digits that occur more than once in the input string. The input string can be assumed to contain only alphanumeric characters, including digits, uppercase and lowercase alphabets.

 Example

 "abcde" -> 0 # no characters repeats more than once
 "aabbcde" -> 2 # 'a' and 'b'
 "aabbcdeB" -> 2 # 'a' and 'b'
 "indivisibility" -> 1 # 'i'
 "Indivisibilities" -> 2 # 'i' and 's'
 "aa11" -> 2 # 'a' and '1'
  */

function duplicateCount(text) {
    let duplCnt = 0, counts = []

    Array.from(text.toLowerCase()).map(x => counts[x] = (counts[x] || 0) + 1)

    for (let c in counts) {
        if (counts[c] > 1) {
            duplCnt++
        }
    }

    return duplCnt
}
