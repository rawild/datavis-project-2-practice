import Component from '../lib/component.js';
import store from '../store/index.js';
import * as d3 from 'd3';
import * as d3array from 'd3-array';

export default class CorruptTree extends Component {
    constructor(donor) {
        super({
            store,
            element: d3.select("#corruption"),
            key: "cuomoDonors"
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
        console.log("corrupt tree rendering")
        let width = self.element.node().getBoundingClientRect().width
        let height = self.element.node().getBoundingClientRect().height-50

        /* Get the donor bar chart data*/ 
        self.element.append("div")
            .attr("class","header-2")
            .text("Cuomo's Health Care Donors")
        
        
        let root = d3
            .hierarchy(store.state.cuomoDonors) // children accessor, tell it to grab the second element
        let links = root.links()
        let nodes = root.descendants()
        console.log("links",links)
        console.log("nodes",nodes)
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(150).strength(1))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("x", d3.forceX())
            .force("y", d3.forceY());

        let svg = self.element
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height]);
        

        let link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
                .data(links)
                .join("line");
        
        const node = svg.append("g")
            .attr("fill", "#fff")
            .attr("stroke", "#000")
            .attr("stroke-width", 2.5)
            .selectAll("circle")
                .data(nodes)
                .join("circle")
                    .attr("fill", d => d.children ? null : "#000")
                    .attr("stroke", d => d.children ? null : "#fff")
                    .attr("r", d => d.children ? 10 : d.data.total/1000)
                    .call(drag(simulation));

        node.append("title")
            .text(d => d.children ? d.data.name + " got $" + self.local.format(d.data.total):
            d.data.name + " gave Cuomo $" + self.local.format(d.data.total));

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
        
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        })
        
        function drag(simulation) {

            function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
            }
            
            function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            }
            
            function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            }
            
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }
    }
}
        
   
    
