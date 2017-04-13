/**
 * Description:
 *
 * Snail Sort
 *
 * Given an n x n array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.
 *
 * array = [[1,2,3],
 * [4,5,6],
 * [7,8,9]]
 * snail(array) #=> [1,2,3,6,9,8,7,4,5]
 * For better understanding, please follow the numbers of the next array consecutively:
 *
 * array = [[1,2,3],
 * [8,9,4],
 * [7,6,5]]
 * snail(array) #=> [1,2,3,4,5,6,7,8,9]
 * NOTE: The idea is not sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.
 * NOTE 2: The 0x0 (empty matrix) is represented as [[]]
 */
snail = (array) => {
    if (!array.length || !array[0].length) return []

    let matrix = []
        , row = 0
        , col = 0
        , dx = 1
        , dy = 0
        , dirChanges = 0
        , n = array.length
        , visits = n

    for (let i = 0; i < n * n; i++) {
        matrix[i] = array[row][col];
        if (--visits <= 0) {
            visits = n * (dirChanges % 2) + n * ((dirChanges + 1) % 2) - (dirChanges / 2 - 1) - 2;
            let temp = dx;
            dx = -dy;
            dy = temp;
            dirChanges++;
        }
        col += dx;
        row += dy;
    }
    return matrix
}
