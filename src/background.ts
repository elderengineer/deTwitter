import { Constants } from './constants'



function createRedirectUrl(urlString: string): string {
  const server = window.localStorage.getItem(Constants.SERVER_KEY) || Constants.NWITTERS_INSTANCES[0]
  const url = new URL(urlString)
  if (url.host.startsWith('pbs.')) {
    return `https://${server}/pic/${encodeURIComponent(url.href)}`
  } else if (url.host.startsWith('video.')) {
    return `https://${server}/gif/${encodeURIComponent(url.href)}`
  }
  url.host = server
  return url.toString()
}

const urlFilter = Constants.TWITTER_SERVERS.map(
  s => "*://" + s + "/*"
)

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      const enabled = window.localStorage.getItem(Constants.ENABLED_KEY)

      if (enabled && details.url != null) {
        return {redirectUrl: createRedirectUrl(details.url)};
      }
    },
    {
        urls: urlFilter,
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);
