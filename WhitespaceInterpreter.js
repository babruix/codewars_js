/**
 * Whitespace
 *
 * Whitespace is an esoteric programming language that uses only three characters:
 *
 * [space] or " " (ASCII 32)
 * [tab] or "\t" (ASCII 9)
 * [line-feed] or "\n" (ASCII 10)
 * All other characters may be used for comments. The interpreter ignores them.
 *
 * Whitespace is an imperative, stack-based programming language, including features such as subroutines.
 *
 * Each command in whitespace begins with an Instruction Modification Parameter (IMP).
 *
 * IMPs
 *
 * [space]: Stack Manipulation
 * [tab][space]: Arithmetic
 * [tab][tab]: Heap Access
 * [tab][line-feed]: Input/Output
 * [line-feed]: Flow Control
 * There are two types of data a command may be passed: numbers and labels.
 *
 * Parsing Numbers
 *
 * Numbers begin with a [sign] symbol. The sign symbol is either [tab] -> negative, or [space] -> positive.
 * Numbers end with a [terminal] symbol: [line-feed].
 * Between the sign symbol and the terminal symbol are binary digits [space] -> binary-0, or [tab] -> binary-1.
 * A number expression [sign][terminal] will be treated as zero.
 * The expression of just [terminal] should throw an error. (The Haskell implementation is inconsistent about this.)
 * Parsing Labels
 *
 * Labels begin with any number of [tab] and [space] characters.
 * Labels end with a terminal symbol: [line-feed].
 * Unlike with numbers, the expression of just [terminal] is valid.
 * Labels must be unique.
 * A label may be declared either before or after a command that refers to it.
 * Input/Output
 *
 * As stated earlier, there commands may read data from input or write to output.
 *
 * Parsing Input
 *
 * Whitespace will accept input either characters or integers. Due to the lack of an input stream mechanism, the input will be passed as a string to the interpreter function.
 *
 * Reading a character involves simply taking a character from the input stream.
 * Reading an integer involves parsing a decimal or hexadecimal number from the current position of the input stream, up to and terminated by a line-feed character.
 * The original implementation being in Haskell has stricter requirements for parsing an integer.
 * The Javascript and Coffeescript implementations will accept any number that can be parsed by the parseInt function as a single parameter.
 * The Python implementations will accept any number that can be parsed by the int function as a single parameter.
 * The Java implementations will use an InputStream instance for input. For InputStream use readLine if the program requests a number and read if the program expects a character.
 * An error should be thrown if the input ends before parsing is complete. (This is a non-issue for the Haskell implementation, as it expects user input)
 * Writing Output
 *
 * For a number, append the output string with the number's string value.
 * For a character, simply append the output string with the character.
 * The Java implementations will support an optional OutputStream for output. If an OutputStream is provided, it should be flushed before and after code execution and filled as code is executed. The output string should be returned in any case.
 * Commands
 *
 * Notation: n specifies the parameter, [number] or [label].
 *
 * Errors should be thrown for invalid numbers, labels, and heap addresses, or if there are not enough items on the stack to complete an operation (unless otherwise specified). In addition, an error should be thrown for unclean termination.
 *
 * IMP [space] - Stack Manipulation
 *
 * [space] (number): Push n onto the stack.
 * [tab][space] (number): Duplicate the nth value from the top of the stack.
 * [tab][line-feed] (number): Discard the top n values below the top of the stack from the stack. (For n<0 or n>=stack.length, remove everything but the top value.)
 * [line-feed][space]: Duplicate the top value on the stack.
 * [line-feed][tab]: Swap the top two value on the stack.
 * [line-feed][line-feed]: Discard the top value on the stack.
 * IMP [tab][space] - Arithmetic
 *
 * [space][space]: Pop a and b, then push b+a.
 * [space][tab]: Pop a and b, then push b-a.
 * [space][line-feed]: Pop a and b, then push b*a.
 * [tab][space]: Pop a and b, then push b/a*. If a is zero, throw an error.
 * *Note that the result is defined as the floor of the quotient.
 * [tab][tab]: Pop a and b, then push b%a*. If a is zero, throw an error.
 * *Note that the result is defined as the remainder after division and sign (+/-) of the divisor (a).
 * IMP [tab][tab] - Heap Access
 *
 * [space]: Pop a and b, then store a at heap address b.
 * [tab]: Pop a and then push the value at heap address a onto the stack.
 * IMP [tab][line-feed] - Input/Output
 *
 * [space][space]: Pop a value off the stack and output it as a character.
 * [space][tab]: Pop a value off the stack and output it as a number.
 * [tab][space]: Read a character from input, a, Pop a value off the stack, b, then store the ASCII value of a at heap address b.
 * [tab][tab]: Read a number from input, a, Pop a value off the stack, b, then store a at heap address b.
 * IMP [line-feed] - Flow Control
 *
 * [space][space] (label): Mark a location in the program with label n.
 * [space][tab] (label): Call a subroutine with the location specified by label n.
 * [space][line-feed] (label): Jump unconditionally to the position specified by label n.
 * [tab][space] (label): Pop a value off the stack and jump to the label specified by n if the value is zero.
 * [tab][tab] (label): Pop a value off the stack and jump to the label specified by n if the value is less than zero.
 * [tab][line-feed]: Exit a subroutine and return control to the location from which the subroutine was called.
 * [line-feed][line-feed]: Exit the program.
 *
 * Notes
 *
 * Division and modulo
 *
 * Whitespace expects floored division and modulo
 *
 * In Javascript and Coffeescript, the modulus operator is implemented differently than it was in the original Whitespace interpreter. Whitespace was influenced by having been originally implemented in Haskell. Javascript and Coffeescript also lack integer division operations. You need to pay a little extra attention in regard to the implementation of integer division and the modulus operator (See: floored division in the Wikipedia article "Modulo operation"
 * Java defines methods for floor division and modulo in Math class. The methods differ from the traditional / and % operators.
 * There is no difference between Whitespace and Python in regard to the standard implementation of integer division and modulo operations.
 */
