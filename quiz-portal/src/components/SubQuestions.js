import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { store } from '../store';
import Nav from './Nav';
function getSubQuestionData(number) {
    return fetch(`${process.env.REACT_APP_APIURL}/question/${number}/subquestions`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log(error));
};
function validateSubQuestionData(number, answers) {
    return fetch(`${process.env.REACT_APP_APIURL}/question/${number}/subquestions/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number, answers }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
};
export default function SubQuestion() {
    const { state, dispatch } = useContext(store);
    const [cstate, setCState] = useState({
        submitted: false,
        error: '',
        loading: false
    });
    let history = useHistory();
    let { number } = useParams();
    useEffect(() => {
        getSubQuestionData(number).then(data => {
            dispatch({ type: 'SET_SUB_QUESTIONS', payload: data });
        });
    }, []);
    const handleChange = (evt) => {
        dispatch({ type: 'SET_SUB_QUESTION_ANSWER', payload: { answer: evt.target.value, number: evt.target.name } });
    }
    const handleValidate = () => {
        setCState({ ...cstate, submitted: false, error: '', loading: true });
        validateSubQuestionData(number, state.subquestions).then(res => {
            setCState({ ...cstate, submitted: false, error: '', loading: false });
            history.push(`/digitalquestion/${number}`);
        }).catch(error => {
            setCState({ ...cstate, submitted: false, error: 'Invalid answer', loading: false });
        })
    }
    return (
        <div className="container text-center">
            <Nav/>
           <div className="row">
                <div className="col-md-6 text-center bg-white offset-md-3 mt-5 p-3 rounded">
                    <form>
                        {state.subquestions.map(x => {
                            return (
                                <div class="form-row">
                                    <div class="form-group text-left">
                                        <label>{x.number} - {x.ques}</label>
                                        <input type="text" class="form-control" name={x.number} value={x.answer} onChange={handleChange} placeholder="Answer" />
                                    </div>
                                </div>
                            )
                        })}
                        <div class="form-text text-left">{cstate.error}</div>
                        <br />
                        <button style={{ width: '100%' }} type="submit" class="btn btn-primary" disabled={cstate.loading} onClick={handleValidate}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}