import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';
import * as d3array from 'd3-array';

export default class DonorBubble extends Component {
    constructor(donor) {
        super({
            store,
            element: d3.select("#figure1"),
            key: "topDonors"
        });
        this.local = { 
            format: d3.format(",." + d3.precisionFixed(1) + "f"),
            paddingInner : 0.2,
            margin : { top: 20, bottom: 20, left: 300, right:140 },
            donor: donor,
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
        console.log("donorbubble rendering")
        console.log(self.local)
        let width = self.element.node().getBoundingClientRect().width
        let height = self.element.node().getBoundingClientRect().height-30
        let donorName = store.state.donorNames.filter(d=>d.Cluster_ID == self.local.donor)[0].Name
        let donations = store.state.topDonors.filter(d => d.Cluster_ID == self.local.donor)
        console.log('donations', donations)
        /* Get the donor bar chart data*/ 
        self.element.append("div")
            .attr("class","header-2")
            .text("Recipients of " + donorName)

        let recipients = d3array.rollups(donations,  
            v =>  ({Total: d3.sum(v, d => d.Total), donations:v}), // reduce function,
            d => d.Candidate_ID)
        
        let uniqueCandidates = [...new Set(donations.map(d => d.Candidate_ID))];
        let colorScale = d3
                .scaleOrdinal()
                .domain(uniqueCandidates)
                .range(d3.schemeCategory10);
        let root = d3
            .hierarchy([null, recipients], ([key, values]) => values) // children accessor, tell it to grab the second element
            .sum(([key, values]) => values.Total) // sets the 'value' of each level
            .sort((a, b) => b.value - a.value);
        
        

        // make bubble map layout generator
        const pack = d3
        .pack()
        .size([width, height])
        .padding(1)
        // call our generator on our root hierarchy node
        pack(root); // creates our coordinates and dimensions based on the heirarchy and tiling algorithm

        console.log(root);
        
        let svg = self.element
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // create g for each leaf
        const leaf = svg
            .selectAll("g")
            .data(root.leaves())
            .join("g")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        leaf
            .append("circle")
            .attr("fill-opacity", 0.6)
            .attr("fill", d => colorScale(d.data[1].donations[0].Candidate_ID)) // take the genre from the first one in the group
            .attr("r", d => d.r)
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
            .attr("fill", "white");
            
        }
    }
   
    
