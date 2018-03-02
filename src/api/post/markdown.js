import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import twemoji from 'twemoji'
import checkbox from 'markdown-it-checkbox'
import hljs from 'hljs'

const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (__) {}
  }

  return '' // use external default escaping
}

const md = MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight
})

md.use(emoji, {
  shortcuts: {
    angry: ['>:('],
    blush: [':")'],
    confused: [':/'],
    cry: ["':,("],
    frowning: [':('],
    heart: ['<3'],
    joy: [":'D"],
    laughing: [':D'],
    rage: [':@'],
    open_mouth: [':o', ':O'],
    sob: [":'("],
    stuck_out_tongue: [':p'],
    sweat_smile: ["':)"],
    unamused: [':s'],
    wink: [';)']
  }
})

md.renderer.rules.emoji = function (token, idx) {
  return twemoji.parse(token[idx].content, (icon, options, variant) => {
    return `https://api.inhji.de/assets/emoji/${icon}.png`
  })
}

md.use(checkbox, { divWrap: true, divClass: 'check' })

export default md
