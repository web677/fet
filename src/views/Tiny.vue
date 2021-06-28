<template>
    <div class="page">
        <div class="main-area">
            <div class="action-box">
                <p class="title">选择操作</p>
                <div class="action-list">
                    <div
                        v-show="state == 'pending'"
                        @click="busy"
                        class="action-mask"
                    ></div>
                    <label
                        v-for="(item, index) in actionList"
                        :key="index"
                        class="action-item"
                        ><input
                            type="radio"
                            name="action"
                            v-model="actionType"
                            :value="item.type"
                        />{{ item.txt }}</label
                    >
                    <button class="btn" @click="clear">清空</button>
                </div>
            </div>

            <div
                class="tiny-box"
                @dragenter="dragOver"
                @dragleave="dragLeave"
                @dragover="dragOver"
                @drop="drop"
            >
                <div
                    class="tiny-box-step"
                    :class="{
                        busy: state == 'pending',
                        complete: state == 'resolve',
                    }"
                ></div>
                <p v-if="hover" class="tiny-box-tips busy">松开鼠标开始处理</p>
                <p
                    v-else-if="!hover && state == 'pending'"
                    class="tiny-box-tips busy"
                >
                    处理中···
                </p>
                <p
                    v-else-if="!hover && state == 'resolve'"
                    class="tiny-box-tips busy"
                >
                    处理完成···
                </p>
                <p v-else class="tiny-box-tips">
                    Drop your .png or .jpg files here!
                </p>

                <p class="tiny-box-tips tiny-box-subtips J_tiny_subtips">
                    Up to {{ max.num }} images, max {{ max.size }} MB each.
                </p>
                <div v-show="tinyResult && tinyResult.length" class="tiny-info">
                    <ul class="tiny-info-list">
                        <li
                            class="line1"
                            v-for="(item, index) in tinyResult"
                            :key="index"
                        >
                            <template v-if="item.status == 1">
                                [{{ item.name }}]：<span class="num"
                                    >{{
                                        (item.size_origin / 1000).toFixed(2)
                                    }}KB</span
                                >&nbsp;&nbsp;➥&nbsp;&nbsp;<span
                                    class="num after"
                                    >{{ (item.size / 1000).toFixed(2) }}KB</span
                                >，压缩比例:【<span class="num after"
                                    >{{
                                        (
                                            ((item.size_origin - item.size) /
                                                item.size_origin) *
                                            100
                                        ).toFixed(0)
                                    }}%</span
                                >】
                            </template>
                            <template v-else>
                                [{{ item.name }} ]处理失败：<span
                                    class="error"
                                    >{{ item.info }}</span
                                >
                            </template>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-if="actionType > 0" class="main-area">
            <div class="action-box">
                <p class="title">Base64输出结果</p>
                <div class="action-list">
                    <button
                        v-show="base64Result && base64Result.value"
                        class="btn"
                        @click="copyBase64"
                    >
                        复制结果<span>({{ base64Result.size }})</span>
                    </button>
                </div>
            </div>
            <div class="base-result">
                <textarea
                    :value="base64Result.value"
                    readonly
                    type="text"
                    placeholder="内容会自动生成..."
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "fvmu";
import { compress, toBase64 } from "../../public/tiny";
import copy from 'copy-to-clipboard';
// import tiny from 'tinify'

