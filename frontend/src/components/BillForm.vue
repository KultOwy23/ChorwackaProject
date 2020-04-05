<template>
    <div>
        <div class="month-header">
            <p v-if="!monthStarted">Wprowadź kod miesiąca</p>
            <input type="text" class="input" :readonly="monthStarted" @keypress.enter="initMonth($event)" v-model="monthcode"/>
        </div>
        <div id="newMonth" class="new-month-form" v-if="monthStarted">
            <MeterInput :meters="meters"/>
            <hr>
            <HeatingInput :heatings="heatings"/>
            <textarea class="comment" rows="4" v-model="comment" placeholder="Dodatkowy komentarz..."/>
            <div class="buttons">
                <button @click="save()">Zapisz</button>
                <button @click="reset()">Reset</button>
                <button @click="send()">Wyślij raport</button>
            </div>
        </div> 
    </div>

</template>

<script>
import MeterInput from './MeterInput.vue'
import HeatingInput from './HeatingInput.vue'
import axios from "axios"
console.log(axios);

export default {
    components: {
        MeterInput, HeatingInput
    },
    data() {
        return {
            test: 'Hello',
            monthStarted: false,
            monthcode: '',
            comment: '',
            meters: {
                energy: 0.0,
                hot_water: 0.0,
                cold_water: 0.0,
                gas: 0.0
            },
            heatings: {
                room1: {value: 0.0, reset: 0.0},
                room2: {value: 0.0, reset: 0.0},
                room3: {value: 0.0, reset: 0.0},
                kitchen: {value: 0.0, reset: 0.0}
            },
        }
    },
    methods: {
        save() {
            console.log(this.monthcode)
            var url = `/testmonths/${this.monthcode}`;
            var month = {
                meters: this.meters,
                heatings: this.heatings,
                comment: this.comment
            }
            console.log()
            this.$http.post(url,{month: month}).then(response => {
                console.log(response);
            })
        },
        initMonth() {
            this.$http.get(`/months/${this.monthcode}`).then(response => {
                console.log(response);
            });
            this.monthStarted = true;
        },
        send() {
            this.$http.get(`/sendraport/${this.monthcode}/user/jedrzej.zawojski@hotmail.com`);
        },
        reset() {
            this.monthStarted = false;
            this.monthcode = "";
        }
    }
    
}
</script>

<style>
* {
    margin: 5px
}
 .month-header{
    text-align: center;
 }

 .new-month-form {
     text-align: center;
 }

 .comment {
     display: inline-block;
     width: 100%;
 }
</style>