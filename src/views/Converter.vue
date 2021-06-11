<template>
    <div class="page">
        <textarea
            class="area"
            type="text"
            placeholder="粘贴需要转换的字符串"
            v-model="input"
        ></textarea>
        <div class="btns">
            <button class="btn" @click="encode">Encode</button>
            <button class="btn" @click="decode">Decode</button>
            <button class="btn" @click="md5">MD5</button>
        </div>
        <textarea
            class="area"
            type="text"
            v-model="output"
            placeholder="输出结果"
        ></textarea>
    </div>
</template>

<script>
import { Toast } from "fvmu";
const crypto = require('crypto');

export default {
    data () {
        return {
            input: '',
            output: ''
        }
    },
    watch: {
        input () {
            this.output = '';
        }
    },
    methods: {
        encode () {
            let input = this.input;
            if (!input) {
                return Toast.open('输入不能为空~');
            }

            this.output = encodeURIComponent(input);
        },
        decode () {
            let input = this.input;
            if (!input) {
                return Toast.open('输入不能为空~');
            }

            try {
                this.output = decodeURIComponent(input);
            } catch ({ message }) {
                this.output = `解码异常：${message}`;
            }
        },
        md5 () {
            let md5 = crypto.createHash('md5');
            let input = this.input;
            if (!input) {
                return Toast.open('输入不能为空~');
            }

            this.output = md5.update(input).digest('hex');
        }
    },
}
</script>

<style lang="less" scoped>
.page {
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    .area {
        width: 100%;
        height: 150px;
        padding: 5px 10px;
        border: 1.5px dashed #616778;
        box-sizing: border-box;
        resize: none;
        line-height: 20px;
        font-size: 13px;
        color: #333;
        word-break: break-all;
        border-radius: 3px;
    }
    .btns {
        margin: 0 0 10px 0;
        .btn {
            margin: 0 20px 0 0;
        }
    }
}
</style>