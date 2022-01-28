import React from 'react';
import Timer from './Timer';
import Pagination from './Pagination';
import {connect} from 'react-redux';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isQuestionTrue: null, //null, true, false
            checkedQuestions: this.props.checkedQuestions, //[num][true/false]
            checkedAnswer: null,
            questionNum: 0, //default first question of ticket
            answerBtnDisabled: true,
            isHelpShown: false,
            timerData: null,
            timeOut: false
        };
    }

    getTimerData = (timerData, timeOut) => {
        this.setState({ timerData: timerData, timeOut: timeOut});
    };

    render() {
        const noImage = 'assets/img/noimage.png';
        const thisQuestionId = this.props.allQuestions[this.state.questionNum];
        const thisQuestion = this.props.questions[thisQuestionId];
        const checkedQuestions = this.state.checkedQuestions;

        let helpBtn = '';
        let helpHtml = '';
        if (this.props.isHelp && thisQuestion.help) {
            let helpHtmlClasses = 'exam-prompt';
            let helpHtmlRes = '';
            if (checkedQuestions[this.state.questionNum] === true) {
                helpHtmlRes = 'Правильно';
                helpHtmlClasses = 'exam-prompt correct';
            }
            if (checkedQuestions[this.state.questionNum] !== true && checkedQuestions[this.state.questionNum] !== null) {
                helpHtmlRes = 'Ошибка';
                helpHtmlClasses = 'exam-prompt wrong';
            }
            let helpHtmlRow = checkedQuestions[this.state.questionNum] !== null ? <div className="exam-prompt__res">{helpHtmlRes}</div> : '';
            helpBtn = (
                <button className="exam-prompt-btn" onClick={this.handleClickHelp}>Подсказка</button>
            );
            if (this.state.isHelpShown) {
                helpHtml = (
                    <div className={helpHtmlClasses}>
                        <div className="exam-prompt__info">
                            {helpHtmlRow}
                            <div className="exam-prompt__text">{thisQuestion.help}</div>
                        </div>
                    </div>
                );
            }
        }

        let answersHtml = [];
        for (let i = 0; i < thisQuestion.answer.length; i++) {
            let answerId = 'q'+thisQuestionId+'-a'+(i+1);
            let answerName = 'q'+thisQuestionId;

            if (checkedQuestions[this.state.questionNum] === null) {
                //unanswered
                answersHtml.push(
                    <div className="custom-control custom-radio" key={answerId}>
                        <input type="radio" id={answerId}
                               className="custom-control-input"
                               name={answerName} value={i}
                               checked={this.state.checkedAnswer === i}
                               onChange={(e) => this.handleClickLabelAnswer(e)}/>
                        <label className="custom-control-label" htmlFor={answerId}>{thisQuestion.answer[i]}</label>
                    </div>
                );
            } else {
                //answered
                if (checkedQuestions[this.state.questionNum] === true) {
                    //correct
                    if (i === thisQuestion.answerTrue) {
                        //highlight correct answer
                        answersHtml.push(
                            <div className="custom-control custom-radio correct" key={answerId}>
                                <input type="radio" id={answerId} className="custom-control-input"
                                       name={answerName} value={i} disabled="disabled"
                                       checked={this.state.checkedAnswer === null ? true : (this.state.checkedAnswer === i)}/>
                                <label className="custom-control-label" htmlFor={answerId}>{thisQuestion.answer[i]}</label>
                            </div>
                        );
                    } else {
                        //other answers not highlighted
                        answersHtml.push(
                            <div className="custom-control custom-radio" key={answerId}>
                                <input type="radio" id={answerId} className="custom-control-input"
                                       name={answerName} value={i} disabled="disabled"
                                       checked={this.state.checkedAnswer === null ? false : (this.state.checkedAnswer === i)}/>
                                <label className="custom-control-label" htmlFor={answerId}>{thisQuestion.answer[i]}</label>
                            </div>
                        );
                    }
                } else if (checkedQuestions[this.state.questionNum] !== true && checkedQuestions[this.state.questionNum] !== null) {
                    //wrong
                    if (i === checkedQuestions[this.state.questionNum]) {
                        //highlight wrong answer
                        answersHtml.push(
                            <div className="custom-control custom-radio wrong" key={answerId}>
                                <input type="radio" id={answerId} className="custom-control-input"
                                       name={answerName} value={i} disabled="disabled"
                                       checked={this.state.checkedAnswer === null ? true : (this.state.checkedAnswer === i)}/>
                                <label className="custom-control-label" htmlFor={answerId}>{thisQuestion.answer[i]}</label>
                            </div>
                        );
                    } else if (i === thisQuestion.answerTrue) {
                        //highlight correct answer
                        answersHtml.push(
                            <div className="custom-control custom-radio correct" key={answerId}>
                                <input type="radio" id={answerId} className="custom-control-input"
                                       name={answerName} value={i} disabled="disabled"
                                       checked={this.state.checkedAnswer === null ? false : (this.state.checkedAnswer === i)}/>
                                <label className="custom-control-label" htmlFor={answerId}>{thisQuestion.answer[i]}</label>
                            </div>
                        );
                    } else {
                        //other answers not highlighted
                        answersHtml.push(
                            <div className="custom-control custom-radio" key={answerId}>
                                <input type="radio" id={answerId}
                                       className="custom-control-input"
                                       name={answerName} value={i} disabled="disabled"
                                       checked={this.state.checkedAnswer === null ? false : (this.state.checkedAnswer === i)}/>
                                <label className="custom-control-label" htmlFor={answerId}>{thisQuestion.answer[i]}</label>
                            </div>
                        );
                    }
                }
            }
        }

        let timerClasses = 'examtimer';
        if (this.state.timeOut) {
            timerClasses = 'examtimer examtimer_overrun';
        }

        let questionTitle = '';
        let timerHtml = '';
        if (this.props.examMode === 'ticket') {

            questionTitle = (
                <div className="exam-question__title d-flex justify-content-between align-items-start">
                    <div className="exam-question__titletxt">
                        <div className="exam-question__ticket-num">Билет №{this.props.ticketNum}</div>
                        <div className="exam-question__question-num">Вопрос {this.state.questionNum+1}</div>
                    </div>
                    <div className="exam__timer-mob">
                        <div className={timerClasses}>
                            {this.state.timerData}
                        </div>
                    </div>
                </div>
            );

            timerHtml = (
                <div className="exam__timer">
                    <Timer getTimerData={this.getTimerData} />
                </div>
            );

        } else if (this.props.examMode === 'topic') {
            questionTitle = '';
            timerHtml = '';
        }

        let btnNext = 'Пропустить';
        if (checkedQuestions[this.state.questionNum] !== null && checkedQuestions[this.state.questionNum] !== true) {
            btnNext = 'Продолжить';
        }

        return(
            <div className="exam-question">
                <div className="exam-question__header d-flex justify-content-between align-items-start">
                    <Pagination questionNum={this.state.questionNum}
                                allCount={this.props.allQuestions.length}
                                checkedQuestions={this.state.checkedQuestions}
                                handleClickOpenQuestion={this.handleClickOpenQuestion}/>
                    {timerHtml}
                </div>
                <div className="exam-question__body">
                    {questionTitle}
                    <div className="exam-question__img">
                        <img src={thisQuestion.img ? 'assets/' + thisQuestion.img : noImage} alt="" />
                    </div>
                    <div className="exam-question__text">{thisQuestion.text}</div>
                    <div className="exam-question__answers">
                        {answersHtml}
                    </div>
                </div>
                <div className="exam-question__footer">
                    <div className="d-sm-flex justify-content-between align-items-start">
                        <div className="exam-question__btns">
                            <button className="btn btn2 exam-question__btn exam-question__btn-submit"
                                    onClick={() => this.handleClickAnswerCheck(thisQuestionId, thisQuestion.answerTrue)}
                                    disabled={this.state.answerBtnDisabled}>Ответить</button>
                            <button className="btn btn3 exam-question__btn exam-question__btn-next"
                                    onClick={() => this.handleClickOpenQuestion(this.state.questionNum+1)}>{btnNext}</button>
                        </div>
                        {helpBtn}
                    </div>
                    {helpHtml}
                </div>
            </div>
        )
    }

    handleClickOpenQuestion = (num) => {
        if(num <= this.props.allQuestions.length-1) {
            this.setState({
                questionNum: num,
                isHelpShown: false,
                checkedAnswer: null
            });
        }
    };

    handleClickLabelAnswer = (changeEvent) => this.setState({
        answerBtnDisabled: false,
        checkedAnswer: +changeEvent.target.value
    });

    handleClickHelp = () => this.setState({
        isHelpShown: !this.state.isHelpShown
    });

    handleClickAnswerCheck = (thisQuestionId, answerTrue) => {
        let isAnswerTrue = null;
        let checkedQuestions = this.state.checkedQuestions;

        if(this.state.checkedAnswer === answerTrue) {
            isAnswerTrue = true;
        } else {
            isAnswerTrue = this.state.checkedAnswer;
        }

        checkedQuestions[this.state.questionNum] = isAnswerTrue;

        this.setState({
            checkedQuestions: checkedQuestions,
            answerBtnDisabled: true
        });

        if (isAnswerTrue === true) {
            this.handleClickOpenQuestion(this.state.questionNum+1);
        }

        this.checkTicketFinished();
    };

    checkTicketFinished() {
        let count = 0;
        for (let i = 0; i < this.state.checkedQuestions.length; i++){
            if (this.state.checkedQuestions[i] !== null) {
                count++;
            }
        }

        if (count === this.state.checkedQuestions.length) {
            //ticked end
            if (this.props.examMode === 'ticket') {
                this.props.getQuestionData(this.props.ticketNum, this.state.checkedQuestions, this.state.timerData, this.state.timeOut);
            } else if (this.props.examMode === 'topic') {
                this.props.getQuestionData(this.props.chosenTopicNums, this.state.checkedQuestions, this.state.timerData, this.state.timeOut);
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions
    };
}

export default connect(mapStateToProps)(Question);
