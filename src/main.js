import update from './update.js';
import * as d3 from 'd3';

import store from './js/store/index.js'; 
import NumberHeader from "./js/components/numberheader.js"
import DonorScrolly from "./js/components/donorscrolly.js"
import CandidateScrolly from "./js/components/candidatescrolly.js"
import CorruptScrolly from "./js/components/corruptscrolly.js"
update();


Promise.all(["./data/top_donor_filings.csv","./data/Electeds_List.csv"
]).then(function(files) {
    d3.csv(files[0], d3.autoType).then(topDonors => {
        //console.log("data", data);
        store.dispatch('addTopDonors', topDonors);
        d3.csv(files[1], d3.autoType).then(electeds => {
            //console.log("electeds", electeds)
            store.dispatch('addElecteds', electeds)
            init()
        })
    })
});



function init() {

    let numberHeader = new NumberHeader()
    numberHeader.render()

    let donorScrolly=new DonorScrolly()
    donorScrolly.render()
    
    let candidateScrolly = new CandidateScrolly()
    candidateScrolly.render()

    let corruptScrolly = new CorruptScrolly()
    corruptScrolly.render()
}

