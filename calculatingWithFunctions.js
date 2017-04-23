/**
 * Description:
 *
 * This time we want to write calculations using functions and get the results.
 * Let's have a look at some examples:
 *
 * seven(times(five())); // must return 35
 * four(plus(nine())); // must return 13
 * eight(minus(three())); // must return 5
 * six(dividedBy(two())); // must return 3
 * Requirements:
 *
 * There must be a function for each number from 0 ("zero") to 9 ("nine")
 * There must be a function for each of the following mathematical operations:
 * plus, minus, times, dividedBy
 * Each calculation consist of exactly one operation and two numbers
 * The most outer function represents the left operand,
 * the most inner function represents the right operand
 */
const param = (a) => a[0] || ''
    , zero = (...arg) => eval('0'+ param(arg))
    , one = (...arg) => eval('1'+ param(arg))
    , two = (...arg) => eval('2'+ param(arg))
    , three = (...arg) => eval('3'+ param(arg))
    , four = (...arg) => eval('4'+ param(arg))
    , five = (...arg) => eval('5'+ param(arg))
    , six = (...arg) => eval('6'+ param(arg))
    , seven = (...arg) => eval('7'+ param(arg))
    , eight = (...arg) => eval('8'+ param(arg))
    , nine = (...arg) => eval('9'+ param(arg))
    , plus = (...arg) => '+' + arg[0]
    , minus = (...arg) => '-' + arg[0]
    , times = (...arg) => '*' + arg[0]
    , dividedBy = (...arg) => '/' + arg[0]
