<template>
    <div>
        <h1>Hai</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Electron from 'electron'

export default Vue.extend({
    components: {}
});

let ipcRenderer = Electron.ipcRenderer;
console.log(ipcRenderer.sendSync('music-request', 'testing123'));
</script>
