/**
 * Description:
 *
 * Your job is to create a calculator which evaluates expressions in
 * Reverse Polish notation.
 *
 * For example expression 5 1 2 + 4 * + 3 -
 * (which is equivalent to 5 + ((1 + 2) * 4) - 3
 * in normal notation) should evaluate to 14.
 *
 * Note that for simplicity you may assume that there are always spaces
 * between numbers and operations, e.g. 1 3 + expression is valid,
 * but 1 3+ isn't.
 *
 * Empty expression should evaluate to 0.
 *
 * Valid operations are +, -, *, /.
 *
 * You may assume that there won't be exceptional situations
 * (like stack underflow or division by zero).
 */
function calc(expr) {
    const ar = expr.split(/\s+/)
        , st = []
        , regExp = /^[\+\-\/\*]$/
    let token

    while (token = ar.shift()) {
        if (token === +token) {
            st.push(token)
        } else {
            let n2 = st.pop()
                , n1 = st.pop()
            if (!valid(n1, n2, token, regExp)) {
                return 0
            }
            st.push(eval(n1 + token + ' ' + n2))
        }
    }

    const result = st.pop()
    return result
        ? parseFloat(result)
        : 0
}

let valid = (n1, n2, token, regExp) =>
n1 === +n1 && n2 === +n2 && regExp.test(token)
