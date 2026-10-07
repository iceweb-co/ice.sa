/* global $, jQuery*/

function toggleDanger(rawInput, state, message) {
  var input = $(rawInput);
  var feedbackClass = "form-control-feedback";
  var feedbackMessage = input.data("feedback");
  var feedbackDiv = $("<div></div>")
    .addClass(feedbackClass)
    .text(message || feedbackMessage);

  if (state === true) {
    input.parent().addClass("has-danger");
    if ($("." + feedbackClass, input.parent()).length === 0) {
      input.parent().append(feedbackDiv);
    }
  } else {
    input.parent().removeClass("has-danger");
    $("." + feedbackClass, input.parent()).remove();
  }
}

function validateInput(rawInput) {
  var input = $(rawInput);

  if (input.val() === "") {
    toggleDanger(rawInput, true);
    return false;
  }

  toggleDanger(rawInput, false);
  return true;
}

function toggleForm(rawForm, state) {
  var form = $(rawForm);
  if (state === "enabled") {
    $("[name], .contact-form-submit", form).removeAttr("disabled");
  } else {
    $("[name], .contact-form-submit", form).attr("disabled", "true");
  }
}

function submitForm(event) {
  var form = $(event.target);
  var formAction = form.attr("action");
  var formData = form.serialize();
  var formButton = $(".contact-form-submit", form);
  var formButtonText = formButton.text();
  var alert = $(".alert", form);
  var pageLang = $("html").attr("lang");
  var strings = {
    alertSuccess: {
      ar: "شكراً. لقد تم استلام رسالتك بنجاح.",
      en: "Thank you. Your message was delivered successfully",
    },
    alertInputError: {
      ar: "بعض المعلومات غير مكتملة او غير صحيحة",
      en: "Some fields are missing or incorrect",
    },
    alertServerError: {
      ar: "حدث خطاء بالخادم. الرجاء التواصل معنا عير بريدنا الالكتروني",
      en: "There was a server error. Please contact us by email.",
    },
    submitButton: {
      ar: "...جاري الارسال",
      en: "Sending...",
    },
  };

  if (alert.length > 0) {
    alert.remove();
  }

  alert = $(
    '<div class="alert" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
  );

  toggleForm(form, "disabled");
  formButton.text(strings.submitButton[pageLang]);

  jQuery
    .post(formAction, formData, null, "json")

    .done(function handleSubmitDone() {
      alert.addClass("alert-success");
      alert.append(strings.alertSuccess[pageLang]);
    })

    .fail(function handleSubmitFail(jqXHR) {
      var responseJSON = jqXHR.responseJSON;
      alert.addClass("alert-danger");
      if (
        responseJSON !== undefined &&
        Array.isArray(responseJSON.errorFields)
      ) {
        alert.append(strings.alertInputError[pageLang]);
        responseJSON.errorFields.forEach(function applyDanger(fieldData) {
          var field = $("[name=" + fieldData.name + "]", form);
          toggleDanger(field, true, fieldData.error[pageLang]);
        });
      } else {
        alert.append(strings.alertServerError[pageLang]);
      }
    })

    .always(function enableFormAfterSubmit() {
      form.prepend(alert);
      formButton.text(formButtonText);
      toggleForm(form, "enabled");
    });
}

function onSubmitAttempt(event) {
  var requiredFields = event.data;
  var results = requiredFields
    .map(function validateInputWrapper(i, input) {
      return validateInput(input);
    })
    .get();

  event.preventDefault();
  if (Array.prototype.indexOf) {
    if (results.indexOf(false) === -1) {
      submitForm(event);
    }
  }
}

function initializeForm() {
  var form = $("#contact-form");
  var requiredFields = $("[data-required]", form);

  form.on("submit", requiredFields, onSubmitAttempt);
  requiredFields.on("blur change", function validateInputWrapper(event) {
    validateInput(event.target);
  });
  requiredFields.on("focus", function removeDanger(event) {
    toggleDanger(event.target, false);
  });

  toggleForm(form, "enabled");
}

$(function onDocumentReady() {
  initializeForm();
});
