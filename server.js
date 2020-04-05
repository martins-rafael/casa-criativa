const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const db = require('./db')

server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))
nunjucks.configure('views', {
    express: server,
    noCache: true
})

server.get('/', (req, res) => {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send('Ops! Erro no banco de dados')
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render('index.html', { ideas: lastIdeas })

    })


})

server.get('/ideas', (req, res) => {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

    const reversedIdeas = [...rows].reverse()

    return res.render('ideas.html', { ideas: reversedIdeas })
    })
})

server.post('/', (req, res) => {
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return res.send('Erro no banco de dados')
        }

        return res.redirect('/ideas')
    })
})

server.listen(3000)