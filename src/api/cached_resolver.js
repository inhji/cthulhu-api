import fetch from 'node-fetch'

export default function cachedResolver (url, transformer, cacheTimeInMins = 10) {
  let items = []
  let lastFetchTask
  let lastFetchTime = new Date(1970, 0, 1)

  return function () {
    if (lastFetchTask) {
      return lastFetchTask
    }

    if (new Date() - lastFetchTime > 1000 * 60 * cacheTimeInMins /* 10 mins */) {
      lastFetchTime = new Date()
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then(data => {
          items = transformer(data)

          lastFetchTask = null
          return items
        })
        .catch(err => {
          lastFetchTask = null
          throw err
        })

      if (items.length) {
        return items
      }

      return lastFetchTask
    }

    return items
  }
}
