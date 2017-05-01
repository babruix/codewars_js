/**
 * Description:
 *
 * You are given a node that is the beginning of a linked list.
 * This list always contains a tail and a loop.
 *
 * Your objective is to determine the length of the loop.
 * Use the `getNext' method or 'next' property to get the following node.
 *
 * node.getNext()
 * node.next
 */
function countNodesInLoop(LoopNodes) {
    let count = 0
        , {firstNode, loopNode} = LoopNodes

    do {
        count++
        firstNode = firstNode.getNext()
    } while (firstNode !== loopNode)

    return count
}

function findLoopNode(node) {
    let firstNode = node
        , loopNode = node.getNext()

    while (firstNode !== loopNode) {
        firstNode = firstNode.getNext()
        loopNode = loopNode.getNext().getNext()
    }

    return {firstNode, loopNode}
}

let loop_size = (node) => countNodesInLoop(findLoopNode(node))
