import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';

export default class DonorBar extends Component {
    constructor() {
        super({
            store,
            key: "summary"
        });
        this.local = { 
            format: d3.format(",." + d3.precisionFixed(1) + "f"),
        }
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        /* Get the donor bar chart data*/ 

    }
   
    
}