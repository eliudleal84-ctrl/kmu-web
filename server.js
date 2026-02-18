const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Force use of library engine by setting PRISMA_CLI_QUERY_ENGINE_TYPE environment variable
process.env.PRISMA_CLI_QUERY_ENGINE_TYPE = 'library';
process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library';

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = process.env.PORT || 3000

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
