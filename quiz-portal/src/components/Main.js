import React, { useContext, useEffect } from 'react';
import { store } from '../store';
import { useHistory } from "react-router-dom";
import Nav from './Nav';
function getCatalogueData() {
    return fetch(`${process.env.REACT_APP_APIURL}/catalogue`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch(error => console.log(error));
};
export default function Main() {
    const { state, dispatch } = useContext(store);
    let history = useHistory();
    useEffect(() => {
        getCatalogueData().then(data => {
            dispatch({ type: 'SET_CATALOGUE', payload: data });
        });
    }, []);
    const goToQuestion = (number) => {
        history.push(`/question/${number}`);
    }
    return (
        <div className="container text-center">
            <Nav/>
            <div class="row">
                {
                    state.catalogue.map(x => {
                        return (
                            <div key={x.number} class="col-sm-2">
                                <div className="card  catalogue-card" onClick={() => goToQuestion(x.number)}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <sup> {x.number}</sup>
                                            {x.symbol}
                                        </h5>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}