export default {
    name: "Tiny",
    data () {
        return {
            state: "free",
            hover: false,
            actionType: 0,
            actionList: [
                { name: "compress", type: 0, txt: "TinyPng压缩" },
                { name: "tobase64", type: 1, txt: "图片转Base64" },
                { name: "compresstobase64", type: 2, txt: "压缩并转为Base64" },
            ],
            tinyResult: [],
            base64Result: {
                value: '',
                size: 0
            },
        };
    },
    computed: {
        max () {
            return this.actionType > 0 ?
                {
                    num: 1, size: 1
                } : {
                    num: 20, size: 5
                };
        }
    },
    watch: {
        actionType () {
            this.clear();
        }
    },
    methods: {
        dragLeave () {
            this.hover = false;
        },
        dragOver () {
            this.clear();
            if (this.state == "pending") {
                return;
            }
            this.tinyResult = [];
            this.state = "free";
            this.hover = true;
        },
        drop (e) {
            let files = e.dataTransfer.files;
            let filesAry = Array.from(files);

            if (files.length > this.max.num) {
                this.clear();
                return Toast.open(`单次上传图片数量不能超过${this.max.num}哦~`);
            }

            if (filesAry.some(file => file.type.indexOf('image') === -1)) {
                this.clear();
                return Toast.open(`仅支持处理图片格式文件哦~`);
            }

            if (filesAry.some(file => file.size > 1024 * 1024 * this.max.size)) {
                this.clear();
                return Toast.open(`单张图片大小不能超过${this.max.size}哦~`);
            }

            this.state = "pending";
            this.hover = false;

            switch (this.actionType) {
                case 0:
                    this.compress(files);
                    break;
                case 1:
                    this.toBase64(files[0]);
                    break;
                case 2:
                    this.compress(files)
                        .then(res => {
                            this.toBase64(files[0]);
                        }).catch(({ message }) => {
                            Toast.open(message || '系统异常~');
                        });
                    break;
                default:
                    break;
            }
        },
        compress (files) {
            return new Promise((resolve, reject) => {
                compress(files).then(res => {
                    this.state = "resolve";
                    if (res.code != 0) {
                        return Toast.open(res.message)
                    }


                    this.tinyResult = res.data.list;
                    resolve();
                }).catch((e) => {
                    this.state = "resolve";
                    reject({
                        code: 2001,
                        message: '图片压缩失败~'
                    });
                })
            })
        },
        toBase64 (image) {
            toBase64(image).then(({ code, data, message } = {}) => {
                this.state = "resolve";
                if (code != 0) {
                    return Toast.open(message)
                }

                this.base64Result = {
                    value: data.value,
                    size: data.size
                }
            }).catch((e) => {
                this.state = "resolve";
            })
        },
        busy () {
            Toast.open("图片处理中，请等待当前操作完成~");
        },
        clear () {
            this.state = "free";
            this.tinyResult = [];
            this.hover = false;
            this.base64Result = {};
        },
        copyBase64 () {
            let txt = this.base64Result.value;
            if (txt && copy(txt)) {
                Toast.open('复制成功~');
            } else {
                Toast.open('复制失败，请尝试手动复制~');
            }
        },
    },
};
</script>

<style lang="less" scoped>
.page {
    background: #fff;
    // background: url("~@assets/images/body-bg.png") no-repeat center center /
    //     100% 100%;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
    .main-area {
        display: flex;
        margin: 20px;
        padding: 0 0 20px;
        border-bottom: 1px solid #ebebeb;
        align-items: flex-start;
        justify-content: space-around;
        .action-box {
            width: 150px;
            .title {
                line-height: 30px;
                font-size: 16px;
                font-weight: bold;
                color: #333;
            }
            .action-list {
                position: relative;
                font-size: 13px;
                cursor: pointer;
                .action-mask {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background: rgba(0, 0, 0, 0.6);
                    opacity: 0;
                    cursor: pointer;
                }
                .action-item {
                    display: block;
                    line-height: 30px;
                    margin: 10px auto;
                    cursor: pointer;
                }
            }
        }
        .tiny-box {
            position: relative;
            flex: 1;
            height: 258px;
            margin: 0 20px;
            border: 1.5px dashed #616778;
            border-radius: 6px;
            overflow: hidden;
            -webkit-app-region: drag;

            .tiny-box-step {
                width: 200px;
                height: 100px;
                margin: 50px auto 20px;
                background: url("~@assets/images/main-bg.png") no-repeat center
                    center;
                background-size: 80px;
                &.busy {
                    background: url("~@assets/images/busy.png") no-repeat center
                        center;
                    background-size: 80px;
                    animation: busy 0.8s cubic-bezier(0.28, 1.01, 0.82, 1.03)
                        infinite;
                }
                &.complete {
                    background: url("~@assets/images/complete.png") no-repeat
                        center center;
                    background-size: 80px;
                }
            }

            .tiny-box-tips {
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-size: 17px;
                color: #40444f;
                &.busy {
                    color: #f94c00;
                }
            }

            .tiny-box-subtips {
                margin: 10px auto 0;
                font-size: 12px;
                opacity: 0.7;
                &.red {
                    opacity: 1;
                    color: #f94c00;
                }
            }
            .tiny-info {
                position: absolute;
                width: 100%;
                max-height: 120px;
                padding: 5px 10px;
                line-height: 22px;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                box-sizing: border-box;
                font-size: 11px;
                color: #fff;
                overflow: hidden;
                .tiny-info-list {
                    height: 100%;
                    max-height: 120px;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    .num {
                        display: inline-block;
                        min-width: 48px;
                        text-align: center;
                        color: #f47d43;
                        font-weight: 500;
                    }
                    .error {
                        color: #f47d43;
                        font-weight: 500;
                    }
                    .after {
                        color: #8cc938;
                        font-weight: 500;
                    }
                }
            }
        }
        .base-result {
            position: relative;
            flex: 1;
            margin: 0 20px;
            border: 1.5px dashed #616778;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;

            textarea {
                width: 100%;
                height: 90px;
                padding: 5px 10px;
                border: 0;
                box-sizing: border-box;
                resize: none;
                line-height: 20px;
                font-size: 10px;
                color: #666;
                word-break: break-all;
            }
        }
    }
}

@keyframes busy {
    0% {
        transform: rotateZ(0);
    }
    100% {
        transform: rotateZ(180deg);
    }
}
</style>