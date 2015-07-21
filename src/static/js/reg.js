$(function(){

    //注册验证
    $("#reg-form").validate({
        rules: {
            operator: {
                remote: "/checkOperate",
                required:true,
                rangelength:[2,15]
            },
            passwd: {
                required:true,
                minlength:5
            },
            repasswd: {
                required:true,
                equalTo:'#passwd'
            },
            validateCode: {
                remote: "/checkValidateCode",
                required:true,
                maxlength:4,
                minlength:4
            },
            test:{
                required:true
            }
        },
        messages:{
            operator:{
                "remote": "对不起，用户名已经被使用",
                "required":"用户名必须填写",
                "rangelength":"用户名长度为2-15位"
            },
            passwd:{
                "required":"密码必须填写",
                "minlength":"密码最少5位"
            },
            repasswd: {
                "required":"请输入确认密码",
                "equalTo":"两次密码必须相同"
            },
            validateCode: {
                "remote": "验证码错误",
                "required":"验证码不能为空",
                "maxlength":"请输入4位验证码",
                "minlength":"请输入4位验证码"
            },
            test:{
                "required":"text不能为空",
            }
        },
        success: function(label) {
            label.addClass("success");
        },
        highlight: function(element, errorClass) {
            $(element).parent().find("." + errorClass).removeClass("success");
        },
        errorPlacement:function(error, element) {
            element.parent().next(".reg-help").remove();
            error.appendTo(element.parent());
        }
    });

    //邮箱自动完成
    $(".email").mailAutoComplete();

    //注册按钮
    $("#reg-btn").click(function(){
        if($("#reg-form").valid()){
            var _this=$(this)
            _this.btn("loading")
            $.post("/register",toObj($("#reg-form"))).success(function(result){
                if(result.code=="200"){
                    dialog.error("提示","注册成功，下一步?")
                }else{
                    showError(result.msg)
                }
                _this.btn("reset")
            })
        }
    })

    //验证码刷新
    $(".reg-code-img").click(function () {
        changeCode()
    })
    function changeCode(){
        $(".reg-code-img").attr("src","/validateCode?"+new Date().getTime())
    }


})