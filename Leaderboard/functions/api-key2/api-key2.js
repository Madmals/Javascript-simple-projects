// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

import axios from 'axios'

export const handler = async (event) => {
    console.log(event.data)
    const KEY_VALUE2 = process.env.KEY_VALUE2
    const urlTag = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_VALUE2}&language=en-US`
    try {
        const { data } = await axios.get(urlTag)
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (error) {
        const { status, statusText, headers, data } = error.response

        return {
            statusCode: status,
            body: JSON.stringify({ status, statusText, headers, data })
        }
    }
}

