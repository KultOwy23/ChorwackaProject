<template>
    <div>
        <div class="month-header">
            <p v-if="!monthStarted">Wprowadź kod miesiąca</p>
            <input type="number" class="input" :readonly="monthStarted" @keypress.enter="initMonth($event)" v-model="monthcode"/>/<input type="number" class="input" :readonly="monthStarted" @keypress.enter="initMonth($event)" v-model="monthcode"/>
        </div>
        <div id="newMonth" v-if="monthStarted">
            <div id="meters"  v-if="meters.length">
                <MeterInput 
                    v-for="meter in meters"
                    :key="meter.key"
                    :meter="meter"
                />
            </div> 
            <div id="heatings"  v-if="heatings.length">
                <HeatingInput 
                    v-for="heating in heatings"
                    :key="heating.roomName"
                    :heating="heating"
                />
            </div> 
            <textarea placeholder="Dodatkowy komentarz..."/>
            <button @click="showText()">Zapisz</button>
            <button @click="reset()">Reset</button>
        </div> 
    </div>

</template>

<script>
import MeterInput from './MeterInput.vue'
import HeatingInput from './HeatingInput.vue'
export default {
    components: {
        MeterInput, HeatingInput
    },
    data() {
        return {
            test: 'Hello',
            monthStarted: false,
            meters: [{
                key: 'Prąd',
                value: 123.0
            },
            {
                key: 'Ciepła woda',
                value: 66.0
            },
            {
                key: 'Zimna woda',
                value: 55.0
            },
            {
                key: 'Gaz',
                value: 66.0,
            }
            ],
             heatings: [
                {
                    roomName: 'Pokój 1',
                    oldValue: 100.0,
                    oldValueReset: 21.0,
                    newValue: 123.0,
                    newValueReset: 21.0
                },
                {
                    roomName: 'Pokój 2',
                    oldValue: 100.0,
                    oldValueReset: 21.0,
                    newValue: 123.0,
                    newValueReset: 21.0
                },
                {
                    roomName: 'Pokój 3',
                    oldValue: 100.0,
                    oldValueReset: 21.0,
                    newValue: 123.0,
                    newValueReset: 21.0
                },
                {
                    roomName: 'Kuchnia',
                    oldValue: 100.0,
                    oldValueReset: 21.0,
                    newValue: 123.0,
                    newValueReset: 21.0
                }
            ]

        }
    },
    methods: {
        showText() {
            this.monthStarted = true;
            this.meters[0].value = 1.0;
        },
        initMonth() {
            this.monthStarted = true;
        },
        reset() {
            this.monthStarted = false;
            this.monthcode = "";
        }
    }
    
}
</script>

<style>
 .month-header{
    text-align: center;
}
</style>