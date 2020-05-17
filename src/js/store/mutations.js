export default {
    addTopDonors(state, payload) {
        state.topDonors=payload;
        return state;
    },
    addElecteds(state, payload) {
        state.electeds = payload;
        return state;
    }

};
