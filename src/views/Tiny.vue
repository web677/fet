<template>
    <div class="page">
        <div class="main-area">
            <div class="action-box">
                <p class="title">选择操作</p>
                <div class="action-list">
                    <label class="action-item"
                        ><input
                            type="radio"
                            name="action"
                            value="0"
                        />TinyPng压缩</label
                    >
                    <label class="action-item"
                        ><input
                            type="radio"
                            name="action"
                            value="2"
                        />图片转base64</label
                    >
                    <label class="action-item"
                        ><input
                            type="radio"
                            name="action"
                            value="1"
                        />压缩后转base64</label
                    >
                </div>
            </div>

            <div class="tiny-box" id="J_tiny_box">
                <div class="tiny-box-step J_tiny_step"></div>
                <p class="tiny-box-tips J_tiny_tips">
                    Drop your .png or .jpg files here!
                </p>
                <p class="tiny-box-tips tiny-box-subtips J_tiny_subtips">
                    Up to 20 images, max 5 MB each.
                </p>
                <div class="tiny-info">
                    <ul class="tiny-info-list">
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                        <li class="line1">
                            原图:【<span class="num">4.3KB</span
                            >】压缩后:【<span class="num after">4.3KB</span
                            >】图片:【某某某】
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="main-area">
            <div class="action-box">
                <p class="title">输出结果</p>
                <button class="btn">重置</button>
            </div>
            <div class="base-result">
                <textarea
                    readonly
                    type="text"
                    placeholder="内容会自动生成..."
                ></textarea>
                <div class="result-info">
                    <p class="line1">
                        原图:【<span class="num">4.3KB</span>】Base64:【<span
                            class="num after"
                            >4.3KB</span
                        >】图片:【某某某】
                    </p>
                    <button class="btn-copy">复制结果</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Tiny",
    components: {
        HelloWorld,
    },
};
</script>

<style lang="less">
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
                font-size: 13px;
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

            .tiny-box-step {
                width: 200px;
                height: 100px;
                margin: 50px auto 20px;
                background: url("~@assets/images/main-bg.png") no-repeat center
                    center / 80px;
                &.dealling {
                    background: url("~@assets/images/tinify.png") no-repeat
                        center center / 160px;
                }
            }

            .tiny-box-tips {
                text-align: center;
                font-size: 17px;
                color: #40444f;
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
                        width: 48px;
                        text-align: center;
                        color: #f47d43;
                    }
                    .after {
                        color: #8cc938;
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
            }
            .result-info {
                position: absolute;
                width: 100%;
                height: 100%;
                line-height: 22px;
                padding: 5px 10px;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                box-sizing: border-box;
                font-size: 11px;
                color: #fff;
                text-align: center;
                transition: all 0.3s ease-in-out;
                transform: translateY(60px);
                .num {
                    display: inline-block;
                    width: 48px;
                    text-align: center;
                    color: #f47d43;
                }
                .after {
                    color: #8cc938;
                }
                .btn-copy {
                    width: 120px;
                    height: 30px;
                    line-height: 20px;
                    margin: 15px auto;
                    border: 0;
                    border-radius: 1px;
                    font-size: 10px;
                    color: #333;
                    outline: none;
                    appearance: none;
                    cursor: pointer;
                }
            }
            &:hover {
                .result-info {
                    transform: translateY(0);
                }
            }
        }
    }
}
</style>