/**
 * Description:
 *
 * The maximum sum subarray problem consists in finding the maximum sum
 * of a contiguous subsequence in an array or list of integers:
 *
 * maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
 * // should be 6: [4, -1, 2, 1]
 * Easy case is when the list is made up of only positive numbers
 * and the maximum sum is the sum of the whole array.
 * If the list is made up of only negative numbers, return 0 instead.
 *
 * Empty list is considered to have zero greatest sum.
 * Note that the empty list or array is also a valid sublist/subarray.
 */
var maxSequence = function (arr) {
    let subArr = [], max = 0, sumArr = (myarr) => {
        let sum = 0
        myarr.forEach(el => {
            sum += el
        })
        if (sum > max) max = sum
    }

    arr.forEach((el, i) => {
        subArr = []

        let newArr = []

        let j = --i
        while (j >= 0) {
            newArr.push(arr[j])
            sumArr(newArr)
            j--
        }
        if (newArr.length > 1) subArr.push(newArr)
        sumArr(newArr)

        newArr = []

        j = i
        while (j < arr.length && j > 0) {
            newArr.push(arr[j])
            sumArr(newArr)
            j++
        }
        if (newArr.length > 1) subArr.push(newArr)
        sumArr(newArr)
    })
    return max
}
