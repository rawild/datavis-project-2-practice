import * as d3 from 'd3';

import store from './js/store/index.js'; 
import NumberHeader from "./js/components/numberheader.js"
import DonorScrolly from "./js/components/donorscrolly.js"
import CandidateScrolly from "./js/components/candidatescrolly.js"
import CorruptScrolly from "./js/components/corruptscrolly.js"
import SidePanel from "./js/components/sidepanel.js"
import Beneficiaries from './js/components/beneficiaries.js'
import CandidateBar from './js/components/candidatebar.js'
import CorruptNetwork from './js/components/corruptnetwork.js';

let numberHeader = new NumberHeader()
    numberHeader.render()

let corruptSide1 = new SidePanel('A1')
    corruptSide1.render("The Total: $104,006,269","This is all of the donations by all of the donors. \
    The bigger boxes are the donors who gave the most. \
    As you can see, some donors gave a lot more money than others.\
    In fact many of the smallest boxes are so small you can\'t see them. This accounts for over\
    a quarter of the donors")

let corruptSide2 = new SidePanel('A2')
    corruptSide2.render("The smallest quarter: $223,821","This is the total sum of the donations by \
    the twenty-five percent of donors who gave less than $40. \
    As you can see, even though it is over 13,300 donors, it is not a lot of money compared to \
    the total.")

let corruptSide3 = new SidePanel('A3')
    corruptSide3.render("The low-middle quarter: $1,048,338","This is the total sum of the donations by \
    the twenty-five percent of donors who gave between $40 and $100 dollars. \
    As you can see, even though it is over 13,300 donors, it is not a lot of money compared to \
    the total.")
let donorSide1 = new SidePanel('B1')
    donorSide1.render('The Biggest Donors', " There were eleven donors who gave more than $500,000 between \
    2015 and 2020. Some of them are surprising.")


Promise.all(["./data/donors_summarized_2015_20.csv","./data/donor_quartiles.csv","./data/top_donor_filings.csv","./data/Electeds_List.csv",
"./data/donor_list.csv", "./data/top_money_candidate_filings.csv",
"./data/cuomo_healthcare_donors.json"
]).then(function(files) {
    d3.csv(files[0], d3.autoType).then(donors => {
        store.dispatch('addDonors', donors)
        d3.csv(files[1], d3.autoType).then(quartiles => {
            store.dispatch('addQuartiles', quartiles)
            corruptSection()
            d3.csv(files[2], d3.autoType).then(topDonors => {
                store.dispatch('addTopDonors', topDonors);
                d3.csv(files[3], d3.autoType).then(electeds => {
                    store.dispatch('addElecteds', electeds)
                    d3.csv(files[4], d3.autoType).then(donorNames => {
                        store.dispatch('addDonorNames', donorNames)
                        d3.csv(files[5], d3.autoType).then(topCandidates => {
                            store.dispatch('addTopCandidates', topCandidates)
                            d3.json(files[6], d3.autoType).then(cuomoDonors => {
                                store.dispatch('addCuomoDonors', cuomoDonors)
                                init()
                            })
                        })
                 })
                })
            
         })
        })
    })
})

function init() {
  /*  
    let donorScrolly=new DonorScrolly()
    donorScrolly.render()
    
    
    let beneficiaries = new Beneficiaries()
    beneficiaries.render()

    let candidateScrolly = new CandidateScrolly()
    candidateScrolly.render()

    let candidateBar = new CandidateBar()
    candidateBar.render()
    
    let corruptNetwork = new CorruptNetwork()
    corruptNetwork.render()*/
}

function corruptSection() {
    let corruptScrolly = new CorruptScrolly()
    corruptScrolly.render()
}
