const mongoose = require('mongoose');
const { Schema } = mongoose;

const RentBillSchema = new Schema({
    monthID: {
        type: String
    },
    comment: {
        type: String
    },
    rent: {
        type: Number
    },
    totalBills: {
        type: Number
    },
    totalHeat: {
        type: Number
    },
    bill: {
        energy: {
            prev: {type: Number},
            curr: {type: Number},
            diff: {type: Number},
            cost: {type: Number}
        },
        hotwater: {
            prev: {type: Number},
            curr: {type: Number},
            diff: {type: Number},
            cost: {type: Number}
        },
        coldwater: {
            prev: {type: Number},
            curr: {type: Number},
            diff: {type: Number},
            cost: {type: Number}
        },
        gas: {
            prev: {type: Number},
            curr: {type: Number},
            diff: {type: Number},
            cost: {type: Number}
        }
    },
    heat: {
        room1: {
            curr: {type: Number},
            prev: {type: Number},
            diff: {type: Number},
            cost: {type: Number},
            before_reset: {type: Number}
        },
        room2: {
            curr: {type: Number},
            prev: {type: Number},
            diff: {type: Number},
            cost: {type: Number},
            before_reset: {type: Number}
        },
        room3: {
            curr: {type: Number},
            prev: {type: Number},
            diff: {type: Number},
            cost: {type: Number},
            before_reset: {type: Number}
        },
        kitchen: {
            curr: {type: Number},
            prev: {type: Number},
            diff: {type: Number},
            cost: {type: Number},
            before_reset: {type: Number}
        },
    } 

})