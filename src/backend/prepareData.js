module.exports = rows => {

    return new Promise((resolve, reject) => {
        try {
            const words = rows.filter(filterValidRows)
                                .map(removePonctuation)
                                .map(removeTags)
                                .reduce(mergeRows)
                                .split(' ')
                                .map(word => word.toLowerCase())
                                .map(word => word.replace('"',''))
            resolve(words)
        } catch(error) {
            reject(error)
        }
    })
}

function filterValidRows(row) {
    const notNumber = !parseInt(row.trim())
    const notEmpty = !!row.trim()
    const notInterval = !row.includes('-->')

    return notNumber && notEmpty && notInterval
}

const removePonctuation = row => row.replace(/[|,?!.-]/g,'')
const removeTags = row => row.replace(/(<[^>]+)>/ig,'').trim()
const mergeRows = (fullText, row) => `${fullText} ${row}`