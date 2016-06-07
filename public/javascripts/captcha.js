/**
 * Created by zhangshuji on 2016/5/6.
 */
var handlerPopup = function (captchaObj) {

    $("#popup-submit").click(function () {
        var validate = captchaObj.getValidate();
        if (!validate) {
            alert('请先完成验证！');
            return;
        }
        $.ajax({
            url: "/geetest/validate", // 进行二次验证
            type: "post",
            dataType: "json",
            data: {
                // 二次验证所需的三个值
                geetest_challenge: validate.geetest_challenge,
                geetest_validate: validate.geetest_validate,
                geetest_seccode: validate.geetest_seccode
            },
            success: function (data) {

                if (data && (data.status === "success")) {

                    $(document.body).html('<h1>登录成功</h1>');

                } else {

                    $(document.body).html('<h1>登录失败</h1>');
                }
            }
        });
    });

    // 弹出式需要绑定触发验证码弹出按钮
    captchaObj.bindOn("#popup-submit");

    // 将验证码加到id为captcha的元素里
    captchaObj.appendTo("#popup-captcha");

    // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
};

$.ajax({
    // 获取id，challenge，success（是否启用failback）
    url: "/geetest/register?t=" + (new Date()).getTime(), // 加随机数防止缓存
    type: "get",
    dataType: "json",
    success: function (data) {

        // 使用initGeetest接口
        // 参数1：配置参数
        // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
        initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            product: "popup", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
            offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
        }, handlerPopup);
    }
});