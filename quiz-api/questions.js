const questions = require('./questions.json');

const getMainQuestionByNumber = (number) => {
    const ques = questions.find(x => x.number == number);
    if (ques) {
        return ques.main_question.ques;
    }
    return "";
}
const validateMainQuestion = (number, answer) => {
    const ques = questions.find(x => x.number == number);
    if (ques && ques.main_question.ans.toLowerCase().trim() == answer.toLowerCase().trim()) {
        return true;
    }
    return false;
}
const getSubQuestionsByNumber = (number) => {
    const ques = questions.find(x => x.number == number);
    if (ques) {
        return ques.sub_questions.map(x => new Object({ number: x.number, ques: x.ques }));
    }
    return [];
}
const validateSubQuestions = (number, answers) => {
    const ques = questions.find(x => x.number == number);
    let value = false;
    if (!ques) {
        return value;
    }
    for (let i = 0; i < ques.sub_questions.length; i++) {
        const sub_ques = answers.find(x => x.number == ques.sub_questions[i].number);
        if (!sub_ques) {
            value = false;
            break;
        }
        if (ques.sub_questions[i].ans.toLowerCase().trim() !== sub_ques.answer.toLowerCase().trim()) {
            value = false;
            break;
        }
        else {
            value = true;
        }
    }
    return value;
}
const getDigitalQuestionByNumber = (number) => {
    const ques = questions.find(x => x.number == number);
    if (ques) {
        return ques.digital_question.ques;
    }
    return "";
}
const validateDigitalQuestion = (number, answer) => {
    const ques = questions.find(x => x.number == number);
    if (ques && ques.digital_question.ans.toLowerCase().trim() == answer.toLowerCase().trim()) {
        return true;
    }
    return false;
}
const getReward = (number, main_ans, sub_ans, dig_ans) => {
    const ques = questions.find(x => x.number == number);
    if (ques) {
        if (validateMainQuestion(number, main_ans)) {
            if (validateSubQuestions(number, sub_ans)) {
                if (validateDigitalQuestion(number, dig_ans)) {
                    return { success: true, reward: ques.reward.url };
                }
                else {
                    return { success: false, error: 'Previous question answers are invalid' }
                }
            }
            else {
                return { success: false, error: 'Previous question answers are invalid' }
            }
        }
        else {
            return { success: false, error: 'Previous question answers are invalid' }
        }

    }
     return { success: false, error: 'Previous question answers are invalid' };
}

module.exports = {
    getMainQuestionByNumber,
    validateMainQuestion,
    getSubQuestionsByNumber,
    validateSubQuestions,
    getDigitalQuestionByNumber,
    validateDigitalQuestion,
    getReward
}