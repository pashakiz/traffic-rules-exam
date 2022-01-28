import React from 'react';
import ContentExam from './ContentExam';
import ContentNumbers from './ContentNumbers';
import ContentTopics from './ContentTopics';
import {connect} from 'react-redux';

class TabContent extends React.Component {
    render() {

        let body = '';
        if (this.props.appActive.tab === 'tabExam') {
            body = (
                <ContentExam />
            );
        }
        if (this.props.appActive.tab === 'tabNumbers') {
            body = (
                <ContentNumbers />
            );
        }
        if (this.props.appActive.tab === 'tabTopics') {
            body = (
                <ContentTopics />
            );
        }

        return (
            <div className="exam__content-box">
                {body}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        appActive: state.appActive
    };
}

export default connect(mapStateToProps)(TabContent);