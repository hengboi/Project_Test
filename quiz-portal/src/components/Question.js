import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { store } from '../store';
import Nav from './Nav';
function getQuestionData(number) {
    return fetch(`${process.env.REACT_APP_APIURL}/question/${number}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log(error));
};
function validateQuestionData(number, answer) {
    return fetch(`${process.env.REACT_APP_APIURL}/question/validate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number, answer }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
};
export default function Question() {
    const { state, dispatch } = useContext(store);
    const [cstate, setCState] = useState({
        submitted: false,
        error: '',
        loading: false
    });
    let history = useHistory();
    let { number } = useParams();
    useEffect(() => {
        getQuestionData(number).then(data => {
            dispatch({ type: 'SET_QUESTION_TEXT', payload: data });
        });
    }, []);
    const handleChange = (evt) => {
        dispatch({ type: 'SET_QUESTION_ANSWER', payload: evt.target.value });
    }
    const handleValidate = () => {
        if (!state.question.ans) {
            setCState({ ...cstate, submitted: true, error: 'Please answer the question first' });
            return;
        };
        setCState({ ...cstate, submitted: false, error: '', loading: true });
        validateQuestionData(number, state.question.ans).then(res => {
            setCState({ ...cstate, submitted: false, error: '', loading: false });
            history.push(`/subquestions/${number}`);
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
                        <div class="form-row">
                            <div class="form-group col-md-10 text-left">
                                <label>{state.question.text}</label>
                                <input type="text" class="form-control" value={state.question.ans} onChange={handleChange} placeholder="Answer" />
                                <div class="form-text error">
                                    {cstate.error}
                                </div>
                            </div>
                            <div class="form-group col-md-2" style={{ marginTop: 31 }}>
                                <button type="button" class="btn btn-primary" disabled={cstate.loading} onClick={handleValidate}>Enter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}