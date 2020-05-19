

// Data
import cuomoDonors from './data/cuomo_healthcare_donors.json'
import topDonors from "./data/top_donor_filings.csv"
import electeds from  "./data/Electeds_List.csv"
import donorNames from "./data/donor_list.csv"
import quartiles from "./data/donor_quartiles.csv"
import donors from './data/donors_summarized_2015_20.csv'

import store from './js/store/index.js'; 
import NumberHeader from "./js/components/numberheader1.js"
import DonorScrolly from "./js/components/donorscrolly.js"
import CandidateScrolly from "./js/components/candidatescrolly.js"
import CorruptScrolly from "./js/components/corruptscrolly.js"
import SidePanel from "./js/components/sidepanel.js"
import Beneficiaries from './js/components/beneficiaries.js'
import CandidateBar from './js/components/candidatebar.js'
import CorruptNetwork from './js/components/corruptnetwork.js';


/*Promise.all(["./data/donors_summarized_2015_20.csv","./data/top_donor_filings.csv"]).then(function(files) {
    d3.csv(files[0], d3.autoType).then(donors => {
        store.dispatch('addDonors', donors)
        init()
    })
})*/

function init() {

    let numberHeader = new NumberHeader()
    numberHeader.render()

    store.dispatch('addDonors', donors)
    store.dispatch('addTopDonors', topDonors);
    store.dispatch('addElecteds', electeds)
    store.dispatch('addDonorNames', donorNames)
    store.dispatch('addCuomoDonors', cuomoDonors)
    store.dispatch('addQuartiles', quartiles)

    let corruptScrolly = new CorruptScrolly()
    corruptScrolly.render()
    
    let donorScrolly=new DonorScrolly()
    donorScrolly.render()
    
    
    let beneficiaries = new Beneficiaries()
    beneficiaries.render()

    let candidateScrolly = new CandidateScrolly()
    candidateScrolly.render()

    let candidateBar = new CandidateBar()
    candidateBar.render()

    
    let corruptNetwork = new CorruptNetwork()
    corruptNetwork.render()
}
init()

