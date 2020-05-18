import update from './update.js';
import * as d3 from 'd3';

import store from './js/store/index.js'; 
import NumberHeader from "./js/components/numberheader.js"
import DonorScrolly from "./js/components/donorscrolly.js"
import CandidateScrolly from "./js/components/candidatescrolly.js"
import CorruptScrolly from "./js/components/corruptscrolly.js"
import SidePanel from "./js/components/sidepanel.js"
import Beneficiaries from './js/components/beneficiaries.js'
import CandidateBar from './js/components/candidatebar.js'
update();


Promise.all(["./data/top_donor_filings.csv","./data/Electeds_List.csv","./data/donor_list.csv",
"./data/top_money_candidate_filings.csv","./data/donors_summarized_2015_20.csv"
]).then(function(files) {
    d3.csv(files[0], d3.autoType).then(topDonors => {
        //console.log("data", data);
        store.dispatch('addTopDonors', topDonors);
        d3.csv(files[1], d3.autoType).then(electeds => {
            //console.log("electeds", electeds)
            store.dispatch('addElecteds', electeds)
            d3.csv(files[2], d3.autoType).then(donorNames => {
                store.dispatch('addDonorNames', donorNames)
                d3.csv(files[3], d3.autoType).then(topCandidates => {
                    store.dispatch('addTopCandidates', topCandidates)
                    d3.csv(files[4], d3.autoType).then(donors => {
                        store.dispatch('addDonors', donors)
                        init()
                    })
                })
            })
            
        })
    })
});

function init() {

    let numberHeader = new NumberHeader()
    numberHeader.render()

    let corruptScrolly = new CorruptScrolly()
    corruptScrolly.render()
    
    let donorScrolly=new DonorScrolly()
    donorScrolly.render()
    
    let donorSide1 = new SidePanel('B1')
    donorSide1.render('The Biggest Donors', " There were eleven donors who gave more than $500,000 between \
    2015 and 2020. Some of them are surprising.")

    let beneficiaries = new Beneficiaries()
    beneficiaries.render()

    let candidateScrolly = new CandidateScrolly()
    candidateScrolly.render()

    let candidateBar = new CandidateBar()
    candidateBar.render()
    

    
}

