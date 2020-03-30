<template>
    <div>
        <h1>Rachunki!</h1>
        <span>Message here: {{ test }}</span>
       
        <button @click="showText()">Button</button>
    </div>

</template>

<script>
let test = 'Hello World!'
console.log(test);
export default {
    data() {
        return {
            test: test
        }
    },
    methods: {
        showText() {
            this.test += ' World!';
            console.log(test);
        }
    }
    
}
</script>