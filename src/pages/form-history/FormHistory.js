import { Component } from 'react';

class FormHistory extends Component {
    constructor(props) {
        this.state = {
            forms: [],
        }

        this.loadFormData();
    }

    render() {
        return (
            <div>
                { }
            </div>
        );
    }

    loadFormData() {
        localStorage.getItem()
    }
}

export default FormHistory;