import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import SurveyForm from '../components/SurveyForm';

class QuestionStepper extends React.Component {
    state = {
        activeStep: 0,
    };

    handleClick = (stepIndex) => {
        this.setState({
            activeStep: stepIndex,
        });
    };

    render() {
        const { classes, onChange, onSubmit } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <Stepper activeStep={ activeStep } orientation="vertical">
                    { steps.map((label, index) => {
                        return (
                            <Step key={ label } onClick={ () => this.handleClick(index) }>
                                <StepLabel className="QuestionStepperLabel">{ label }</StepLabel>
                                <StepContent>
                                    { this.getStepContent(index, {...this.props}) }
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </React.Fragment>
        );
    }

    getSteps = () => {
        return ['Basic metrics', 'Contract basics', 'Inspect & Adapt', 'Next Iteration', 'NPS'];
    };

    getStepContent = (step, {surveyId, questions, onChange, onSubmit, isReadOnly}) => {
        switch (step) {
            case 0:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["0", "1", "2"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ onSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 1:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["3", "4"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ onSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 2:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["5", "6", "7", "8"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ onSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 3:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["9", "10"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ onSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 4:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => question.id === "11") }
                    onChange={ onChange }
                    onSubmit={ onSubmit }
                    isReadOnly={ isReadOnly }
                />;
            default:
                return 'Unknown step';
        }
    };
}

QuestionStepper.propTypes = {
    classes: PropTypes.object,
};

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: 20,
    },
    resetContainer: {
        padding: 30,
    },
});

export default withStyles(styles)(QuestionStepper);