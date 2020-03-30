<template>
    <div>
        <span>{{meter.key}}</span>
        <input type="number" class="input" v-bind:value="meter.value"/>
    </div>
</template>
<script>
export default {
    props: {
        meter: {
            type: Object,
            required: true
        }
    },
}
</script>