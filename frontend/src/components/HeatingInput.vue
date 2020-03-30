<template>
    <div>
        <span>{{heating.roomName}}: </span>
        <input type="number" class="input" v-bind:value="heating.oldValue"/>
        <input type="number" class="input" v-bind:value="heating.oldValueReset"/>
        <input type="number" class="input" v-bind:value="heating.newValue"/>
        <input type="number" class="input" v-bind:value="heating.newValueReset"/>
    </div>
</template>
<script>
export default {
    props: {
        heating: {
            type: Object,
            required: true
        }
    },
}
</script>