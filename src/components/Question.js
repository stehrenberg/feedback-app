import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import AnswerInput from '../components/AnswerInput';
import CardMessage from '../components/CardMessage';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showHelp: false,
        };
    }

    render() {
        const {id, label, help} = this.props;

        return (
            <div className="Question">
                <CardMessage show={ this.state.showHelp }
                             direction="right"
                             position="fixed"
                             title="What this means..."
                             text={ help } />
                <Tooltip id="tooltip" title="Click for explanation" placement="top">
                    <label id={ id }
                           onClick={ this.handleClick }
                           onMouseOut={ this.handleMouseOut }>
                        { label }
                    </label>
                </Tooltip>
                <AnswerInput {...this.props}/>
            </div>
        );
    };

    handleClick = () => this.setState({showHelp: true});

    handleMouseOut = () => setTimeout(() => this.setState({showHelp: false}), 400);
}



export default Question;