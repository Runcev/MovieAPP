const fs = require('fs')

const getDataFromFile = function () {
    let data;
    try {
        data = fs.readFileSync('server/utils/moviesData.txt')
    } catch (err) {
        console.error(err)
    }

    const regex = [/Title: (.+)/g, /Release Year: (.+)/g, /Format: (.+)/g, /Stars: (.+)/g]

    let clearData = []

    for (let i = 0; i < regex.length; i++) {
        let groupByField = data.toString().match(regex[i])
        //console.log(groupByField)
        let withoutRegex = regex[i].toString().replace(/[/(.+)g]/g, '')
        for (let j = 0; j < groupByField.length; j++) {
            groupByField[j] = (groupByField[j].replace(withoutRegex, ''))
        }
        clearData.push(groupByField)
    }

    //console.log(clearData)

    return clearData;
}

module.exports =  {getDataFromFile}