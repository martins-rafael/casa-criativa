const squlite3 = require('sqlite3').verbose()
const db = new squlite3.Database('./ws.db')

db.serialize(function () {
    // Criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)

    // // Inserir dados
    // const query = `
    // INSERT INTO ideas(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);
    // `

    // const values = [
    //     "https://image.flaticon.com/icons/svg/2729/2729036.svg",
    //     "Cursos de Programação",
    //     "Estudo",
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. A vel nisi distinctio aliquam, ullam",
    //     "#"
    // ]

    // db.run(query, values, function(err) {
    //     if (err) return console.log(err)

    //     console.log(this)
    // })

    // // Consultar dados
    // db.all(`SELECT * FROM ideas`, function(err, rows) {
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })
})

module.exports = db