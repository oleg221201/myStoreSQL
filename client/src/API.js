import axios from 'axios'

export default axios.create({
    baseURL: 'https://mystoresql.herokuapp.com/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})

// baseURL: 'http://localhost:4000/',