//proxy server using express
import express from 'express'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

const app = express()


const port = process.env.PORT || 5000

//yolo
app.use('/api', async (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	//allow origin from browser port
	// res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500")

	res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Accept,X-Requested-With");

	//allow method of http 

	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

	try {
		// get request url from browser
		req.url = req.originalUrl

		const resData = await axios.get(`https://www.coincalculators.io/api?name=ethereum&${req.url}`)
		const allData = await resData.data
		res.send(allData)

		res.status(200)

	} catch (error) {
		throw error
	}
})


//static element to render 
app.use(express.static('public'))

app.listen(port, () => console.log(`listening ${port}`))










