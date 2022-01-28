import React from 'react';
import classNames from 'classnames';
import {globalConst} from '../global-const';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //this.props.handleClickOpenQuestion(num);

    render() {
        let paginationHtml = [];
        let checkedQuestions = this.props.checkedQuestions;
        let allCount = this.props.allCount;
        let maxI = globalConst.QUESTIONS_PER_TICKET;
        let current = this.props.questionNum+1;

        if (allCount > maxI) { //topics
            for (let i = 1; i <= maxI; i++) {
                if (i === 1) { //1
                    paginationHtml.push(
                        <button className={classNames('btn btn__pagination',
                                { active: (i === current) },
                                { correct: (checkedQuestions[i-1] === true) },
                                { wrong: (checkedQuestions[i-1] !== true && checkedQuestions[i-1] !== null) },
                                { wide: (i > 99) },
                            )}
                            key={i} onClick={(i !== current) ? ()=>this.props.handleClickOpenQuestion(i-1) : function(){} }>{i}</button>
                    );
                } else if (i === maxI) { //20
                    paginationHtml.push(
                        <button className={classNames('btn btn__pagination c20th',
                                { active: (allCount === current) },
                                { correct: (checkedQuestions[allCount-1] === true) },
                                { wrong: (checkedQuestions[allCount-1] !== true && checkedQuestions[allCount-1] !== null) },
                                { wide: (allCount > 99) },
                            )}
                            key={i} onClick={(allCount !== current) ? ()=>this.props.handleClickOpenQuestion(allCount-1) : function(){} }>{allCount}</button>
                    );
                } else if (i === maxI-1) { //19
                    if (current >= allCount-10) {
                        let iBeforeLast = allCount-1;
                        paginationHtml.push(
                            <button className={classNames('btn btn__pagination c19th',
                                    { active: (iBeforeLast === current) },
                                    { correct: (checkedQuestions[iBeforeLast-1] === true) },
                                    { wrong: (checkedQuestions[iBeforeLast-1] !== true && checkedQuestions[iBeforeLast-1] !== null) },
                                    { wide: (iBeforeLast > 99) },
                                )}
                                key={i} onClick={(iBeforeLast !== current) ? ()=>this.props.handleClickOpenQuestion(iBeforeLast-1) : function(){} }>{iBeforeLast}</button>
                        );
                    } else {
                        paginationHtml.push(
                            <button className='btn btn__pagination c19th' key={i}
                                    onClick={()=>this.props.handleClickOpenQuestion((current+9)-1)}>...</button>
                        );
                    }
                } else if (i === 2) { //2
                    if (current < maxI-9) {
                        paginationHtml.push(
                            <button className={classNames('btn btn__pagination',
                                    { active: (i === current) },
                                    { correct: (checkedQuestions[i-1] === true) },
                                    { wrong: (checkedQuestions[i-1] !== true && checkedQuestions[i-1] !== null) },
                                    { wide: (i > 99) },
                                )}
                                key={i} onClick={(i !== current) ? ()=>this.props.handleClickOpenQuestion(i-1) : function(){} }>{i}</button>
                        );
                    } else {
                        paginationHtml.push(
                            <button className='btn btn__pagination' key={i}
                                    onClick={()=>this.props.handleClickOpenQuestion((current-9)-1)}>...</button>
                        );
                    }
                } else if (current > maxI-10) {
                    if (current < allCount-10) {
                        let diff = current - (maxI-10);
                        let iDiff = i + diff;
                        paginationHtml.push(
                            <button className={classNames('btn btn__pagination',
                                    { active: (iDiff === current) },
                                    { correct: (checkedQuestions[iDiff-1] === true) },
                                    { wrong: (checkedQuestions[iDiff-1] !== true && checkedQuestions[iDiff-1] !== null) },
                                    { wide: (iDiff > 99) },
                                )}
                                key={i} onClick={(iDiff !== current) ? ()=>this.props.handleClickOpenQuestion(iDiff-1) : function(){} }>{iDiff}</button>
                        );
                    } else {
                        let decr = allCount - maxI;
                        let iLastRow = i + decr;
                        paginationHtml.push(
                            <button className={classNames('btn btn__pagination',
                                    { active: (iLastRow === current) },
                                    { correct: (checkedQuestions[iLastRow-1] === true) },
                                    { wrong: (checkedQuestions[iLastRow-1] !== true && checkedQuestions[iLastRow-1] !== null) },
                                    { wide: (iLastRow > 99) },
                                )}
                                key={i} onClick={(iLastRow !== current) ? ()=>this.props.handleClickOpenQuestion(iLastRow-1) : function(){} }>{iLastRow}</button>
                        );
                    }
                } else {
                    paginationHtml.push(
                        <button className={classNames('btn btn__pagination',
                                { active: (i === current) },
                                { correct: (checkedQuestions[i-1] === true) },
                                { wrong: (checkedQuestions[i-1] !== true && checkedQuestions[i-1] !== null) },
                                { wide: (i > 99) },
                            )}
                            key={i} onClick={(i !== current) ? ()=>this.props.handleClickOpenQuestion(i-1) : function(){} }>{i}</button>
                    );
                }
            }
        } else { //tickets
            let steps = 0;
            allCount < maxI ? steps = allCount : steps = maxI;
            for (let i = 1; i <= steps; i++) {
                paginationHtml.push(
                    <button className={classNames('btn btn__pagination',
                            { active: (i === current) },
                            { correct: (checkedQuestions[i-1] === true) },
                            { wrong: (checkedQuestions[i-1] !== true && checkedQuestions[i-1] !== null) },
                            { wide: (i > 99) },
                        )}
                        key={i} onClick={(i !== current) ? ()=>this.props.handleClickOpenQuestion(i-1) : function(){} }>{i}</button>
                );
            }
        }


        return(
            <div className="exam__pagination">
                {paginationHtml}
            </div>
        );
    }
}