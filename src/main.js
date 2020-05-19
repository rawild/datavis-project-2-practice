

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
import SectionHeader from './js/components/sectionheader.js'
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
    
    let biggestdonors = new SectionHeader("biggestdonors")
    biggestdonors.render("Who Pays Thousands of $$$?", "The vast majority of the money comes from people with more than $500\
    to throw around. What about those top 1%-ers? Who are those 429 donors? Who do they represent? What do they want?")
    
    let donorScrolly=new DonorScrolly()
    donorScrolly.render()
    
    
    let beneficiaries = new SectionHeader("beneficiaries")
    beneficiaries.render("Who Benefits?", "$100 million is a lot of money. Where is it going? Who has \"earned\" it?")

    let candidateScrolly = new CandidateScrolly()
    candidateScrolly.render()

    let candidateBar = new CandidateBar()
    candidateBar.render()

    
    let corruptNetwork = new CorruptNetwork()
    corruptNetwork.render()
}
init()

