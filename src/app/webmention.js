import fetch from 'node-fetch'

export async function sendWebmention(from, to) {
  await fetch(to)
  	.then(res => res.text())
  	.then(body => console.log(body));
}
