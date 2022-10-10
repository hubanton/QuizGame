import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import openTriviaClient from "../APIs/openTrivia";
import { GameContext } from "../Context/GameContextProvider";

export default function StartPage() {

    const { settings, setSettings } = useContext(GameContext)

    //Used to route to game
    const navigate = useNavigate()

    const [categories, setCategories] = useState()

    useEffect(() => {
        let isMounted = true
        async function fetchData() {
            try {
                const response
                    = await openTriviaClient.get("/api_category.php")
                let result = response.data.trivia_categories
                if (isMounted) {
                    setCategories(result)
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
        // Remove mount if component is closed
        return () => (isMounted = false)
    }, [])

    function changePage(event) {
        event.preventDefault()
        navigate("/QuizGame/game")
    }

    function handleChange(event) {
        const { name, value } = event.target

        if (name === "amount") {
            if (value < 1 || value > 12) {
                return
            }
        }

        if (name === "category") {
            let int_value = parseInt(value)
            setSettings(prevSettings => {
                return {
                    ...prevSettings,
                    category: value,
                    category_name: categories.find(e => e.id === int_value).name
                }
            })
        } else {
            setSettings(prevSettings => {
                return {
                    ...prevSettings,
                    [name]: value
                }
            })
        }

    }

    return <div>
        <h1><b>Welcome to the Quiz Game!</b></h1>
        <h6>Select your desired configurations below</h6>
        {categories && <form onSubmit={changePage}>
            <div className="mb-3 mt-5">
                <label htmlFor="questionAmount" className="form-label">How many questions?</label>
                <input onChange={handleChange} type="number" value={settings.amount} className="form-control" name="amount" id="questionAmount" />
            </div>

            <label htmlFor="category" className="form-label">Which Category?</label>
            <br />
            <select
                id="category"
                value={settings.category}
                onChange={handleChange}
                name="category"
                className="form-control mb-3"
            >
                {categories.map(item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                })}
            </select>
            <label htmlFor="difficulty" className="form-label">Desired Difficulty</label>
            <br />
            <select
                id="difficulty"
                value={settings.difficulty}
                onChange={handleChange}
                name="difficulty"
                className="form-control mb-3"
            >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button className="btn btn-primary">Start Game</button>
        </form>}
    </div>
}