<template>
<div id="heatings">
    <span style="display:inline-block">Nazwa | Aktualna wartość | Ostatni reset</span>
    <div>
        <span>Pokój 1: </span>
        <input type="number" class="input" v-model="heatings.room1.value"/>
        <input type="number" class="input" v-model="heatings.room1.reset"/>
    </div>
    <div>
        <span>Pokój 2: </span>
        <input type="number" class="input" v-model="heatings.room2.value"/>
        <input type="number" class="input" v-model="heatings.room2.reset"/>
    </div>
    <div>
        <span>Pokój 3: </span>
        <input type="number" class="input" v-model="heatings.room3.value"/>
        <input type="number" class="input" v-model="heatings.room3.reset"/>
    </div>
    <div>
        <span>Kuchnia: </span>
        <input type="number" class="input" v-model="heatings.kitchen.value"/>
        <input type="number" class="input" v-model="heatings.kitchen.reset"/>
    </div>
</div>
</template>
<script>
export default {
    props: {
        heatings: {
            type: Object,
            required: true
        }
    },
}
</script>