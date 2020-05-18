import Component from '../lib/component.js';
import store from '../store/index.js';
import DonorBar from './donorbar.js';
import DonorBubble from './donorbubble.js';


import * as d3 from 'd3';
import scrollama from 'scrollama';
import 'intersection-observer';



export default class DonorScrolly extends Component {
    constructor() {
        super({
            store,
            element: d3.select('#donor-scrolly'),
            key: "highlightPolitician"
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
        console.log("donor-scrolly rendering")
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
                step: "#donor-scrolly article .step",
                offset: 0.33,
                debug: true
            })
        .onStepEnter(handleStepEnter);

            // setup resize event
            window.addEventListener("resize", handleResize);

        
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
                console.log(response);
                // response = { element, direction, index }
        
                // add color to current step only
                step.classed("is-active", function(d, i) {
                    return i === response.index;
                });
                // update graphic based on step
                if (response.index == 0) {
                    let donorBar = new DonorBar();
                    donorBar.render()
                } else if (response.index == 1){
                    let donorBubble1 = new DonorBubble(948); // donor bubble for NYC Campaign Finance Board
                    donorBubble1.render()
                } else if (response.index == 2){
                    let donorBubble2 = new DonorBubble(188); // donor bubble for NYC Campaign Finance Board
                    donorBubble2.render()
                } else if (response.index == 3){
                    let donorBubble1 = new DonorBubble(196); // donor bubble for NYC Campaign Finance Board
                    donorBubble1.render()
                }
            }
            
            function setupStickyfill() {
                d3.selectAll(".sticky").each(function() {
                  Stickyfill.add(this);
                });
              }


            let scroller2 = scrollama()
            scroller2
                .setup({
                    step: "#donor-scrolly article .baby-step",
                    debug: true,
                    offset: 0.15
                })
            .onStepEnter(handleBabyStepEnter)
            .onStepExit(handleBabyStepExit);

            function handleBabyStepEnter(response) {
                console.log(response)
                if (response.index == 0) {
                    d3.select('#donor948')
                        .classed("barHighlighted", true)
                }
            }
            function handleBabyStepExit(response) {
                console.log(response)
                if (response.index == 0) {
                    d3.select('#donor948')
                        .classed("barHighlighted", false)
                }
            }

        }

    
    
    
    
    
}