/**
 Description:

 Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized.

 Examples:

 // returns "theStealthWarrior"
 toCamelCase("the-stealth-warrior")

 // returns "TheStealthWarrior"
 toCamelCase("The_Stealth_Warrior")
 */
function toCamelCase(str) {
    if (!str) return ''

    return str
        .replace(/\-/g, '_')
        .split('_')
        .reduce((res, word, i) => {
            let firstChar = (i === 0 && word[0] === word[0].toLowerCase())
                ? word[0]
                : word[0].toUpperCase()
            res.push(firstChar + word.substr(1))
            return res}, []).join('')
}
