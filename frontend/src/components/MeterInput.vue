<template>
<div id="meters">
    <div>
        <span>Prąd</span>
        <input type="number" class="input" v-model="meters.energy">
    </div>
    <div>
        <span>Ciepła woda</span>
        <input type="number" class="input" v-model="meters.hot_water">
    </div>
    <div>
        <span>Zimna woda</span>
        <input type="number" class="input" v-model="meters.cold_water">
    </div>
    <div>
        <span>Gaz</span>
        <input type="number" class="input" v-model="meters.gas">
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