exports.test_s = {
    data: function () {
        return {
            dsf_eer: ""
        }
    },
    methods: {
        dsf_jh_s(ty) {
            let th = this
            if (ty == 1) { //拍照
                plus.camera.getCamera().captureImage(function (p) {

                    th.up_img(p)
                    plus.io.resolveLocalFileSystemURL(p, function (entry) {
                        th.dsf_eer = entry.toRemoteURL() //浏览图片
                    }, function (e) {
                        alert('读取录像文件错误：' + e.message);
                    });
                });
            } else { //相册
                plus.gallery.pick(function (p) {
                    th.up_img(p)
                    plus.io.resolveLocalFileSystemURL(p, function (entry) {
                        th.dsf_eer = entry.toRemoteURL() //浏览图片
                    }, function (e) {
                        alert('读取录像文件错误：' + e.message);
                    });
                })
            }
        },
        up_img(path) {
            var task = plus.uploader.createUpload("http://192.168.0.62:8084/up_img", {
                    method: "POST",
                    blocksize: 204800,
                    priority: 100
                },
                function (t, status) {
                    // 上传完成
                    if (status == 200) {
                        alert(JSON.stringify(t.responseText));
                    } else {
                        alert("Upload failed: " + status);
                    }
                }
            );
            task.addFile(path, {
                key: "file"
            });
            task.addData("string_key", "string_value");
            task.start();
        }

    },
}




//两个日期相隔的多少天
exports.getDateperiod = function (start, finish) {
    return Math.abs(start * 1 - finish * 1) / 60 / 60 / 1000 / 24
}
//传入一个date类型的日期，求出它所在的月的最后一天
exports.getLastDateInMonth = function (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}
//判断是否闰年
exports.isLeapYeat = function (date) {
    return new Date(date.getFullYear(), 2, 0).getDate() == 29
}
//获取当前月的天数
exports.getDaysInMoth = function (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
//日期格式化
exports.time_c = function (t) {
    let time = new Date()
    time.setTime(t * 1000)
    let Year = time.getFullYear(),
        Month = time.getMonth() + 1,
        Data = time.getDate()
    return Year + "-" + Month + "-" + Data
}
