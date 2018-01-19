import cachedResolver from '../cached_resolver'

export const tracks = cachedResolver('https://api.listenbrainz.org/1/user/inhji/listens', data => {
  const listens = data.payload.listens
  return listens.map(l => {
    return {
      artist: l.track_metadata.artist_name,
      track: l.track_metadata.track_name,
      listenedAt: l.listened_at
    }
  })
})
