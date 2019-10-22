/**
 * FileName: RNFSUtils.js
 * Author: hf
 * Date: 2019/2/11 14:39
 * Description:封装对文件的【下载、文本写入、文本读取、文本追加、删除】的工具类方法
 *
 * History:
 * <author:>          <time:>          <version:>          <desc:>
 */
import RNFS from 'react-native-fs';


/** @namespace RNFS.ExternalDirectoryPath */
/**
 * 常用文件存储目录(ios与android)
 *
 * RNFS.MainBundlePath
 * RNFS.CachesDirectoryPath
 * RNFS.DocumentDirectoryPath
 * RNFS.TemporaryDirectoryPath
 * RNFS.LibraryDirectoryPath
 * RNFS.ExternalDirectoryPath
 * RNFS.ExternalStorageDirectoryPath

 */
const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;


/**
 * 功能描述: <br>
 * 〈文件下载(图片、文件、音频、视频)〉
 *
 * @MethodName: downloadFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:46
 * @Param: [formUrl 要下载的文件地址, targetName 目标文件名称(类似text.txt)]
 *
 * History:
 * <author:>          <time:>          <version:>          <desc:>
 */
export const downloadFile = (formUrl, targetName) => {
    // 获取下载文件本地保存路径
    const toLoadPath = `${ExternalDirectoryPath}/${targetName}`;
    RNFS.downloadFile({
        fromUrl: formUrl,
        toFile: toLoadPath,
        progressDivider: 5,
        begin: (res) => {
            console.log('begin', res);
        },
        progress: (res) => {
            console.log('progress', res)
        }
    }).promise.then(res => {
        console.log(res, '下载成功!!');
    }).catch(err => {
        console.log(err, '下载失败!!');
    });
};

/**
 * 功能描述: <br>
 * 〈将内容写入本地文本〉
 *
 * @MethodName: writeFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:47
 * @Param: [content 文本内容, unicode 字符编码 targetName 目标文件名称(类似text.txt)]
 *
 * History:
 * <author:>          <time:>          <version:>          <desc:>
 */
export const writeFile = (content, unicode = 'utf8', targetName) => {
    const path = `${ExternalDirectoryPath}/${targetName}`;
    RNFS.writeFile(path, content, unicode)
        .then(result => {
            console.log(result, '写入本地文件成功!!');
        });
};


/**
 * 功能描述: <br>
 * 〈读取文本内容〉
 *
 * @MethodName: readFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:48
 * @Param: [fileName 文件名称，callback 回调函数获得读取的文件内容]
 *
 * History:
 * <author:>          <time:>          <version:>          <desc:>
 */
export const readFile = (fileName, callback) => {
    RNFS.readFile(`${ExternalDirectoryPath}/${fileName}`)
        .then(result => {
            callback(result)
        });
};

/**
 * 功能描述: <br>
 * 〈在已有的txt上添加新的文本〉
 *
 * @MethodName: appendFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:49
 * @Param: [filePath 要追加的目标文本路径, content 要添加的文本信息, unicode 字符编码]
 *
 * History:
 * <author:>          <time:>          <version:>          <desc:>
 */
export const appendFile = (filePath, content, unicode = 'utf8') => {
     RNFS.appendFile(`${ExternalDirectoryPath}/${filePath}`, content, unicode)
        .then(result => {
            console.log(result, '追加文本成功!!');
        });
};

/**
 * 功能描述: <br>
 * 〈删除本地文件〉
 *
 * @MethodName: deleteFile
 * @Author: hf
 * @Version: 1.0.0
 * @Date: 2019/2/11 14:49
 * @Param: targetName 要删除的文件名称
 *
 * History:
 * <author:>          <time:>          <version:>          <desc:>
 */
export const deleteFile = targetName => {
     RNFS.unlink(`${ExternalDirectoryPath}/${targetName}`)
        .then(result => {
            console.log(result, '删除成功!!');
        });
};