const fs = require('fs')
const Mux = require('@mux/mux-node')
const { log, info, error, warn, success } = require('./log')

const { Video, Data } = new Mux()
const PAGE_SIZE = process.env.PAGE_SIZE || undefined
const FILENAME = process.env.FILENAME || 'playback_ids.json'

async function getPage(page) {
  return Video.Assets.list({ limit: PAGE_SIZE, page })
}

async function getAllAssets(page = 1, assets = []) {
  const resp = await getPage(page)
  if (!resp) throw new Error('Expected getPage to have a response')
  if (resp.length) {
    log(`Found ${resp.length} assets for page ${page}`)
    assets = assets.concat(resp)
    page += 1
    return getAllAssets(page, assets)
  } else {
    return assets
  }
}

function writeFile(json) {
  return new Promise((resolve, reject) => {
    fs.writeFile(FILENAME, JSON.stringify(json, null, 2), err => {
      if (err) return reject(error)
      resolve(FILENAME)
    })
  })
}

async function main() {
  const assets = await getAllAssets()
  info(`Found all ${assets.length} assets`)
  const playbacksJson = {}
  assets.forEach(asset => {
    asset.playback_ids.forEach(playbackId => {
      playbacksJson[playbackId.id] = asset.id
    })
  })
  const fileName = await writeFile(playbacksJson)
  success(`Done, see file ${fileName}`)
}

;(async () => {
  try {
    main()
  } catch (e) {
    error('Error running script', e)
    process.exit(1)
  }
})()
