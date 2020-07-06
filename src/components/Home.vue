<template>
    <v-container fluid>
        <v-form>
            <v-file-input
                label="Selecione as Legendas"
                prepend-icon="mdi-message-text" 
                outlined
                append-outer-icon="mdi-send"
                multiple 
                chips 
                v-model="files" 
                @click:append-outer="processSubtitles"/>
        </v-form>
        <div class="pills">
            <Pill v-for="word in groupedWords" :key="word.name" 
                :name="word.name" :amount="word.amount"/>
        </div>
    </v-container>
</template>

<script>
import { ipcRenderer } from "electron";
import Pill from "./Pill";

export default {
    components: {
        Pill
    },
    data: () => {
        return {
            files: [],
            groupedWords: []
        } 
    },
    methods: {
        processSubtitles() {
            const paths = this.files.map( f => f.path)
            ipcRenderer.send('processSubtitles',paths)
            ipcRenderer.on('processSubtitles', (event, resp) => {
                this.groupedWords = resp
            })
        }
    }
}
</script>

<style>
    .pills {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>