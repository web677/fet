const fs = require('fs');
const path = require('path')
const tinify = require('tinify')
const CONFIG = require('../config/common')

tinify.key = CONFIG.tinypng.key

const SUPPORT = {
    tiny: /\.(png|jpg|jpeg)$/,
    base64: /\.(png|jpg|gif|jpeg|webp)$/
}

export async function compress (files) {
    let result = {
        code: 0,
        message: 'SUCCESS',
        data: {}
    }
    let list = []

    if (files.length > 20) {
        result = {
            message: '单次上传请勿超过20张图！',
            code: 1001,
            data: {}
        }

        return result
    }

    for (let i = 0; i < files.length; i++) {
        let file = files[i]

        if (file.type.indexOf('image') === -1) {
            list.push({
                status: 0,
                name: file.name,
                type: file.type,
                size_origin: file.size,
                size: file.size,
                info: '非图片格式'
            })
            continue;
        }
        if (!(SUPPORT.tiny.test(file.name))) {
            list.push({
                status: 0,
                name: file.name,
                type: file.type,
                size_origin: file.size,
                size: file.size,
                info: '不支持的图片格式'
            })
            continue;
        }

        if (file.size > 1024 * 1024 * 5) {
            list.push({
                status: 0,
                name: file.name,
                type: file.type,
                size_origin: file.size,
                size: file.size,
                info: '单张图不得超过5M'
            })
            continue;
        }

        let filePath = file.path,
            fileDirname = path.dirname(filePath),
            fileBasename = path.basename(filePath),
            fileSourcePath = path.join(fileDirname, 'source', fileBasename)

        _mkdirSync(path.join(fileDirname, 'source'))
        fs.writeFileSync(fileSourcePath, fs.readFileSync(filePath))

        let source = await tinify.fromFile(filePath)
        let result = await source.toFile(filePath)

        list.push({
            status: 1,
            name: file.name,
            type: file.type,
            size_origin: file.size,
            size: fs.statSync(filePath).size,
            info: 'success'
        })
    }

    result.data = {
        list
    };

    return result
}

export async function toBase64 (image) {
    let result = {
        code: 0,
        message: 'SUCCESS',
        data: {}
    }

    if (image.type.indexOf('image') === -1) {
        return {
            code: 1002,
            message: '仅支持处理图片格式文件哦',
            data: {}
        }
    }

    if (!(SUPPORT.base64.test(image.name))) {
        return {
            code: 1003,
            message: '不支持的图片格式文件哦',
            data: {}
        }
    }

    let filePath = image.path,
        fileName = image.name,
        imgType = _getImageType(fileName);

    let buffer = await fs.readFileSync(filePath);

    if (!buffer) {
        return {
            code: 1004,
            message: '图片读取失败~',
            data: {}
        }
    }

    let resStr = `data: image/${imgType};base64,${buffer.toString('base64')}`;

    result.data = {
        value: resStr,
        size: _base64Size(resStr)
    };

    return result;
}

function _mkdirSync (path) {
    try {
        fs.mkdirSync(path)
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}

function _getImageType (str) {
    return str.match(SUPPORT.base64)[1];
}

// 计算base64字符串大小
function _base64Size (str) {
    let len = str.length;

    return len > 1024 ? `${(len / 1024).toFixed(2)}kb` : `${len}b`;
}

// 计算base64原始图片大小
function _base64OriginSize (str) {
    let dataStr = str.replace(/^data:image\/\w+;base64,/, "");
    let equalIndex = dataStr.indexOf('=');

    if (dataStr.indexOf('=') > 0) {
        dataStr = dataStr.substring(0, equalIndex);
    }

    let len = dataStr.length;
    let fileLength = len - (len / 8) * 2;

    return fileLength > 1024 ? `${(fileLength / 1024).toFixed(2)}kb` : `${fileLength}b`;
}

export default {
    compress,
    toBase64
}
