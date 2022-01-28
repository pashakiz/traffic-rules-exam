import React from 'react';
import classNames from 'classnames';
import Question from './Question';
import Result from './Result';
import {connect} from 'react-redux';

class ContentNumbers extends React.Component {

    state = {
        isQuestion: false,
        isResult: false,
        ticketNum: 0,
        chosenTopicNums: [],
        isHelp: true,
        checkedQuestions: [],
        checkedTicked: null,
        timerData: null,
        timeOut: false,
        isSaveToLocalStorage: true,
        localStorage: window.localStorage
    };

    handleRestart = () => {
        this.setState({
            isQuestion: false,
            isResult: false,
            ticketNum: 0,
            checkedQuestions: [],
            checkedTicked: null,
            isSaveToLocalStorage: true,
            localStorage: window.localStorage
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

        if (this.props.appActive.tab === 'tabNumbers' && !this.state.isQuestion && !this.state.isResult) {
            let buttons = [];
            for (let i=1; i<=20; i++) {
                let i20 = i+20;
                let i40 = i+40;
                let i60 = i+60;
                buttons.push(
                    <tr key={i}>
                        <td className="cardstable__td">
                            <button className={classNames(
                                        'btn btn1 btn_ticket',
                                        { 'correct': (this.state.localStorage.getItem('ticket'+i) === 'true') },
                                        { 'wrong': (this.state.localStorage.getItem('ticket'+i) === 'false') }
                                    )}
                                    onClick={this.handleClick.bind(this, i)}>Билет №{i}</button>
                        </td>
                        <td className="cardstable__td">
                            <button className={classNames(
                                        'btn btn1 btn_ticket',
                                        { 'correct': (this.state.localStorage.getItem('ticket'+i20) === 'true') },
                                        { 'wrong': (this.state.localStorage.getItem('ticket'+i20) === 'false') }
                                    )}
                                    onClick={this.handleClick.bind(this, i20)}>Билет №{i20}</button>
                        </td>
                        <td className="cardstable__td">
                            <button className={classNames(
                                        'btn btn1 btn_ticket',
                                        { 'correct': (this.state.localStorage.getItem('ticket'+i40) === 'true') },
                                        { 'wrong': (this.state.localStorage.getItem('ticket'+i40) === 'false') }
                                    )}
                                    onClick={this.handleClick.bind(this, i40)}>Билет №{i40}</button>
                        </td>
                        <td className="cardstable__td">
                            <button className={classNames(
                                        'btn btn1 btn_ticket',
                                        { 'correct': (this.state.localStorage.getItem('ticket'+i60) === 'true') },
                                        { 'wrong': (this.state.localStorage.getItem('ticket'+i60) === 'false') }
                                    )}
                                    onClick={this.handleClick.bind(this, i60)}>Билет №{i60}</button>
                        </td>
                    </tr>
                );
            }

            body = (
                <div className="exam__cardstable">
                    <table className="cardstable">
                        <tbody>
                            {buttons}
                        </tbody>
                    </table>
                    <div className="exam__footer d-flex justify-content-center align-items-center">
                        <button className="btn btn_clear" onClick={this.handleClickClearLocalStorage}>Очистить историю ответов</button>
                    </div>
                </div>
            );
        }

        return(
            <div className="exam__content exam__content_numbers active">
                {body}
            </div>
        )
    }

    handleClickClearLocalStorage = () => {
        let allTicketsCount = Object.keys(this.props.cards).length;
        for (let i = 1; i <= allTicketsCount; i++) {
            window.localStorage.removeItem('ticket'+i);
        }
        this.setState({
            localStorage: window.localStorage
        });
    };

    handleClick = (i) => {
        this.setState({
            isQuestion: true,
            ticketNum: i
        });
    }

}

function mapStateToProps(state) {
    return {
        appActive: state.appActive,
        cards: state.cards
    };
}

export default connect(mapStateToProps)(ContentNumbers);
