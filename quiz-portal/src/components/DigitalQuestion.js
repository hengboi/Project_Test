import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { store } from '../store';
import Nav from './Nav';
function getDigitalQuestionData(number) {
    return fetch(`${process.env.REACT_APP_APIURL}/question/${number}/digitalquestion`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log(error));
};
function validateDigitalQuestionData(number, answer) {
    return fetch(`${process.env.REACT_APP_APIURL}/question/${number}/digitalquestion/validate`, {
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
function getReward(number, main_ans, sub_ans, dig_ans) {
    return fetch(`${process.env.REACT_APP_APIURL}/reward/${number}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number, main_ans, sub_ans, dig_ans }),
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
        loading: false,
        showReward: false
    });
    let history = useHistory();
    let { number } = useParams();
    useEffect(() => {
        getDigitalQuestionData(number).then(data => {
            dispatch({ type: 'SET_DIGITAL_QUESTION_TEXT', payload: data });
        });
    }, []);
    const handleChange = (evt) => {
        dispatch({ type: 'SET_DIGITAL_QUESTION_ANSWER', payload: evt.target.value });
    }
    const handleValidate = () => {
        if (!state.digitalquestion.ans) {
            setCState({ ...cstate, submitted: true, error: 'Invalid Pin' });
            return;
        };
        setCState({ ...cstate, submitted: false, error: '', loading: true, showReward: false });
        validateDigitalQuestionData(number, state.digitalquestion.ans).then(res => {
            setCState({ ...cstate, submitted: false, error: 'Success!. Please wait ...' });
            getReward(number, state.question.ans, state.subquestions, state.digitalquestion.ans).then(r => {
                if (r.success) {
                    setCState({ ...cstate, showReward: true, error: 'Download your reward', loading: false });
                    document.getElementById('downloadBtn').href = r.reward;
                    document.getElementById('downloadBtn').download = "gift.jpg";
                }
                else {
                    setCState({ ...cstate, showReward: false, error: r.error, loading: false });
                }

            }).catch(error => {
                setCState({ ...cstate, submitted: false, error: 'Some error occurred', loading: false, showReward: false });
            })

        }).catch(error => {
            setCState({ ...cstate, submitted: false, error: 'Invalid Pin', loading: false, showReward: false });
        })
    }
    return (
        <div className="container text-center">
            <Nav />
            <div className="row">
                <div className="col-md-6 text-center bg-white offset-md-3 mt-5 p-3 rounded">
                    <form>
                        <h3>{state.digitalquestion.text}</h3>
                        <h6>To download the file, you have to enter pin!</h6>
                        <br />
                        <div class="form-row text-left">
                            <div class="form-group col-md-9">
                                <input type="text" class="form-control" value={state.digitalquestion.ans} onChange={handleChange} placeholder="Answer" />
                                <div class="form-text error">
                                    {cstate.error}
                                </div>
                            </div>
                            <div class="form-group col-md-3">
                                <button type="button" class="btn btn-success" disabled={cstate.loading} onClick={handleValidate}>Confirm Pin</button>
                            </div>
                        </div>
                        {cstate.showReward && <div class="form-row">
                            <div class="col">
                                <h3 id="h3" className="text-center" style={{ color: "green" }}></h3>
                                <p className="text-center" id="p">To download the image, click the button below!</p>
                                <a class="btn btn-link btn-block" id="downloadBtn">
                                    Download <i class="fa fa-download" aria-hidden="true" style={{ fontSize: "18px" }}></i></a>
                            </div>
                        </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}