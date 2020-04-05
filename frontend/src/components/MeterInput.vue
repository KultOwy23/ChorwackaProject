<template>
<div id="meters">
    <div>
        <span>Prąd</span>
        <input type="Number" class="input" v-model="meters.energy.value">
    </div>
    <div>
        <span>Ciepła woda</span>
        <input type="Number" class="input" v-model="meters.hot_water.value">
    </div>
    <div>
        <span>Zimna woda</span>
        <input type="Number" class="input" v-model="meters.cold_water.value">
    </div>
    <div>
        <span>Gaz</span>
        <input type="Number" class="input" v-model="meters.gas.value">
    </div>
</div>
</template>
<script>
export default {
    props: {
        meters: {
            type: Object,
            required: true
        }
    },
}
</script>