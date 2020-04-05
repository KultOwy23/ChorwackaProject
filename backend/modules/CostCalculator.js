const Repositories = require('../repositories/Repositories');
const { MonthRepository } = Repositories;
const { BillsRepository } = Repositories;
const { HeatingRepository } = Repositories;
const { PricesRepository } = Repositories;

//TODO: Reconsider the month schema structure.


class CostCalculator{ 
    constructor(year, month) {
        // const {monthname, year} = this.getMonthMeta(monthcode, comment);

        // console.log(`Month_NO: ${monthname}`);
        // console.log(`Year: ${year}`);
        MonthRepository.create({year: year, month: month});
        
    };

    getMonthMeta(monthcode) {
        const month_no = monthcode.substring(0,2);
        const month_year = monthcode.substring(2)*1;
        return {monthname: MonthDictionary[month_no], year: month_year};
    }

    generateCosts(year,month, requestBody) {
        const monthQuery = {year: year, month: month};
        const { meters } = requestBody;
        const { heatings } = requestBody;
        const { comment } = requestBody;
        return new Promise( async (resolve, reject) => {
            this.prices = await this.getLastPrices();
            const months = await this.getLastMonths();
            this.previousMonth = months[1];
            this.newMonth = months[0];
            this.newMonth.total_rent = this.prices.rent.toFixed(2)*1;
            this.newMonth.comment = comment;
            this.calculateBills(meters, this.prices).then((billsPrice) => {
                this.newMonth.total_bill = billsPrice.toFixed(2)*1;
                this.newMonth.total_rent += billsPrice.toFixed(2)*1;
                MonthRepository.updateByMonthQuery(monthQuery, this.newMonth).then((data) => {
                    // console.log(data);
                    this.calculateHeating(heatings, this.prices).then((heatingCost) => {
                        this.newMonth.total_heat = heatingCost.toFixed(2)*1;
                        this.newMonth.total_rent += heatingCost.toFixed(2)*1;
                        MonthRepository.updateByMonthQuery(monthQuery, this.newMonth).then((data) => {
                            resolve(data)       
                        }).catch((error) => console.log(error));
                    }).catch((error) => console.log(error));
                    resolve(data);
                }).catch((error) => console.log(error));
            });
        });
    };

    getLastPrices() {
        return new Promise((resolve, reject) => {
            PricesRepository.findLast().then((prices) => {
                resolve(prices[0]);
            }).catch((err) => reject(err));
        });
    };

    getLastMonths() {
        this.lastMonth = MonthRepository.findLastMonths();
        return new Promise((resolve, reject) => {
            this.lastMonth.then((months) => {
                resolve(months);
            }).catch((error) => {
                reject(error);
            });
        })
    };

    calculateBills(meters, prices) {
        const previousMonthId = this.previousMonth._id;
        const newMonthId = this.newMonth._id;
        return new Promise((resolve,reject) => {
            BillsRepository.findByMonthId(previousMonthId).then((prevMonthBills) => {
                let newBill = {monthId: newMonthId, energy: {}, hot_water: {}, cold_water: {}, gas: {}};
                newBill.energy = this.calculateUsage(meters.energy.value*1, prevMonthBills.energy.value, prices.energy);
                newBill.hot_water = this.calculateUsage(meters.hot_water.value*1, prevMonthBills.hot_water.value, prices.hot_water);
                newBill.cold_water = this.calculateUsage(meters.cold_water.value*1, prevMonthBills.cold_water.value, prices.cold_water);
                newBill.gas = this.calculateUsage(meters.gas.value, prevMonthBills.gas.value*1, prices.gas);
                BillsRepository.create(newBill);
                resolve(newBill.energy.cost + newBill.hot_water.cost + newBill.cold_water.cost + newBill.gas.cost)
            }).catch((error) => {
                console.log(error);
                reject(error);
            }) ;
        });
    };

    //TODO: Consider meters reset situtation
    calculateUsage(newState, prevState, price) {
        let newUsage = {value: newState};
        newUsage.usage = newState - prevState;
        newUsage.cost = (newUsage.usage * price).toFixed(2)*1;
        return {value: newUsage.value, usage: newUsage.usage, cost: newUsage.cost};
    }


    calculateHeating(heatings, prices) {
        const previousMonthId = this.previousMonth._id;
        const newMonthId = this.newMonth._id;
        return new Promise((resolve, reject) => {
            HeatingRepository.findByMonthId(previousMonthId).then((prevMonthHeating) => {
                let newHeating = {monthId: newMonthId};
                newHeating.room1 = this.calculateRoomHeating(heatings.room1,prevMonthHeating.room1, prices.heating);
                newHeating.room2 = this.calculateRoomHeating(heatings.room2,prevMonthHeating.room2, prices.heating);
                newHeating.room3 = this.calculateRoomHeating(heatings.room3,prevMonthHeating.room3, prices.heating);
                newHeating.kitchen = this.calculateRoomHeating(heatings.kitchen,prevMonthHeating.kitchen, prices.heating);
                HeatingRepository.create(newHeating);
                resolve(newHeating.room1.cost + 
                    newHeating.room2.cost +
                    newHeating.room3.cost +
                    newHeating.kitchen.cost)
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }
    
    //TODO: Consider the meters reset and some usage then.
    calculateRoomHeating(room, prevRoom, price) {
        let newRoom = {value: room.value*1, reset: room.reset*1};
        if(newRoom.value < prevRoom.value) {
            newRoom.usage = newRoom.reset - prevRoom.value + newRoom.value
        } else {
            newRoom.usage = newRoom.value - prevRoom.value;
        }
        newRoom.prevVal = prevRoom.value;
        newRoom.prevReset = prevRoom.reset;
        newRoom.cost = (newRoom.usage * price).toFixed(2)*1;
        return newRoom;
    }
}

module.exports = {CostCalculator};