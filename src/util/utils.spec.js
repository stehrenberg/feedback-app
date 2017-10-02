import isMoment from 'moment';
import { momentFromSurveyId, normalizeProjectName} from './utils';

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

describe('Normalizing projectName by transforming projectName string to lowercase', () => {
    it('returns a normalized projectName from a mixed-case projectName string', () => {
        const normalizedProjectName = normalizeProjectName('TestProject');
        expect(/[A-Z]/.test(normalizedProjectName)).toBe(false);
    });

    it('returns a normalized projectName from a mixed-char projectName string', () => {
        const normalizedProjectName = normalizeProjectName('0Test-Pr0ject3');
        expect(/[A-Z]/.test(normalizedProjectName)).toBe(false);
    });

    it('returns an empty string for an empty projectName', () => {
        const normalizedProjectName = normalizeProjectName('');
        expect(normalizedProjectName === '').toBe(true);
    })
});
