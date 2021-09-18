import React, { createContext, useReducer } from 'react';

const initialState = {
    catalogue: [],
    question: {
        text: '',
        ans: ''
    },
    subquestions: [],
    digitalquestion: {}
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "SET_CATALOGUE":
                return {
                    ...state,
                    catalogue: action.payload
                }
            case "SET_QUESTION_TEXT":
                return {
                    ...state,
                    question: {
                        ...state.question,
                        text: action.payload
                    }
                }
            case "SET_QUESTION_ANSWER":
                return {
                    ...state,
                    question: {
                        ...state.question,
                        ans: action.payload
                    }
                }
            case "SET_SUB_QUESTIONS":
                const data = [...state.subquestions];
                const new_data = action.payload;
                for (let i = 0; i < new_data.length; i++) {
                    const index = data.findIndex(x => x.number == new_data[i].number);
                    if (index != -1) {
                        new_data[i].answer = data[index].answer;
                    }

                }
                return {
                    ...state,
                    subquestions: new_data
                }
            case "SET_SUB_QUESTION_ANSWER":
                const { number, answer } = action.payload;
                const questions = [...state.subquestions];
                const index = questions.findIndex(x => x.number == number);
                questions[index].answer = answer;
                return {
                    ...state,
                    subquestions: questions
                }
            case "SET_DIGITAL_QUESTION_TEXT":
                return {
                    ...state,
                    digitalquestion: {
                        ...state.digitalquestion,
                        text: action.payload
                    }
                }
            case "SET_DIGITAL_QUESTION_ANSWER":
                return {
                    ...state,
                    digitalquestion: {
                        ...state.digitalquestion,
                        ans: action.payload
                    }
                }
            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }