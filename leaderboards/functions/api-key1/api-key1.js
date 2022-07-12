// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

import axios from 'axios'

export const handler = async (event) => {
  console.log(event.data)
  const KEY_VALUE1 = process.env.KEY_VALUE1
  const urlTrending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY_VALUE1}`

  try {
    const { data } = await axios.get(urlTrending)
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

