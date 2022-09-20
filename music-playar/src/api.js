import { createEl } from "./utils.js"
import { getSingleDoc } from "./firebase.js";

export let data2 = [];
const getSearchResult = async () => {
    const searchVal = document.querySelector('.search')
    try {
        const res = await fetch(`https://musicget.onrender.com/searchResult/${searchVal.value}`)
    const data = await res.json()
    if (data.hasOwnProperty('items')) {

        const result = {
            vidId: data.items[0].id.videoId,
            vidTitle: data.items[0].snippet.title
        }
        return result

    } else {
        return data.videoid
    }
        
    } catch (error) {
     throw new Error('failed to search')   
    }

}

const getSTranscribeResult = async (videoId) => {
    try {
    if (videoId == '') {
        data2 = []
        const { defaultText: elementText, defaultTimestamp: convertStartTimestamp, defaultPlayerTime: elementStart } = await getSingleDoc()
        createEl(convertStartTimestamp, elementText)
        data2.push(elementStart, convertStartTimestamp)

    } else if (typeof videoId == 'object') {
        data2 = []
        const { convertStartTimestamp, elementStart, elementText } = videoId
        createEl(convertStartTimestamp, elementText)
        data2.push(elementStart, convertStartTimestamp)
    }

    else {
        data2 = []
        document.querySelector('tr').innerHTML = `<iframe src="https://giphy.com/embed/l3nWhI38IWDofyDrW" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/thinking-l3nWhI38IWDofyDrW">via GIPHY</a></p>`

        const res = await fetch(`https://musicget.onrender.com/getTranscribe/${videoId}`)
        const data = await res.json()

        document.querySelector('tr').innerHTML = ``
        const { convertStartTimestamp, elementStart, elementText } = data

        const all = document.querySelectorAll('.time')
        if (Array.from(all).length > 0) {
            return
        }else{
                    createEl(convertStartTimestamp, elementText)
                    data2.push(elementStart, convertStartTimestamp)

        }

        return { convertStartTimestamp, elementText, elementStart }

    }
        
    } catch (error) {
     throw new Error('failed to get transcribe')   
    }


}

export { getSearchResult, getSTranscribeResult }

