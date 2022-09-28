window.onload = function() {
  window.dispatchEvent(new Event('resize'));
}
window.jQuery = window.$ = jQuery;
/* Embroidery Product page block */
$(function () {
  const container = $("[data-js-embroidery]");
  const toggle = $("[data-js-embroidery-toggle]");
  const slider = $(".slider__clip");
  const previewContainer = $("[data-js-embroidery] .c-embroidery__preview-container");
  const preview = $("[data-js-embroidery] [data-js-embroidery-preview] textPath");
  const previewText = $("[data-js-embroidery] [data-js-embroidery-preview] text");
  const textArea = $("[data-js-embroidery] #customText");
  const colorRadio = $("[data-js-embroidery] .custom-color [type=radio]");
  const styleRadio = $("[data-js-embroidery] .custom-style [type=radio]");
  // Popup
  const previewPopupContainer = $("#popup-embroidery .c-embroidery__preview-container");
  const previewPopup = $("#popup-embroidery [data-js-embroidery-preview] textPath");
  const previewTextPopup = $("#popup-embroidery [data-js-embroidery-preview] text");
  const textAreaPopup = $("#popup-embroidery #customTextPopup");
  const colorRadioPopup = $("#popup-embroidery .custom-color [type=radio]");
  const styleRadioPopup = $("#popup-embroidery .custom-style [type=radio]");
  const containerPopup = $("#popup-embroidery");
  const togglePopup = $("[data-js-embroidery-popup-toggle]");
  const closePopup = $("#popup-embroidery [data-js-embroidery-popup-close]");
  const updateBtn = $("#popup-embroidery .custom-update-btn");
  const addBtn = $("#popup-embroidery .custom-add-btn");
  // Tooltip
  const tooltipBtn = $("[data-js-embroidery-tooltip-toggle]");
  const tooltipPopupBtn = $("[data-js-embroidery-popup-tooltip-toggle]");
  const tooltip = $(".tooltip");
  const tooltipPopup = $(".tooltip-popup");

  function setUpToggle() {
    toggle.click(function() {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        slider.append(previewContainer);
        window.custom['MESSAGE'] = '';
        container.find('#customColor1').prop('checked', true);
        window.custom['COLOR'] = container.find('#customColor1').val().toUpperCase();
        previewText.css({ 'fill': container.find('#customColor1').data( "color" )});
        container.find('#customStyleWhite').prop('checked', true);
        window.custom['STYLE'] = 'BLOCK';
        previewText.attr('class', container.find('#customStyleWhite').data( "font" ));
        container.show();
      } else {
        $(this).removeClass('active');
        previewContainer.remove();
        container.hide();
        textArea.val("");
        preview.text("")
        colorRadio.prop('checked', false);
        styleRadio.prop('checked', false);
        window.custom = {};
      }
    });
  }
  function setUpTogglePopup() {
    closePopup.click(function () {
      containerPopup.hide();
      window.custom['MESSAGE'] = '';
      window.custom['STYLE'] = '';
      window.custom['COLOR'] = '';
      textAreaPopup.val("");
      previewPopup.text("");
    })
    togglePopup.click(function() {
      containerPopup.toggle();
      window.custom['MESSAGE'] = '';
      window.custom['STYLE'] = styleRadioPopup.filter(':checked').val().toUpperCase();
      window.custom['COLOR'] = colorRadioPopup.filter(':checked').val().toUpperCase();
      textAreaPopup.val("");
      previewPopup.text("");
    });
  }
  function setUpTextField() {
    textArea.on("change keyup paste", function() {
      var message = $(this).val();
      if(/^[a-zA-Z0-9\s]+$/.test(message) && message.length >= $(this).attr('minlength')) {
        $(this).css("border","1px solid rgba(0,0,0,.2)");
        preview.text(message);
        window.custom['MESSAGE'] = message;
        window.custom['STYLE'] = styleRadio.filter(':checked').val().toUpperCase();
        window.custom['COLOR'] = colorRadio.filter(':checked').val().toUpperCase();
      } else {
        window.custom = {};
        preview.text('');
        $(this).css("border","2px solid #ff0000");
      }
    });
  }
  function applyRestrictions($field, previewContainer) {
      let hasRestrictions = false;
      var messageToShow = restrictionMessage;

      var textHandle = $field.val().toLowerCase()

      if (removeEmojis($field.val())) {
        var newText = $field.val();
        newText = newText.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '')

        $field.val(newText)
        window.custom['MESSAGE'] = newText;
        previewContainer.text(newText);

        if (emojisMessage != '') {
          setTimeout(function() {
            alert(emojisMessage)
          }, 100);
        }
      }

      var restrictedWord ='';

      for (var i = 0; i < restrictions.length; i++) {
        if (textHandle.includes(restrictions[i])) {
          hasRestrictions = true;
          restrictedWord = restrictions[i];

          $field.val('')
          window.custom['MESSAGE'] = '';
          previewContainer.text('');
        };
      };

      if (hasRestrictions) {
        if (restrictionMessage.includes('[phrase]')) {
          restrictedWord = '"' + restrictedWord + '"';
          messageToShow = restrictionMessage.replace('[phrase]', restrictedWord)
        };

        if (messageToShow != '') {
          alert(messageToShow)
        };
      };
  }
  function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

    return regex.test(string)
  }
  function setUpFontOptions() {
    styleRadio.change(function () {
      window.custom['STYLE'] = $(this).val().toUpperCase();
      previewText.attr('class', $(this).data( "font" ));
    });
  }
  function setUpColorOptions() {
    colorRadio.change(function () {
      previewText.css({ 'fill': $(this).data( "color" )});
      window.custom['COLOR'] = $(this).val().toUpperCase();
    });
  }
  function setUpTextFieldPopup() {
    textAreaPopup.on("change keyup paste", function() {
      var message = $(this).val();
      if(/^[a-zA-Z0-9\s]+$/.test(message) && message.length >= $(this).attr('minlength')) {
        $(this).css("border","1px solid rgba(0,0,0,.2)");
        previewPopup.text(message);
        window.custom['MESSAGE'] = message;
        window.custom['STYLE'] = styleRadio.filter(':checked').val().toUpperCase();
        window.custom['COLOR'] = colorRadio.filter(':checked').val().toUpperCase();
      } else {
        window.custom = {};
        previewPopup.text('');
        $(this).css("border","2px solid #ff0000");
      }
    });
  }
  function setUpFontOptionsPopup() {
    styleRadioPopup.change(function () {
      window.custom['STYLE'] = $(this).val().toUpperCase();
      previewTextPopup.attr('class', $(this).data( "font" ));
    });
  }
  function setUpColorOptionsPopup() {
    colorRadioPopup.change(function () {
      previewTextPopup.css({ 'fill': $(this).data( "color" )});
      window.custom['COLOR'] = $(this).val().toUpperCase();
    });
  }
  function setUpUpdateAction() {
    updateBtn.click(function () {
      $.ajax({
        url: '/cart/change.js',
        context: this,
        dataType: 'json',
        data: {
          line: $(this).data('id'),
          properties: window.custom
        },
        success: function success(res) {
          window.custom = {};
          Cart.getCart();
          Cart.build();
          containerPopup.hide();
        },
        error: function error(err) {
          $('.js-table-product').slideDown();
          console.log(err);
        }
      });
    });
  }
  function setUpAddAction() {
    addBtn.click(function () {
      if (window.custom['MESSAGE'] !== '') {
      $.ajax({
        url: '/cart/change.js',
        context: this,
        dataType: 'json',
        data: {
          line: $(this).data('id'),
          properties: window.custom
        },
        success: function success(res) {
          var items = [];
          items.push({
            id: window.custom_embroidery_id,
            quantity: 1,
          });
          $.ajax({
            url: '/cart/add.js',
            context: this,
            type: 'POST',
            dataType: 'json',
            data: {
              items: items
            },
            success: function success(res) {
                window.custom = {};
                Cart.getCart();
                Cart.build();
                containerPopup.hide();
            },
            error: function error(err) {
              $('.js-table-product').slideDown();
              console.log(err);
            }
          });
        },
        error: function error(err) {
          $('.js-table-product').slideDown();
          console.log(err);
        }
      });
      } else {
        textAreaPopup.focus();
      }
    });
  }
  function setTooltipToggle() {
    tooltipBtn.click(function () {
      tooltip.toggle();
    })
    tooltipPopupBtn.click(function () {
      tooltipPopup.toggle();
    })
  }
  function init () {
    setUpToggle();
    setUpTextField();
    setUpFontOptions();
    setUpColorOptions();
    setUpTextFieldPopup();
    setUpFontOptionsPopup();
    setUpColorOptionsPopup();
    setTooltipToggle();
    setUpTogglePopup();
    setUpUpdateAction();
    setUpAddAction();

    window.custom = {};
  }

  init();
});
