/**
 * The problem
 *
 * In this kata, you're going write a function called pointInPoly to test if a point is inside
 * a polygon.
 *
 * Points will be represented as [x,y] arrays.
 *
 * The polygon will be an array of points which are the polygon's vertices.
 * The last point in the array connects back to the first point.
 *
 * You can assume:
 *
 * The polygon will be a valid simple polygon. That is, it will have at least three points,
 * none of its edges will cross each other, and exactly two edges will meet at each vertex.
 * In the tests, the point will never fall exactly on an edge of the polygon.
 */
let pointsIntersect = function (yi, y, yj, x, xj, xi) {
    return ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
}

function pointInPoly(polygon, point) {
    const [x, y] = point
    let j = polygon.length - 1

    return polygon.reduce((inside, el, i) => {
        const [xi, yi] = el, [xj, yj] = polygon[j]
        j = i++
        return pointsIntersect(yi, y, yj, x, xj, xi) ? !inside : inside
    }, false)
}
