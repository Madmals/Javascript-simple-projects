import url from 'url'
import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
axios.defaults.baseURL = 'http://localhost:5000'

const router = express.Router()


//env var
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req, res) => {
	{
		try {
			const param = new URLSearchParams({
				[API_KEY_NAME]: API_KEY_VALUE,
				...url.parse(req.url, true).query,})
			console.log(param)
				const apiRes = await axios(`${API_BASE_URL}?${param}`)

				const data = await apiRes.data
				res.status(200).json(data)


			if (process.env.NODE_ENV !== 'development') {
				console.log(`sending....: ${API_BASE_URL}?${param}`)
			}
		} catch (error) {
			res.status(500).json(error)
		}
	}
})

export default router