const fs = require('fs')

const getDataFromFile = function () {
    let data;
    try {
        data = fs.readFileSync('server/utils/moviesData.txt')
        //data = fs.readFileSync('moviesData.txt')
    } catch (err) {
        console.error(err)
    }

    const regex = [/Title: (.+)/g, /Release Year: (.+)/g, /Format: (.+)/g, /Stars: (.+)/g]

    let clearData = []

    for (let i = 0; i < regex.length; i++) {
        let groupByField = data.toString().match(regex[i])
        let withoutRegex = regex[i].toString().replace(/[/(.+)g]/g, '')

        for (let j = 0; j < groupByField.length; j++) {
            groupByField[j] = (groupByField[j].replace(withoutRegex, ''))
        }

        clearData.push(groupByField)
    }

    let obj = {}
    let set = new Set();
    let clearDataWithoutRepeat = JSON.parse(JSON.stringify(clearData));

    for(let i = 0; i < clearData[0].length; i++){
        obj[i] = {
            title: clearData[0][i],
            releaseYear: clearData[1][i],
            format: clearData[2][i],
            stars: clearData[3][i],
        }

        if(set.has(JSON.stringify(obj[i]))){
           clearDataWithoutRepeat[0].splice(i,1);
           clearDataWithoutRepeat[1].splice(i,1);
           clearDataWithoutRepeat[2].splice(i,1);
           clearDataWithoutRepeat[3].splice(i,1)
        }
        set.add(JSON.stringify(obj[i]))

    }

    return clearDataWithoutRepeat;
}

getDataFromFile()

module.exports =  {getDataFromFile}