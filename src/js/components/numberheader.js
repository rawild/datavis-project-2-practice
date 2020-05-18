import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';

export default class NumberHeader extends Component {
    constructor() {
        super({
            store,
            element: d3.select('#number-header'),
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

        self.element.append("div")
            .attr("class","number bottom")
            .text("$"+ self.local.format(store.state.summary.total_money) +" from "+ self.local.format(store.state.summary.total_donors) + " donors")
        self.element.append("div")
            .attr("class","number bottom")
            .text("to "+store.state.summary.total_candidates + " candidates")
        self.element.append("div")
            .attr("class","number bottom")
            .text("over 5 years")


    }
   
    
}