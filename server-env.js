import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'
import express from 'express'

const resolve = (p) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)

const app = express()

// configure vite service
const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
})
app.use(vite.middlewares)

// static resource mapping in prod env
const manifest = {}

app.use('*', async (req, res, next) => {
  const url = req.originalUrl
  try {
    // get html template and rendering functions for different env
    let template, render

    template = fs.readFileSync(resolve('index.html'), 'utf-8')
    template = await vite.transformIndexHtml(url, template)
    render = (await vite.ssrLoadModule('/src/entry-server.js')).render

    const [appHtml, preloadLinks, piniaState, meta] = await render(url, manifest)

    // replace processed resources
    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--pinia-state-->`, piniaState)
      .replace(`<!--title-->`, meta.title || '')

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (error) {
    vite?.ssrFixStacktrace(error)
    next()
  }
})

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/')
})
