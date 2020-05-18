import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';
import scrollama from 'scrollama';
import 'intersection-observer';
import DonorTree from './donortree.js';
import QuartileTree from './quartiletree.js';

export default class CorruptScrolly extends Component {
    constructor() {
        super({
            store,
            element: d3.select('#corrupt-scrolly'),
        });
        this.local = { 
        }
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {

        let self = this;
        var donorScrolly = self.element
        var figure = donorScrolly.select("figure");
        var donorArticle = donorScrolly.select("article");
        var step = donorArticle.selectAll(".step");

        let scroller = scrollama();
        // setup the instance, pass callback functions
        setupStickyfill();

        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        handleResize();

        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)
        scroller
        .setup({
            step: "#corrupt-scrolly article .step",
            offset: 0.4,
            debug: true
        })
        .onStepEnter(handleStepEnter)

        // setup resize event
        window.addEventListener("resize", handleResize);

        let donorTree = new DonorTree(1,"donortree")
        donorTree.unhide()
        donorTree.render()

        let donorTreeDense = new QuartileTree(0,"donortreedense")
        donorTreeDense.unhide()
        donorTreeDense.render()
        donorTreeDense.hide()


        /* 
        * helper function definitions 
        *                                       */
        function handleResize() {
            // 1. update height of step elements
            var stepH = Math.floor(window.innerHeight * 0.75);
            step.style("height", stepH + "px");
        
            var figureHeight = window.innerHeight / 2;
            var figureMarginTop = (window.innerHeight - figureHeight) / 2;
        
            figure
                .style("height", figureHeight + "px")
                .style("top", figureMarginTop + "px");
        
            // 3. tell scrollama to update new element dimensions
            scroller.resize();
        }

        function handleStepEnter(response) {
            //console.log(response);
            // response = { element, direction, index }
    
            // add color to current step only
            step.classed("is-active", function(d, i) {
                return i === response.index;
            });

            let totals = [{value: "less than $40", total: "$223,821"},
            {value: "between $40 and $100", total: "$1,048,338"}, 
            {value:"between $100 and $500", total:"$4,219,958"},
            {value: "above $500", total:"98,515,179"}]
            // update graphic based on step
            if(response.index == 0){
                donorTree.unhide()
                donorTreeDense.hide()
                d3.selectAll(".tree-title")
                    .html(`$104,006,296 from 53,361 Donors`)
            }
            else if (response.index > 0){
                donorTree.hide()
                donorTreeDense.unhide()
                d3.selectAll(".tree-title")
                    .html(`The 25% of Donors who gave ${totals[response.index-1].value} account for ${totals[response.index-1].total}`)
                d3.select("#donortreedense")
                    .selectAll("rect")
                        .classed("show-rect", false)
                d3.select("#donortreedense").selectAll(".quartile-"+response.index)
                    .classed("show-rect", true)
            }
        }
        
        
        function setupStickyfill() {
            d3.selectAll(".sticky").each(function() {
                Stickyfill.add(this);
            });
            }
        }

    
    
    
    
    
}