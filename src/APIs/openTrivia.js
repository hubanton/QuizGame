import axios from "axios"

const openTriviaClient = axios.create({
    baseURL: "https://opentdb.com"
})

export default openTriviaClient