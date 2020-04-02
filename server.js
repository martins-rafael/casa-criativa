const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

const ideas = [
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729036.svg',
        title: 'Cursos de Programação',
        category: 'Estudo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A vel nisi distinctio aliquam, ullam',
        url: '#'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729005.svg',
        title: 'Exercícios',
        category: 'Saúde',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A vel nisi distinctio aliquam, ullam',
        url: '#'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729027.svg',
        title: 'Meditação',
        category: 'Saúde',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A vel nisi distinctio aliquam, ullam',
        url: '#'
    },
    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729001.svg',
        title: 'Leitura',
        category: 'Lazer',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A vel nisi distinctio aliquam, ullam',
        url: '#'
    }
]

server.use(express.static('public'))
nunjucks.configure('views', {
    express:server,
    noCache: true
})

server.get('/', (req, res) => {

    const reversedIdeas = [...ideas].reverse()
    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return res.render('index.html', {ideas: lastIdeas})
})

server.get('/ideas', (req, res) => {
    const reversedIdeas = [...ideas].reverse()

    return res.render('ideas.html', {ideas: reversedIdeas})
})

server.listen(3000)