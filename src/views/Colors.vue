<template>
    <div class="page">
        <div class="colors">
            <div class="left">
                <input
                    class="area"
                    type="text"
                    rows="1"
                    placeholder="输入需要转换的色值"
                    v-model="input"
                    maxlength="30"
                />
                <div class="color" :style="`background-color: ${hex};`"></div>
            </div>
            <div class="center">➥</div>
            <div class="right">
                <div class="result">
                    <input
                        type="text"
                        maxlength="20"
                        placeholder="hex"
                        class="item"
                        :value="hex"
                    />
                    <input
                        type="text"
                        maxlength="20"
                        placeholder="rgb"
                        class="item"
                        :value="rgb"
                    />
                    <input
                        type="text"
                        maxlength="20"
                        placeholder="hsl"
                        class="item"
                        :value="hsl"
                    />
                    <input
                        type="text"
                        maxlength="20"
                        placeholder="hwb"
                        class="item"
                        :value="hwb"
                    />
                    <input
                        type="text"
                        maxlength="20"
                        placeholder="keyword"
                        class="item"
                        :value="keyword"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "fvmu";
import colorString from 'color-string';

export default {
    data () {
        return {
            input: '',
        }
    },
    computed: {
        origin () {
            let res = colorString.get(this.input);
            return res && res.value;
        },
        hex () {
            let origin = this.origin;
            return origin && colorString.to.hex(origin) || '';
        },
        rgb () {
            let origin = this.origin;
            return origin && colorString.to.rgb(origin) || '';
        },
        hsl () {
            let origin = this.origin;
            return origin && colorString.to.hsl(origin) || '';
        },
        hwb () {
            let origin = this.origin;
            return origin && colorString.to.hwb(origin) || '';
        },
        keyword () {
            let origin = this.origin;
            return origin ? colorString.to.keyword(origin) || '无' : '';
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

    .colors {
        display: flex;
        align-items: flex-start;
        .left {
            .area {
                display: flex;
                align-items: center;
                width: 280px;
                height: 50px;
                line-height: 20px;
                padding: 0 10px;
                border: 1.5px dashed #616778;
                resize: none;
                font-size: 16px;
                color: #333;
                box-sizing: border-box;
                word-break: break-all;
                border-radius: 3px;
            }

            .color {
                width: 280px;
                height: 173px;
                margin: 20px auto 0;
                border-radius: 5px;
            }
        }
        .center {
            width: 100px;
            line-height: 50px;
            color: #3f444f;
            font-size: 38px;
            text-align: center;
        }
        .right {
            flex: 1;
            .result {
                display: flex;
                flex-direction: column;
                border-radius: 3px;

                .item {
                    width: 220px;
                    line-height: 28px;
                    margin: 0 0 18px;
                    font-size: 15px;
                    padding: 2px 10px;
                    border: 1px solid #616778;
                    border-width: 0.5px;
                    color: #111;
                }
            }
        }
    }
}
</style>