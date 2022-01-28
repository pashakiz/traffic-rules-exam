import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: '00',
            sec: '00',
            timeout: false,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        let min = this.state.min;
        let sec = this.state.sec;
        let timeOut = this.state.timeout;

        if (+sec+1 > 59) {
            min++;
            if (+min < 10) { min='0'+min }
            if (+min >= 20) { timeOut = true }
            sec = '00';
        } else {
            sec++;
            if (+sec < 10) { sec='0'+sec }
        }

        this.setState({
            min: min,
            sec: sec,
            timeout: timeOut
        });

        this.props.getTimerData(this.state.min+':'+this.state.sec, this.state.timeout);
    }

    render() {
        let timerClasses = 'examtimer';
        if (this.state.timeout) {
            timerClasses = 'examtimer examtimer_overrun';
        }
        return (
            <div className={timerClasses}>
                {this.state.min}:{this.state.sec}
            </div>
        );
    }
}