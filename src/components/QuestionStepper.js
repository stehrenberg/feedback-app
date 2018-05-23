import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <React.Fragment>
                <Stepper activeStep={ activeStep } orientation="vertical">
                    { steps.map((label, index) => {
                        return (
                            <Step key={ label } onClick={ () => this.handleClick(index) }>
                                <StepLabel>{ label }</StepLabel>
                                <StepContent>
                                    { this.getStepContent(index)}
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                { this.state.activeStep === steps.length && (
                    <Paper square elevation={0} className={ classes.resetContainer }>
                        <Typography>All steps completed - you&quot;re finished</Typography>
                        <Button onClick={() => console.log("yay!")} className={ classes.button }>
                            Done!
                        </Button>
                    </Paper>
                )}
            </React.Fragment>
        );
    }


    getSteps = () => {
        return ['Basic metrics', 'Contract basics', 'Inspect & Adapt', 'Next Iteration', 'NPS'];
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <SurveyForm
                    surveyId={ this.props.id }
                    questions={ this.props.questions.filter((question) => ["0", "1", "2"].includes(question.id)) }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    isReadOnly={ this.props.isReadOnly }
                />;
            case 1:
                return <SurveyForm
                    surveyId={ this.props.id }
                    questions={ this.props.questions.filter((question) => ["3", "4"].includes(question.id)) }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    isReadOnly={ this.props.isReadOnly }
                />;
            case 2:
                return <SurveyForm
                    surveyId={ this.props.id }
                    questions={ this.props.questions.filter((question) => ["5", "6", "7", "8"].includes(question.id)) }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    isReadOnly={ this.props.isReadOnly }
                />;
            case 3:
                return <SurveyForm
                    surveyId={ this.props.id }
                    questions={ this.props.questions.filter((question) => ["9", "10"].includes(question.id)) }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    isReadOnly={ this.props.isReadOnly }
                />;
            case 4:
                return <SurveyForm
                    surveyId={ this.props.id }
                    questions={ this.props.questions.filter((question) => question.id === "11") }
                    onChange={ this.handleChange }
                    onSubmit={ this.handleSubmit }
                    isReadOnly={ this.props.isReadOnly }
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