function whitespace(code, input) {
    if (!code) throw "Invalid input";

    const output = []
        , heap = {}
        , labels = {}
        , instructions = code.split("")
        , getNext = function() {
        let next = ""
        while (
        next !== " " && next !== "\n" && next != "\t" && i < instructions.length
            ) {
            next = instructions[i++]
        }
        return next
    }
        , getNumber = function() {
        const sign = getNext() === "\t" ? -1 : +1, digits = []
        for (let char = getNext(); char !== "\n"; char = getNext())
            digits.push(char === " " ? 0 : 1)
        return sign *
            digits.reduce(
                function(val, digit, i, digits) {
                    return val + digit * Math.pow(2, digits.length - i - 1)
                },
                0
            )
    }
        , getInputNumber = function() {
        const tmp = input.split("\n")
        input = tmp.slice(1).join("\n")
        if (tmp[0].length === 0) throw "Empty input"
        return tmp[0]
    }
        , getInputChar = function() {
        if (input.length === 0) throw "Empty input"
        const c = input.charAt(0)
        input = input.slice(1)
        return c
    }
        , getLabel = function() {
        let label = "", next = getNext()
        while (next !== "\n")
            (label += next), (next = getNext())
        return label + "\n"
    }
        , findLabel = function(label) {
        if (labels[label]) throw "Repeated label"
        const fullLabel = "\n  " + label
        let labelPos = code.indexOf(fullLabel, i)
        if (labelPos < 0) labelPos = code.indexOf(fullLabel)
        if (labelPos < 0) throw "Label not found"
        labels[label] = labelPos + fullLabel.length
    }
        , stackManipulation = function () {
        instr = getNext()
        if (instr === " ") {
            // Read number
            stack.push(getNumber())
        } else if (instr === "\t") {
            instr2 = getNext()
            if (instr2 === " ") {
                // Duplicate the nth value from the top of the stack
                n = getNumber(), v = stack[stack.length - n - 1]
                if (v === undefined) throw "Invalid stack access"
                stack.push(v)
            } else if (instr2 === "\n") {
                // Discard the top n values below the top of the stack from the stack
                // For n < 0 or n >= stack.length, remove everything but the top value
                n = getNumber(), top = stack.slice(-1)
                if (n < 0 || n >= stack.length) stack = top
                else stack = stack.slice(0, stack.length - n - 1).concat(top)
            }
        } else if (instr === "\n") {
            instr2 = getNext()
            if (instr2 === " ") {
                // Duplicate the top values of the stack
                v = stack.pop()
                if (v === undefined) throw "Empty stack"
                stack.push(v)
                stack.push(v)
            } else if (instr2 === "\t") {
                // Swap the top two values on the stack
                const v1 = stack.pop(), v2 = stack.pop()
                if (v1 === undefined || v2 === undefined) throw "Empty stack"
                stack.push(v1)
                stack.push(v2)
            } else if (instr2 === "\n") {
                // Discard the top value on the stack
                v = stack.pop()
                if (v === undefined) throw "Empty stack"
            }
        }
    }
        , flowControl = function () {
        instr1 = getNext(), instr2 = getNext()
        // Mark a location in the program with label n
        if (instr1 === " " && instr2 === " ") {
            n = getLabel()
            if (labels[n]) throw "Repeated label"
            labels[n] = i
        } else if (instr1 === " " && instr2 === "\t") {
            // Call a subroutine with the location specified by label n
            n = getLabel()
            if (labels[n] === undefined) findLabel(n)
            if (labels[n] === undefined) throw "Invalid label"
            lastPos = i
            i = labels[n]
        } else if (instr1 === " " && instr2 === "\n") {
            // Jump unconditionally to the position specified by label n
            n = getLabel()
            if (labels[n] === undefined) findLabel(n)
            if (labels[n] === undefined) throw "Invalid label"
            i = labels[n]
        } else if (instr1 === "\t" && instr2 === " ") {
            // Pop a value off the stack and jump to the label specified by n if the value is zero
            a = stack.pop(), n = getLabel()
            if (a === undefined) throw "Empty stack"
            if (a === 0) {
                if (labels[n] === undefined) findLabel(n)
                if (labels[n] === undefined) throw "Invalid label"
                i = labels[n]
            }
        } else if (instr1 === "\t" && instr2 === "\t") {
            // Pop a value off the stack and jump to the label specified by n if the value is less than zero
            a = stack.pop(), n = getLabel()
            if (a === undefined) throw "Empty stack"
            if (a < 0) {
                if (labels[n] === undefined) findLabel(n)
                if (labels[n] === undefined) throw "Invalid label"
                i = labels[n]
            }
        } else if (instr1 === "\t" && instr2 === "\n") {
            // Exit a subroutine and return control to the location from which the subroutine was called
            i = lastPos
            lastPos = -1
        } else if (instr1 === "\n" && instr2 === "\n") {
            // Exit the program
            exitStack = true
        } else
            throw "Invalid command"
    }
        , arithmetic = function () {
        a = stack.pop(), b = stack.pop()
        if (a === undefined || b === undefined) throw "Empty stack"
        instr1 = getNext(), instr2 = getNext()
        if (instr1 === " " && instr2 === " ")
            stack.push(a + b)
        else if (instr1 === " " && instr2 === "\t")
            stack.push(b - a)
        else if (instr1 === " " && instr2 === "\n")
            stack.push(a * b)
        else if (instr1 === "\t" && instr2 === " ") {
            if (a === 0) throw "Division by zero"
            stack.push(Math.floor(b / a))
        } else if (instr1 === "\t" && instr2 === "\t") {
            if (a === 0) throw "Modulo by zero"
            const res = b - a * Math.floor(b / a) // See definition of the floored division
            stack.push((a < 0 ? -1 : 1) * Math.abs(res))
        }
    }
        , heapAccess = function () {
        instr = getNext()
        if (instr === " ") {
            // Pop a and b, then store a at heap address b
            a = stack.pop(), b = stack.pop()
            if (a === undefined || b === undefined) throw "Empty stack"
            heap[b] = a
        } else if (instr === "\t") {
            // Pop a and then push the value at heap address a
            a = stack.pop()
            if (a === undefined) throw "Empty stack"
            v = heap[a]
            if (v === undefined) throw "Invalid address"
            stack.push(v)
        }
    }
        , inputOutput = function () {
        instr1 = getNext(), instr2 = getNext()
        // Pop a value off the stack and output it as a character
        if (instr1 === " " && instr2 === " ") {
            v = stack.pop()
            if (v === undefined) throw "Empty stack"
            output.push(String.fromCharCode(v))
        } else if (instr1 === " " && instr2 === "\t") {
            // Pop a value off the stack and output it as a number
            v = stack.pop()
            if (v === undefined) throw "Empty stack"
            output.push(v)
        } else if (instr1 === "\t" && instr2 === " ") {
            v = getInputChar(), b = stack.pop()
            if (b === undefined) throw "Empty stack"
            heap[b] = v.charCodeAt(0)
        } else if (instr1 === "\t" && instr2 === "\t") {
            a = getInputNumber(), b = stack.pop()
            if (b === undefined) throw "Empty stack"
            heap[b] = a
        }
    }

    let stack = []
        , i = 0
        , lastPos = -1
        , exitStack = false
        , instr
        , instr1
        , instr2
        , n
        , v
        , a

    while (!exitStack) {
        const impression = getNext()
        if (impression === "") {
            throw "Program exit not found"
        }
        switch (impression) {
            case " ":
                stackManipulation()
                break

            case "\n":
                flowControl()
                break

            case "\t":
                switch (getNext()) {
                    case " ":
                        arithmetic()
                        break
                    case "\t":
                        heapAccess()
                        break
                    case "\n":
                        inputOutput()
                        break
                }
                break
        }
    }

    return output.join("")
}

