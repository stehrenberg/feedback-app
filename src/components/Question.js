import React from 'react';
import AnswerInput from '../components/AnswerInput';
import CardMessage from '../components/CardMessage';

class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showHelp: false,
        };
    }

    render = () => {
        const {id, label, help} = this.props;

        return (
            <div className="Question">
                <CardMessage show={ this.state.showHelp }
                             direction="left"
                             title="What this means..."
                             text={ help } />
                <label id={ id }
                       onClick={ this.handleClick }
                       onMouseOut={ this.handleMouseOut }>
                    {label }
                </label>
                <AnswerInput {...this.props}/>
            </div>
        );
    };

    handleClick = () => this.setState({showHelp: true});

    handleMouseOut = () => setTimeout(() => this.setState({showHelp: false}), 400);
}

export default Question;