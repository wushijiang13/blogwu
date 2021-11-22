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
            <div class="editor-box">
                <div class="editor-container">
                    <Editor
                            ref="editor"
                            class="editor_default"
                            :editorId="editorId"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onChange="editorChange"
                    />
                </div>
                <p class="editor-tips">当前字数：{{currentNum}}个</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { arrayEqual } from "@utils/utils";
    import '@wangeditor/editor/dist/css/style.css'
    import { SlateTransforms } from '@wangeditor/editor'
    import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
    import { deleteFile, uploadFile} from '@config/request/requestUrl'
    export default Vue.extend ({
        components: { Editor, Toolbar },
        props:['defaultJson'],
        data(){
            return {
                toolbar:{},
                toolbarConfig:{},
                mode: 'default',
                isInit:false,
                currentNum:0,//当前字数
                insertImageList:[],//添加过，或者来源的图片list
                editorId: 'w-e-1',
                editorConfig:{
                    placeholder:'请输入内容',
                    MENU_CONF:{
                        uploadImage:{
                            server: process.env.VUE_APP_API_URL+uploadFile,
                            fieldName: 'upload_file',
                            base64LimitKB: 1, // 5kb
                        }
                    }
                },
                diffImageList:[],//两者对比后差异的数组
            }
        },
        watch:{
            'defaultJson'(){
                if (this.defaultJson.length >= 1 && !this.isInit) {
                    this.isInit=true;
                    this.$nextTick(()=>{
                        let editor = getEditor(this.editorId)
                        editor.clear();
                        SlateTransforms.insertNodes(editor,this.defaultJson);
                        SlateTransforms.removeNodes(editor, { at: [0] })
                        this.insertImageList=editor.getElemsByType('image');
                    })
                }
            }
        },
        methods:{
           editorChange(editor){
              this.currentNum=editor.getText().length;
              this.$emit('change',editor.children,editor.getHtml());
           },
           /*
           * 获取保存前数组和添加记录数组对比，返回差异数组
           * @returns 返回差异数组
           */
           getDiffImageList(){
              let endImageList= getEditor(this.editorId).getElemsByType('image');
              let longImageList =[];
              let shortImageList =[];
              if ((endImageList.length == 0  && this.insertImageList.length == 0) || (arrayEqual(this.insertImageList,endImageList)))return [];
              //这里之所以写两边是因为需要考虑 两个数组相等时问题，如果相等保证两个选择是值能分别代替不同的数组
              longImageList = endImageList.length >= this.insertImageList.length ?  endImageList : this.insertImageList;
              shortImageList = this.insertImageList.length <= endImageList.length  ?  this.insertImageList : endImageList;
              longImageList = longImageList.filter((item)=>{
                   return shortImageList.findIndex(sItem=>{return sItem.src == item.src}) == -1  ? true : false;
              }).map(item=>{
                   return {fileName:item.src.split('/')[4]};
              });
              return longImageList;
           },
            /**
             * 删除差异图片文件
             */
           deleDiffImageList(){
                this.diffImageList = this.getDiffImageList();
                if( this.diffImageList.length ){
                   this.$https.post(deleteFile,{delList:this.diffImageList}).then((res)=>{
                       if(res.code == 200){
                           this.clearImageList();
                           this.$message.success("图片删除成功");
                       }else{
                           this.$message.error("删除失败");
                       }
                   })
               }
           },
            /**
             * 清空已删除的数组，同步记录数组已删除清空
             */
           clearImageList(){
               this.insertImageList=this.insertImageList.filter(item=>{
                   return this.diffImageList.findIndex(sItem=>{return sItem.fileName == item.src.split('/')[4]}) == -1  ? true : false;
               })
               this.diffImageList=[];
           },
        },
        created() {
            let this_=this;
            this.editorConfig.MENU_CONF["insertImage"]={
                onInsertedImage(imageNode){
                    if (imageNode == null) return
                    this_.insertImageList.push(imageNode);
                }
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
        height:calc(100vh - 320px);
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
    .editor_default{
        height:calc(100vh - 320px);
        border-radius: @theme-boder-radius-width;
    }
    .editor-box{
        margin: 30px auto 50px auto;
        width: 850px;
    }
    .editor-container{
        width: 100%;
        background-color: #fff;
        padding: 20px 50px 50px 50px;
        border: 1px solid #e8e8e8;
        box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
    }
    .editor-tips{
        width: 100%;
    }
</style>