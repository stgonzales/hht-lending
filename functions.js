const remote = require('electron').remote
const app = remote.app
const docPath = app.getPath("documents")


module.exports.saveData = function(obj){
    const data = fs.readFileSync(docPath + '\\data.csv','utf-8')
    console.log(data);
    console.log(obj);        
    return data
}

module.exports.readDataFile = function(){

    const data = fs.readFileSync(docPath + '\\data.csv','utf-8')
    const table = data.split('\n').slice(1)

    let dataArray = []
    let tempObj = {}

    table.forEach(row=>{
        const columns = row.split(',')
        tempObj.date = columns[0]
        tempObj.hht = columns[1]
        tempObj.user = columns[2]
        tempObj.moviment = columns[3]

        dataArray.push(tempObj)
    })

    console.log(JSON.stringify(dataArray));
    
    return JSON.stringify(dataArray)
}