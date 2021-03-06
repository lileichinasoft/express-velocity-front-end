var afterTran;

afterTran = function() {
  $("#realinfo-form").validate($.extend({}, validBase, {
    rules: {
      firstName: {
        required: true,
        maxlength: 5,
        chinese: true
      },
      lastName: {
        required: true,
        maxlength: 15,
        chinese: true
      },
      custGender: {
        required: true
      },
      BirthMonth: {
        required: true
      },
      BirthDay: {
        required: true
      }
    },
    messages: {
      firstName: {
        required: $.t("valid.safe.1")
      },
      lastName: {
        required: $.t("valid.safe.1")
      },
      custGender: {
        required: $.t("valid.safe.2")
      },
      BirthMonth: {
        required: $.t("valid.safe.3")
      },
      BirthDay: {
        required: $.t("valid.safe.4")
      }
    }
  }));
  $("#btn-realinfo").click(function() {
    return $(this).commit($("#realinfo-form"), "/sidCustInfo/savePersonInfo", (function() {
      return dialog.info($.t("base:edit_ok"), function() {
        return location.reload();
      });
    }), null, function(data) {
      return $.fn.extend({}, data, {
        birthDate: data.BirthYear + "-" + data.BirthMonth + "-" + data.BirthDay
      });
    });
  });
  $(document).on("click", "#btn-passw", function() {
    return $(this).commit($("#pass-form"), "/sidCustInfo/savePassword", function() {
      return dialog.info($.t("base:edit_ok"), function() {
        return location.reload();
      });
    });
  });
  return $(document).on("show", ".pass-show", function() {
    return $("#pass-form").validate($.extend({}, validBase, {
      rules: {
        oldPassword: {
          required: true,
          rangelength: [6, 12],
          string: true
        },
        newPassword: {
          required: true,
          rangelength: [6, 12],
          notEqual: "#oldPassword",
          string: true
        },
        newPassword2: {
          required: true,
          equalTo: "#newPassword"
        }
      },
      messages: {
        oldPassword: {
          required: $.t("valid.pass.1"),
          rangelength: $.t("valid.pass.2"),
          string: $.t("valid.pass.7")
        },
        newPassword: {
          required: $.t("valid.pass.3"),
          rangelength: $.t("valid.pass.4"),
          string: $.t("valid.pass.7")
        },
        newPassword2: {
          required: $.t("valid.pass.5"),
          rangelength: $.t("valid.pass.6")
        }
      }
    }));
  });
};
