<template>
    <div id="app">
        <div class="header"></div>
        <ul class="nav">
            <router-link class="nav-item" to="/Tiny">TinyPng</router-link>
            <router-link class="nav-item" to="/ToBase64">编码转换</router-link>
            <router-link class="nav-item" to="/ToBase64">色值转换</router-link>
            <router-link class="nav-item" to="/ToBase64"
                >代码格式化</router-link
            >
        </ul>
        <router-view id="J_main_webview" class="main-webview" />
    </div>
</template>

<script>
export default {};
</script>
<style lang="less">
@import "../public/base.css";
body {
    padding: 40px 0 0 120px;
    background: #fff;
    -webkit-app-region: drag;
    font-family: Arial, Helvetica, sans-serif;
}

#app{
    width: 100%;
    height: 100%;
}

.nav {
    position: fixed;
    width: 120px;
    height: 100%;
    top: 0;
    left: 0;
    padding: 40px 0 0;
    box-sizing: border-box;
    background: #ededed;
    z-index: 5;
    .nav-item {
        position: relative;
        display: block;
        flex: 1;
        line-height: 60px;
        padding: 0 20px;
        font-size: 14px;
        color: #40444f;
        cursor: pointer;
        -webkit-app-region: no-drag;
        -webkit-user-select: none;
        transition: all 0.2s ease-in-out;
        &:not(:last-child)::before {
            content: "";
            position: absolute;
            width: 1px;
            height: 30px;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #ededed;
            z-index: 2;
        }
        &::after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            background: #f47d43;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.2s ease-in-out;
        }
        &:hover,
        &.cur {
            color: #f47d43;
            &::after {
                width: 100%;
            }
        }
    }
}

.header {
    position: fixed;
    width: 100%;
    height: 40px;
    top: 0;
    left: 0;
    background: #f9f9f9;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.main-webview {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-app-region: no-drag;
}
</style>
