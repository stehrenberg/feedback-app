import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import {addKudosPoints} from '../actions';
import {config} from '../config/config';

import SurveyForm from '../components/SurveyForm';
import withTheme from "@material-ui/core/es/styles/withTheme";
import * as theme from "material-ui";

class QuestionStepper extends React.Component {
    state = {
        activeStep: 0,
        allDone: false,
    };

    handleClick = (stepIndex) => {
        this.setState({
            activeStep: stepIndex,
            ignoreMouseEnter: true,
        });
        setTimeout(this.setState({ ignoreMouseEnter: false }), 2000);
    };

    handleSubmit = (onSubmit, stepIndex) => {
        onSubmit();
        this.handleClick(stepIndex + 1);
    };

    handleLastStep = (event) => {
        this.props.dispatch(addKudosPoints(config.kudosPoints.todo));
        this.setState({allDone: true});
    };

    render() {
        const {classes, onChange, onSubmit, history} = this.props;
        const steps = this.getSteps();
        const {main, light} = this.props.theme.palette.primary;

        return (
            <React.Fragment>
                <Stepper activeStep={ this.state.activeStep } orientation="vertical">
                    { steps.map((label, index) => {
                        return (
                            <Step key={ label }
                                  onMouseEnter={ () => {
                                      if (!this.state.allDone && !this.state.ignoreMouseEnter) {
                                          this.setState({ ignoreMouseEnter: true });
                                          setTimeout(() => this.handleClick(index), 200);
                                      }
                                  }}
                                  onClick={ () => this.handleClick(index) }>
                                <StepLabel className="QuestionStepperLabel">{ label }</StepLabel>
                                <StepContent>
                                    { this.getStepContent(index, {...this.props}) }
                                </StepContent>
                            </Step>
                        );
                    })}
                    { this.state.activeStep == steps.length && <span>All done!</span> }
                </Stepper>
                <div className={ classes.typoRoot }>
                    {
                        this.state.allDone && <Typography className={ classes.typography }>
                            { "All done - thanks for your feedback! 😊" }
                        </Typography>
                    }
                </div>
                <HomeIcon className="nav-back-icon"
                          onClick={ () => history.push('/home') }/>
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
                    onSubmit={ (onSubmit) => this.handleSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 1:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["3", "4"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ (onSubmit) => this.handleSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 2:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["5", "6", "7", "8"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ (onSubmit) => this.handleSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 3:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => ["9", "10"].includes(question.id)) }
                    onChange={ onChange }
                    onSubmit={ (onSubmit) => this.handleSubmit }
                    isReadOnly={ isReadOnly }
                />;
            case 4:
                return <SurveyForm
                    surveyId={ surveyId }
                    questions={ questions.filter((question) => question.id === "11") }
                    onChange={ onChange }
                    onClick={ (event) => this.handleLastStep(event) }
                    onSubmit={ (onSubmit) => this.handleSubmit }
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
    typography: {
        width: '70%',
        paddingTop: '30px',
        margin: '30px',
        borderTop: '1px solid #cecece',
        fontSize: 16,
        fontWeight: 450,
        color: '#888888',

        textAlign: 'center'
    },
    typoRoot: {
        display: 'flex',
        height: 100,
        justifyContent: 'center',
    },
});

export default withStyles(styles)(withTheme()(QuestionStepper));