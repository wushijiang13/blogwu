<template>
    <div class="wu-button">
        <p class="button-left">
        <span class="btn-icon">
           <slot name="btn-icon"/>
        </span>
            <span class="btn-text">
          <slot name="btn-text"/>
        </span>
        </p>
        <p class="button-right">
        <span class="btn-num">
          <slot  name="btn-num"/>
        </span>
        </p>
    </div>
</template>

<script>
    export default {
        name: "wu-button",
    }
</script>

<style lang="less" scoped>
    .wu-button{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: @theme-unimportant-size;
        height: 1.8rem;
    }
    .button-left,.button-right{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 1.4rem;
        text-align: center;
        padding: 0px 0.6rem;
        height:1.8rem;
        line-height:@theme-unimportant-size;
        vertical-align: middle;
        color:@theme-button-default-color
    }
    .btn-icon{
        vertical-align: text-top;
        margin-right: 4px;
    }
    .button-left{
        border-bottom-left-radius:@theme-boder-radius-width;
        border-top-left-radius:@theme-boder-radius-width;
        border: 1px solid @theme-button-default-border-color;
        background-color: @theme-button-default-bg-color;
    }
    .button-right{
        border-bottom-right-radius:@theme-boder-radius-width;
        border-top-right-radius:@theme-boder-radius-width ;
        border-top: 1px solid @theme-font-4-color;
        border-right: 1px solid @theme-font-4-color;
        border-bottom: 1px solid @theme-font-4-color;
        background-color: @body-bg-color;
    }
</style>
