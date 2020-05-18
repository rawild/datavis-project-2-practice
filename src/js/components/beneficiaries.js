import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';
import Header from './header.js';


export default class Beneficiaries extends Component {
    constructor() {
        super({
            store,
            element: d3.select("#beneficiaries"),
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
    render(text) {
        let self = this;
        let div = self.element.append("div")
        let header = new Header(div)
        header.render("Who Benefits?")
        self.element.append("div")
            .text("$100 million is a lot of money. Where is it going? Who has \"earned\" it?")
    }
   
    
}