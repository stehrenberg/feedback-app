import isMoment from 'moment';
import { momentFromSurveyId } from './utils';

describe('Testing transformation of surveyId to Moment object', () => {
    it('returns a valid Moment Obj from SurveyId', () => {
        const someSurveyId = '20171009-testproject';
        const result = momentFromSurveyId(someSurveyId);
        expect(isMoment(result)).toBeTruthy();
    });

    it('returns a valid Moment Obj from empty string', () => {
        const emptySurveyId = '';
        const result = momentFromSurveyId(emptySurveyId);
        expect(isMoment(result)).toBeTruthy();
    });

    it('returns invalid Moment Obj from invalid surveyId', () => {
        const invalidId = 'foo-Baa';
        const result = momentFromSurveyId(invalidId);
        console.log(result);
        expect(result.isValid()).toBe(false);
    });
});
