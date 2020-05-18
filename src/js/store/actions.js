export default {
    addTopDonors(context, payload) {
        context.commit('addTopDonors', payload);
    },
    addElecteds(context, payload) {
        context.commit('addElecteds', payload);
    },
    addDonorNames(context, payload) {
        context.commit('addDonorNames', payload)
    }
    
};
