$(function () {
  var console = window.console || { log: function () { } };
  var URL = window.URL || window.webkitURL;
  var $image = $('#image');
  var $download = $('.btn-save-image');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');
  var dataTile = $('#dataTile').val();
  var baseW = $dataWidth.val();
  var baseH = $dataHeight.val();
  var options = {
    aspectRatio: 1 / dataTile,
    preview: '.img-edit-preview',
    dragMode: 'move',
    crop: function (e) {
      $dataX.val(Math.round(e.detail.x));
      $dataY.val(Math.round(e.detail.y));
      $dataHeight.val(Math.round(e.detail.height));
      $dataWidth.val(Math.round(e.detail.width));
      $dataRotate.val(e.detail.rotate);
      $dataScaleX.val(e.detail.scaleX);
      $dataScaleY.val(e.detail.scaleY);
    }
  };
  var originalImageURL = $image.attr('src');
  var uploadedImageName = 'avatar.jpg';
  var uploadedImageType = 'image/jpeg';
  var uploadedImageURL;

  // Cropper
  $image.on({
    ready: function (e) {
      //console.log(e.type);
    },
    cropstart: function (e) {
      //console.log(e.type, e.detail.action);
    },
    cropmove: function (e) {
      //console.log(e.type, e.detail.action);
    },
    cropend: function (e) {
      //console.log(e.type, e.detail.action);
    },
    crop: function (e) {
      //console.log(e.type);
    },
    zoom: function (e) {
      //console.log(e.type, e.detail.ratio);
    }
  }).cropper(options);


  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    $('button.btn-save-image').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof $download[0].download === 'undefined') {
    $download.addClass('disabled');
  }


  // Options
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.ready = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });


  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data('cropper');
    var cropped;
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('clear');
          }

          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            $image.cropper('crop');
          }

          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!$download.hasClass('disabled')) {
              download.download = uploadedImageName;
              $download.attr('href', result.toDataURL(uploadedImageType));
            }
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });


  // Keyboard
  /*$(document.body).on('keydown', function (e) {

    if (!$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }

  });
*/

  // Import image
  var $inputImage = $('#inputImage');

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;
      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
          //Add them ảnh những hộp sau sẽ hiện
          $('.imageEditor').show(); // Đây là phần hiển thị ảnh chọn
          $('.editorChooseImage').hide(); // Phần chọn ảnh để tải lên

          $('.loadingShow').fadeIn(100, function() {
            // Sau khi fade in xong, bắt đầu fade out sau 200 ms 
            setTimeout(function() {
                $('.loadingShow').fadeOut(100); // Ẩn phần tử trong 0.1 giây
            }, 200); // Thời gian hiển thị trước khi ẩn
        });
          
          $('.image-controls').show(); // zoom, rotate
          $('.edit-image-btns').show(); // button đổi ảnh, xóa ảnh
          $('#tipCompress').hide(); // Ẩn chữ giới hạn 5 MB
          $download.removeClass('disabled');
          /////////////
        } else {
          window.alert('Please choose an image file.');
          $download.addClass('disabled');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
    $download.addClass('disabled');
  }

  // change image
  var $inputImage = $('#inputImage1');

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;
      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
          //Add them
          $('.imageEditor').show();
          $('.editorChooseImage').hide();
          $('.loadingShow').fadeIn(100, function() {
            // Sau khi fade in xong, bắt đầu fade out sau 1 giây (1000 milliseconds)
            setTimeout(function() {
                $('.loadingShow').fadeOut(100); // Ẩn phần tử trong 0.5 giây
            }, 200); // Thời gian hiển thị trước khi ẩn
        });
          
          $('.image-controls').show();// Tương tự trên import IMG
          $('.edit-image-btns').show();
          $('.tipCompress').hide();
          $download.removeClass('disabled');
          /////////////
        } else {
          window.alert('Please choose an image file.');
          $download.addClass('disabled');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
    $download.addClass('disabled');
  }

  $('.btn-remove-image').click(function () {
    $image.data('cropper', null).cropper('destroy').attr('src', uploadedImageURL).cropper(options);
    $('.imageEditor').hide()
    $('.editorChooseImage').show()
    $('.image-controls').hide()
    $('#tipCompress').show()
    // $('#cvo-profile-avatar').attr('src', '/images/no_avatar.jpg')
    $('.img-edit-preview img').attr('src', '/images/no_avatar.jpg').removeAttr('style')
    $('#inputImage').val("").change();
    // Vô hiệu hóa nút lưu ảnh
    $download.addClass('disabled');
  });
  // crop_img.ejs, zoom-int,zoom-out, xoay trái , phải
  $('.btn-rotate-right').click(function () {
    $image.cropper("rotate", 90); // Phương thức rotate ở file cropper.js
  });
  $('.btn-rotate-left').click(function () {
    $image.cropper("rotate", -90);
  });

  $('.btn-zoom-in-image').click(function () {
    $image.cropper("zoom", 0.2); // Phương thức zoom, zoomTo ở file cropper.js
  });
  $('.btn-zoom-out-image').click(function () {
    $image.cropper("zoom", -0.2);
  });

  $('.btn-save-image').click(function () {
    if ($(this).hasClass('disabled')) { } else {
      // var dataX = $dataX.val();
      // var dataY = $dataY.val();
      // var dataHeight = $dataHeight.val();
      // var dataWidth = $dataWidth.val();
      // var dataRotate = $dataRotate.val();
      // var dataScaleX = $dataScaleX.val();
      // var dataScaleY = $dataScaleY.val();
      // var cropper = $image.data('cropper');
      var result = $image.cropper('getCroppedCanvas', {
        width: baseW,
        height: baseH,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 4000,
        maxHeight: 4000,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      });
      var img = result.toDataURL(uploadedImageType);
      $.ajax({
        url: "/uv-uploadimgcv",
        method: "POST",
        data: { img64: img },
        cache: false,
        // dataType : 'json',
        success: function (img) {
          console.log(img)
          b = img.trim();
          $('#cvo-profile-avatar').attr('src', b);
          console.log('Upload success');
        },
        error: function () {
          console.log('Upload error');
        }
      });
      $('#imageEditorWraper').hide();
    }
  });
  // Sự kiện khi nhấn vào ảnh, hộp là crop_img.ejs
  $(document).on('click', '#cvo-profile-avatar,.fake-img', function () {
    // $image.cropper('destroy').cropper(options);
    $('#imageEditorWraper').show();// Cái này dùng để hiện ra 1 box giúp chọn ảnh , chỉnh sửa 
  })
  $(document).on('click', '.btn-close-image-editor', function () {
    // này ở crop_img.ejs, 
    //này hơi dư thừa vì cần sử dụng .btn-remove-image , tối ưu hơn thì cần để hàm
    $image.data('cropper', null).cropper('destroy').attr('src', uploadedImageURL).cropper(options);
    $('.imageEditor').hide()
    $('.editorChooseImage').show()
    $('.image-controls').hide()
    $('#tipCompress').show()
    $('.img-edit-preview img').attr('src', '/images/no_avatar.jpg').removeAttr('style')
    $('#inputImage').val("").change();

    $('#imageEditorWraper').hide(); // đóng hộp thoại
  })
  // $('#cvo-profile-avatar').click(function () {
  //   $image.cropper('destroy').cropper(options);
  //   $('#imageEditorWraper').show();
  // });
  // $('.btn-close-image-editor').click(function () {
  //   $('#imageEditorWraper').hide();
  // });

  $('.img-edit-preview').click(function () { 
    $('#inputImage').trigger('click')
  });
});





