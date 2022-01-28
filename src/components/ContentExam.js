import React from 'react';
import Question from './Question';
import Result from './Result';
import {connect} from 'react-redux';

class ContentExam extends React.Component {

    state = {
        isQuestion: false,
        isResult: false,
        ticketNum: 0,
        chosenTopicNums: [],
        isHelp: false,
        checkedQuestions: [],
        checkedTicked: null,
        isSaveToLocalStorage: false
    };

    handleRestart = () => {
        this.setState({
            isQuestion: false,
            isResult: false,
            ticketNum: 0,
            checkedQuestions: [],
            checkedTicked: null,
            isSaveToLocalStorage: false
        });
    };

    getQuestionData = (checkedTicked, checkedQuestions, timerData, timeOut) => {
        this.setState({
            isResult: true,
            checkedQuestions: checkedQuestions,
            checkedTicked: checkedTicked,
            timerData: timerData,
            timeOut: timeOut
        });
    };

    render() {
        let body = '';
        if (this.state.isQuestion && this.state.ticketNum>0) {
            let allQuestions = this.props.cards['c'+this.state.ticketNum];
            let checkedQuestions = [];
            for (let i = 0; i < allQuestions.length; i++) {
                checkedQuestions.push(null);
            }
            body = <Question examMode={this.props.appActive.examMode}
                             chosenTopicNums={this.state.chosenTopicNums}
                             ticketNum={this.state.ticketNum}
                             allQuestions={allQuestions}
                             checkedQuestions={checkedQuestions}
                             getQuestionData={this.getQuestionData}
                             isHelp={this.state.isHelp}/>;
        }

        if (this.state.isResult && this.state.checkedQuestions.length) {
            body = <Result examMode={this.props.appActive.examMode}
                           checkedQuestions={this.state.checkedQuestions}
                           checkedTicked={this.state.checkedTicked}
                           handleRestart={this.handleRestart.bind(this)}
                           timerData={this.state.timerData}
                           timeOut={this.state.timeOut}
                           isSaveToLocalStorage={this.state.isSaveToLocalStorage}/>;
        }

        if (this.props.appActive.tab === 'tabExam' && !this.state.isQuestion && !this.state.isResult ) {
            body = (
                <div className="exam__random">
                    <p>На экзамен даётся 20 минут.<br/>Внимательно читайте каждый вопрос и все варианты ответов.<br/>Не торопитесь. Удачи!</p>
                    <button className="btn btn2 btn_start" onClick={this.handleClick}>НАЧАТЬ</button>
                </div>
            );
        }

        return(
            <div className="exam__content exam__content_exam active">
                {body}
            </div>
        )
    }

    randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    handleClick = () => {
        let allTicketsCount = Object.keys(this.props.cards).length;
        let num = this.randomInteger(1, allTicketsCount);
        this.setState({
            isQuestion: true,
            ticketNum: num
        });
    }
}

function mapStateToProps(state) {
    return {
        appActive: state.appActive,
        cards: state.cards
    };
}

export default connect(mapStateToProps)(ContentExam);