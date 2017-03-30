/**
 Description:

 In the following 6 digit number:

 283910
 91 is the greatest sequence of 2 digits.

 Complete the solution so that it returns the largest five digit number
 found within the number given.. The number will be passed in as a string of only digits.
 It should return a five digit integer. The number passed
 */

function solution(digits){
    return Array.from((''+digits).slice(0, -4))
            .reduce((previousValue, currentItem, i, arr)=> {
            newNumber = parseInt((''+digits).substring(i, i+5))
            return newNumber > previousValue ? newNumber : previousValue
        })
}
