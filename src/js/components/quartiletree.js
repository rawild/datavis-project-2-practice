import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';
import * as d3array from 'd3-array';

export default class QuartileTree extends Component {
    constructor(padding, id) {
        super({
            store,
            element: d3.select("#"+id),
        });
        this.local = { 
            format: d3.format(",." + d3.precisionFixed(1) + "f"),
            paddingInner : 0.2,
            margin : { top: 20, bottom: 20, left: 40, right:20 },
            padding: padding
        }
    }

    /**
     * React to state changes and render the component's HTML
     *
     * @returns {void}
     */
    render() {
        let self = this;
        self.element.selectAll("*").remove()
        console.log("quartiletree rendering")
        let width = self.element.node().getBoundingClientRect().width-self.local.margin.left-self.local.margin.right
        let height = self.element.node().getBoundingClientRect().height-self.local.margin.top-self.local.margin.bottom-30

        /* Get the donor bar chart data*/ 
        self.element.append("div")
            .attr("class","header-2 chart-title tree-title")
            .text("$"+ self.local.format(store.state.summary.total_money) +" from " + self.local.format(store.state.donors.length) + " Donors")

        let quartiles = d3array.rollups(store.state.quartiles,  
            v =>  ({Total: d3.sum(v, d => d.Total), donations:v}), // reduce function,
            d => d.Quartile)
        console.log("quartiles",quartiles)
        
        let root = d3
            .hierarchy([null, quartiles], ([key, values]) => values) // children accessor, tell it to grab the second element
            .sum(([key, values]) => values.Total) // sets the 'value' of each level
            .sort((a, b) => b.value - a.value);
        

        // make bubble map layout generator
        let tree = d3
            .treemap()
            .size([width, height])
            .padding(self.local.padding)
            .round(true);
        
        tree(root); // creates our coordinates and dimensions based on the heirarchy and tiling algorithm

        
        let svg = self.element
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class","tree");
        // create g for each leaf
        const leaf = svg
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", d => `translate(${d.x0},${d.y0})`);

        leaf
            .append("rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("class", d=> {
                if (d.value < 250000) {
                    return "quartile-1 donortree"
                }  
                if (d.value >= 250000 && d.value <= 1500000){
                    return "quartile-2 donortree"
                }
                if (d.value > 1500000 && d.value <= 5000000){
                    return "quartile-3 donortree"
                }
                if (d.value > 5000000) {
                    return "quartile-4 donortree"
                }
            })
        /* 
        leaf
            .append("text")
            .text(d => {
                return (
                    store.state.electeds.filter(x => x.Elected_Id == d.data[1].donations[0].Candidate_ID)[0].First_Name
                    )
                })
            .attr("dy", "-1em")
            .style("text-anchor", "middle")
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", "14")
            .attr("fill", "white");
        leaf
            .append("text")
            .text(d => {
                return (
                    store.state.electeds.filter(x => x.Elected_Id == d.data[1].donations[0].Candidate_ID)[0].Last_Name
                    )
                })
            .style("text-anchor", "middle")
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", "14")
            .attr("fill", "white");
        leaf
            .append("text")
            .text(d => {
                return "$" + self.local.format(d.data[1].Total)
                })
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", "14")
            .attr("fill", "white");*/
            
        }

        hide() {
            let self = this
            self.element.classed("unhidden", false)
            self.element.classed("hidden", true)
        }

        unhide() {
            let self = this
            self.element.classed("hidden", false)
            self.element.classed("unhidden", true)

        }
    }
   
    
