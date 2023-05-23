<template>
    
    <div class="container_forum_ajout">
        <div class="ajout_titre">
            <input type="text" placeholder="Titre">
        </div>
        <div class="ajout_tags">
            <input type="text" placeholder="Tags">
        </div>
        <div class="ajout_sujet" v-if="editor">
            <button @click="editor.chain().focus().toggleBold().run()"
             :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                bold
            </button>
            <div :style="{ height: '400px' }">
                <editor-content  :editor="editor"  />
            </div>
            
        </div>
        <div >
            
        </div>
        
    </div>
    
</template>

<script>

import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
    components: {
        EditorContent,
    },
    data() {
        return {
            editor: null,
            
        };
    },
    mounted() {
        this.$emit('update-mode', 'ajout',0,0)

        this.editor = new Editor({
            content: '',
            extensions: [
                StarterKit,
            ],
            editorProps: {
                attributes: {
                    class: 'prose focus:outline-none break-all max-w-full h-full mt-2 ml-1 leading-4 leading-3',
                    
                },
            },
        })
    },
    beforeUnmount() {
    this.editor.destroy()
    },
};
</script>

<style scoped>

.container_forum_ajout{
    box-sizing: border-box;
    width: 100%;
    min-height:calc(100vh - 70px) ;
    background-color: transparent;
    position: relative;
    top: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: tra; */
    border: solid black 1px;
    display: flex;
    flex-direction: column;
    padding-top: 200px;
}
.ajout_titre{
    width: 50%;
    height: 50px;
    
    margin-bottom: 10px;
}

.ajout_tags{
    width: 50%;
    height: 50px;
    
    margin-bottom: 10px;
}
.ajout_titre input, .ajout_tags input{
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 25px;
}
.ajout_titre input:focus, .ajout_tags input:focus{
    box-sizing: border-box;
    border: 2px solid rgb(211, 0, 0); 
    outline: none;
    border-radius: 5px;
    
}
.prose{
    
}
.ajout_sujet{
    
    width: 50%;
    min-height: 300px;
    background-color: rgb(175, 175, 175); 
    margin-bottom: 10px;
}

.ajout_sujet div {

}
</style>