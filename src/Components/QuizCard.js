import { useState } from "react";

export default function QuizCard(props) {
    let item = props.question

    const [currentAnswer, setCurrentAnswer] = useState("")

    function handleAnswerChange(answer) {
        setCurrentAnswer(answer)
        props.updateAnswers(item.key, answer)
    }

    function getButtonColor(e) {
        if (e === currentAnswer && item.right_answer) {
            return "btn-success"
        } else if(e === currentAnswer && !item.right_answer) {
            return "btn-danger"
        } else if(e !== currentAnswer && e === item.correct_answer) {
            return "btn-success"
        } else {
            return "btn-light"
        }
    }

    return <div className="card">
        <h5 dangerouslySetInnerHTML={{ __html: `${item.question}` }} />
        <div className="answer-group toggle" data-toggle="buttons">
            {props.submitted ?
                item.all_answers.map(e => {
                    return <button key={e} className={`btn btn-sm m-1 ${getButtonColor(e)}`}
                        dangerouslySetInnerHTML={{ __html: `${e}` }}/>


                }) 
                :
                item.all_answers.map(e => {
                    return <button key={e} className={`btn btn-sm btn-outline-light m-1 ${currentAnswer === e && "active"}`}
                        dangerouslySetInnerHTML={{ __html: `${e}` }} onClick={() => { handleAnswerChange(e) }} />


                })}


        </div>
    </div>
}
