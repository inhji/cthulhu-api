import cachedResolver from '../cached_resolver'

const url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/'
const { STEAM_API_KEY, STEAM_ID } = process.env

function getImg (appId, hash) {
  return `http://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${hash}.jpg`
}

export const games = cachedResolver(
  `${url}?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`,
  data => {
    const games = data.response.games
    return games.map(g => {
      return {
        appId: g.appid,
        name: g.name,
        playtime2Weeks: g.playtime_2weeks,
        playtimeForever: g.playtime_forever,
        logo: getImg(g.appid, g.img_logo_url),
        icon: getImg(g.appid, g.img_icon_url)
      }
    })
  },
  60
)
