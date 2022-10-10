import QuizCard from "../Components/QuizCard"
import openTriviaClient from "../APIs/openTrivia"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { nanoid } from 'nanoid'
import { GameContext } from "../Context/GameContextProvider";
export default function MainGame() {

    const [questions, setQuestions] = useState([])


    const {settings} = useContext(GameContext)

    const navigate = useNavigate()

    const [sumbitted, setSubmitted] = useState(false)

    const [reloadData, setReloadData] = useState(false)

    function submitAnswers() {
        setSubmitted(true)
    }

    function handleAnswerChange(id, answer) {
        let shallowCopy = [...questions]

        let relevantQuestion = shallowCopy.find(e => e.key === id)
        relevantQuestion.right_answer = (relevantQuestion.correct_answer === answer)
        shallowCopy[id] = relevantQuestion

        setQuestions(shallowCopy)
    }

    function shuffleArray(incorrect_answers, correct_answer) {
        let array = [...incorrect_answers]
        array.push(correct_answer)
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    function newGame() {
        //fetchData()
        setSubmitted(false)
        setReloadData(!reloadData)
    }

    
    useEffect(() => {
        async function fetchData() {
            try {
                const response
                    = await openTriviaClient.get("/api.php?",
                        {
                            params: {
                                amount: settings.amount,
                                category: settings.category,
                                difficulty: settings.difficulty
                            }
                        }
                    )
                let results = response.data.results
                let mappedQuestions = results.map(item => {
                    return {
                        category: item.category,
                        question: item.question,
                        incorrect_answers: item.incorrect_answers,
                        correct_answer: item.correct_answer,
                        all_answers: shuffleArray(item.incorrect_answers, item.correct_answer),
                        key: nanoid(),
                        right_answer: false
                    }
                })
                setQuestions(mappedQuestions)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [settings, reloadData])



    return <div>
        <h1><b>QUIZ</b></h1>
        <h3>How many questions can you get right?</h3>
        <h5>Category: <span style={{color: "white"}}>{settings.category_name}</span></h5>
        <h5>Difficulty: <span style={{color: "white"}}>{settings.difficulty === "" ? "MIXED" : settings.difficulty.toUpperCase()}</span></h5>
        <div className="card-container">
            {questions.map(item => {
                return <QuizCard key={item.key} question={item} updateAnswers={handleAnswerChange} submitted={sumbitted} />
            })}
        </div>
        {sumbitted ?
            <div>
                <p style={{color: "white", fontWeight: "bolder"}}>
                    Out of <b>{questions.length}</b> Questions you've answered <b style={{color:"lightgreen"}}>{questions.filter(e => e.right_answer === true).length}</b> correctly    
                </p>
                <button className="btn btn-secondary m-3" onClick={() => {navigate("/QuizGame")}}>Change Settings</button>
                <button className="btn btn-info m-3" onClick={() => {newGame()}}>Play Again</button>
            </div>
            :
            <button className="btn btn-outline-light" onClick={submitAnswers}>Submit Answers</button>

        }
    </div>
}