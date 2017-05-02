/**
 * As breadcrumb menùs are quite popular today, I won't digress much on
 * explaining them, leaving the wiki link to do all the dirty work in my place.
 *
 * What might not be so trivial is instead to get a decent breadcrumb from your
 * current url. For this kata, your purpose is to create a function that takes
 * a url, strips the first part (labelling it always HOME) and then builds it
 * making each element but the last a <a> element linking to the relevant path;
 * last has to be a <span> element getting the active class.
 *
 * All elements need to be turned to uppercase and separated by a separator,
 * given as the second parameter of the function; the last element can terminate
 * in some common extension like .html, .htm, .php or .asp; if the name of
 * the last element is index.something, you treat it as if it wasn't there,
 * sending users automatically to the upper level folder.
 *
 * A few examples can be more helpful than thousands of words of explanation,
 * so here you have them:
 *
 * generateBC("mysite.com/pictures/holidays.html", " : ") == '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>'
 * generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>'
 * generateBC("www.microsoft.com/docs/index.htm", " * ") == '<a href="/">HOME</a> * <span class="active">DOCS</span>'
 * Seems easy enough?
 *
 * Well, probably not so much, but we have one last extra rule: if one element
 * (other than the root/home) is longer than 30 characters, you have to shorten it,
 * acronymizing it (i.e.: taking just the initials of every word);
 * url will be always given in the format this-is-an-element-of-the-url
 * and you should ignore words in this array while acronymizing:
 * ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"];
 * a url composed of more words separated by - and equal or less than
 * 30 characters long needs to be just uppercased with hyphens replaced by spaces.
 *
 *
 * Ignore anchors (www.url.com#lameAnchorExample) and
 * parameters (www.url.com?codewars=rocks&pippi=rocksToo) when present.
 *
 * Examples:
 *
 * generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") == '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
 * generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>'
 * You will always be provided valid url to webpages in common formats,
 * so you probably shouldn't bother validating them.
 */
function parseUrl(url) {
    let httpRegExp = /(http(s?)):\/\//gi
        , urlParts = url.replace(httpRegExp, '').replace(/\/$/, '').split('/')
        , fileExtRegExp = /\.(htm|html|php|asp)/i

    if (!urlParts[urlParts.length - 1].length) {
        urlParts.splice(0, 1)
    }
    if (urlParts[urlParts.length - 1].indexOf('index') === 0) {
        urlParts.splice(urlParts.length - 1, 1)
    }
    if (fileExtRegExp.test(urlParts[urlParts.length - 1])) {
        urlParts[urlParts.length - 1] = urlParts[urlParts.length - 1].split('.')[0]
    }
    if (urlParts[urlParts.length - 1].split('?').length) {
        urlParts[urlParts.length - 1] = urlParts[urlParts.length - 1].split('?')[0]
    }
    if (urlParts[urlParts.length - 1].split('#').length) {
        urlParts[urlParts.length - 1] = urlParts[urlParts.length - 1].split('#')[0]
    }
    if (urlParts.length >= 1) {
        urlParts.splice(0, 1)
    }

    return urlParts;
}

function getFullPath(i, urlParts) {
    let path = []
    for (let j = 0; j <= i; j++) {
        path.push(urlParts[j])
    }
    return path.join('/');
}

function generateBC(url, separator) {

    let urlParts = parseUrl(url)
        , bcParts = urlParts.length ? ['<a href="/">HOME</a>'] : ['<span class="active">HOME</span>']
        , skip = ["THE", "OF", "IN", "FROM", "BY", "WITH", "AND", "OR", "FOR", "TO", "AT", "A"]

    urlParts.forEach((el, i) => {
        let tag
            , pathStr = getFullPath(i, urlParts)
            , text

        text = el.toUpperCase().replace(/\-/g, ' ')
        if (text.length > 30) {
            text = text.split(' ')
                .filter(word => skip.indexOf(word) === -1)
                .map(curr => curr.charAt(0).toUpperCase()).join('')
        }

        tag = i < urlParts.length -1 && i != urlParts.length
            ? `<a href="/${pathStr}/">${text}</a>`
            : `<span class="active">${text}</span>`

        bcParts.push(tag)
    })

    return bcParts.join(`${separator}`)
}
