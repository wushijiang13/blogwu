<template>
    <div>
        <div style="border: 1px solid #ccc;">
            <!-- 工具栏 -->
            <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editorId="editorId"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
            />

            <!-- 编辑器 -->
            <Editor
                    ref="editor"
                    style="height: 500px"
                    :editorId="editorId"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onChange="editorChange"
            />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import '@wangeditor/editor/dist/css/style.css'
    import { SlateTransforms } from '@wangeditor/editor'
    import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
    export default Vue.extend ({
        components: { Editor, Toolbar },
        props:['defaultJson'],
        data(){
            return {
                editorId: 'w-e-1',
                editorConfig:{
                    placeholder:'请输入内容',
                    MENU_CONF:{
                        uploadImage:{
                            base64LimitKB: 10240 // 5kb
                        }
                    }
                },
                toolbar:{},
                toolbarConfig:{},
                mode: 'default',
                isInit:false,
            }
        },
        watch:{
            'defaultJson'(){
                if (this.defaultJson.length > 1 && !this.isInit) {
                    this.isInit=true;
                    this.$nextTick(()=>{
                        SlateTransforms.insertNodes(getEditor(this.editorId),this.defaultJson);
                    })
                }
            }
        },
        methods:{
          editorChange(editor){
              this.$emit('change',editor.children,editor.getHtml());
          }
        },
        // 及时销毁 editor
        beforeDestroy() {
            const editor = getEditor(this.editorId)
            if (editor == null) return
            // 销毁，并移除 editor
            editor.destroy()
            removeEditor(this.editorId)
        }
    })
</script>

<style lang="less" scoped>
    #editor-container{
        height: 100vh;
    }
    #top-container {
        border-bottom: 1px solid #e8e8e8;
        padding-left: 30px;
    }

    #editor-toolbar {
        width: 1300px;
        background-color: #FCFCFC;
        margin: 0 auto;
    }

    #content {
        height: calc(100% - 40px);
        background-color: rgb(245, 245, 245);
        overflow-y: auto;
        position: relative;
    }

    #editor-container {
        margin: 30px auto 150px auto;
        background-color: #fff;
        padding: 20px 50px 50px 50px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
    }

    #title-container {
        padding: 20px 0;
        border-bottom: 1px solid #e8e8e8;
    }

    #title-container input {
        font-size: 30px;
        border: 0;
        outline: none;
        width: 100%;
        line-height: 1;
    }

    #editor-text-area {
        min-height: 900px;
        margin-top: 20px;
        height: 400px;
    }
</style>