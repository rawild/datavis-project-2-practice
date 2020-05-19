import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';
import scrollama from 'scrollama';
import 'intersection-observer';
import DonorTree from './donortree.js';
import QuartileTree from './quartiletree.js'
import SidePanel from './sidepanel.js'

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
            offset: 0.5,
            debug: false
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


        /* render all the sidebars */
        let corruptSide1 = new SidePanel('A1')
            corruptSide1.render("The Total: $104,006,269","This is all of the donations by all of the donors. \
            The bigger boxes are the donors who gave the most. \
            As you can see, some donors gave a lot more money than others.\
            In fact many of the smallest boxes are so small you can\'t see them. Over\
            a half of the donors are not visible here becuse they are so small.", "corrupt-side")

        let corruptSide2 = new SidePanel('A2')
            corruptSide2.render("The smallest quarter: $223,821","This is the total sum of the donations by \
            the twenty-five percent of donors who gave less than $40. \
            As you can see, even though it is over 13,300 donors, it is not a lot of money compared to \
            the total.","corrupt-side")

        let corruptSide3 = new SidePanel('A3')
            corruptSide3.render("The low-middle quarter: $1,048,338","This is the total sum of the donations by \
            the twenty-five percent of donors who gave between $40 and $100 dollars. \
            As you can see, even though it is over 13,300 donors, it is not a lot of money compared to \
            the total.","corrupt-side")

        let corruptSide4 = new SidePanel('A4')
            corruptSide4.render("The upper-middle quarter: $4,219,958","This is the total sum of the donations by \
            the twenty-five percent of donors who gave between $100 and $500 dollars. \
            These are the donors who gave a total donation amount that was between 50% and 75% of the largest donations. \
            It still accounts for a fairly amount over all.","corrupt-side")

        let corruptSide5 = new SidePanel('A5')
            corruptSide5.render("The top quarter of donors: $98,515,179","This is the total sum of the donations by \
            the twenty-five percent of donors who gave over $500 dollars. \
            These donors, while only a fraction of the overall donations, account for the vast majority of the donations.\
            In fact the money from the biggest 429 donors is equal to all of the money that the other 52,932 donors gave.",
            "corrupt-side")


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
            {value: "above $500", total:"$98,515,179"}]
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