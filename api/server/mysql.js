var mysql = require('mysql')

const options = {
        host: 'localhost',
        user: 'root',
        password: 'rootserver',
        database: 'vacations'
    }


var connection = mysql.createConnection(options)

connection.connect()

module.exports = connection