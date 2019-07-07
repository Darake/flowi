const express = require('express')

const app = express()

app.use(express.static('build'))

app.get('/api', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('*', function(req, res) {
    res.sendFile('/build/index.html');
});

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)