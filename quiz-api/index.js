const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
const {
  getMainQuestionByNumber, validateMainQuestion, getSubQuestionsByNumber, validateSubQuestions, getDigitalQuestionByNumber, validateDigitalQuestion, getReward
} = require('./questions');
const { getData } = require('./table');

app.get('/catalogue', (req, res) => {
  const ques = getData();
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('No catalogue found');
});

app.get('/question/:number', (req, res) => {
  const ques = getMainQuestionByNumber(req.params.number);
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('No question found');
});
app.post('/question/validate', (req, res) => {
  console.log(req.body);
  const ques = validateMainQuestion(req.body.number, req.body.answer);
  if (ques) {
    return res.json({ success: true });
  }
  return res.status(400).send('Invalid answer');
});
app.get('/question/:number/subquestions', (req, res) => {
  const ques = getSubQuestionsByNumber(req.params.number);
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('No sub question found');
});
app.post('/question/:number/subquestions/validate', (req, res) => {
  const ques = validateSubQuestions(req.body.number, req.body.answers);
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('Invalid answers');
});
app.get('/question/:number/digitalquestion', (req, res) => {
  const ques = getDigitalQuestionByNumber(req.params.number);
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('No digital question found');
});
app.post('/question/:number/digitalquestion/validate', (req, res) => {
  const ques = validateDigitalQuestion(req.body.number, req.body.answer);
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('Invalid answer');
});
app.post('/reward/:number', (req, res) => {
  const ques = getReward(req.body.number, req.body.main_ans, req.body.sub_ans, req.body.dig_ans);
  if (ques) {
    return res.json(ques);
  }
  return res.status(400).send('Invalid answer');
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening`)
});