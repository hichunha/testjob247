function setCookieJS(cname, cvalue, exdays, path) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + path;
}

// =========================Xem truoc cv===================================
function xemtruoc_cv() {
    $("#page-cv").css('height', 'unset');
    var html = `<section id="loader">
                <div class="loader loader-6">
                    <div class="loader-inner"></div>
                </div>
            </section>`;
    $('body').append(html);
    var width_l = $(window).width();
    $("#loader").css({ 'z-index': '9', 'width': width_l });
    $(window).scrollTop(0);
    $(window).scrollLeft(0);
    $('#cv_mau_new').show();
    $('#m_cv').css('overflow-x', 'unset');
    $('#m_cv').css('overflow-y', 'unset');
    $("#page-cv").css({ 'transform': 'unset' });
    html2canvas($('#page-cv #form-cv')[0]).then(function (canvas) {
        $("#loader").remove();
        $("#m_cv").css({
            'overflow-x': 'scroll',
            'overflow-y': 'hidden',
            'height': 'unset'
        });
        var img_val = canvas.toDataURL("image/png", 1.0);
        $('#cv_mau_new .img_cv').attr('src', img_val);
        $('#cv_mau_new .img_cv').show();
        setTimeout(function () {
            $('#page-cv').css("transform-origin", "0px 0px");
            $("#page-cv").css('width', '790px');
            var height_cv = $("#m_cv").height();
            $('#page-cv').css("transform", "scale(0.52)");
            setTimeout(function () {
                var widthcv = $(window).width();
                scale_mobile(widthcv);
            }, 300);
        }, 200);
    });

}

$(document).on("click", ".close_zoom_cv", function () {
    $(".cv_mau_new").hide();
});

// ========================END Xem truoc cv===================================
// ========================Su kien page cv===================================
$(document).ready(function () {
    $(".content-sidebar-cv").css({
        "height": "calc(100vh - 231px)",
        "transition": "all 0.5s ease",
    });
    $("#font-selector").select2({
        dropdownParent: $('.box-append-phongchu'),
    });

    $(window).scroll(function () {
        var window_width = $(window).width();
        var scroll_top = $(window).scrollTop();
        if (scroll_top > 10) {
            $(".content-sidebar-cv").css({
                "height": "calc(100vh - 80px)",
                "transition": "all 0.5s ease",
            });
            $(".main_header").addClass("scroll");
            // $("#cvo-toolbar").addClass("scroll_menubar");
            if (window_width >= 1250) {
                $(".box-sidebar-cv").css({
                    "transition": "all 0.5s ease",
                    "position": "fixed",
                    "top": "80px",
                });
            }
            $(".menubar_pc").hide();
        } else {
            $(".content-sidebar-cv").css({
                "height": "calc(100vh - 231px)",
                "transition": "all 0.5s ease",
            });
            $(".main_header").removeClass("scroll");
            // $("#cvo-toolbar").removeClass("scroll_menubar");
            if (window_width >= 1250) {
                $(".box-sidebar-cv").css({
                    "transition": "all 0.5s ease",
                    "position": "unset",
                    "top": "0px",
                });
            }
        }
    });
});

// su kien neu nhap ki nang lon hon 100 và nhỏ hơn 0
$(document).on('input', '.bar-value-exp input', function () {
    var value = parseInt($(this).val()); // Lấy giá trị từ ô input và chuyển sang dạng số nguyên
    // Kiểm tra nếu giá trị nằm ngoài khoảng [0, 100]
    if (!isNaN($(this).val())) {
        if (value < 0) {
            $(this).val("0"); // Xóa giá trị nhập vào
        } else if (value > 100) {
            $(this).val("100");
        }
    } else {
        $(this).val("0"); // Xóa giá trị nhập vào
    }
});
// Cái này là sự kiện sidebar(khi nhấp chọn toolbar)
if ($(window).width() >= 1250) {
    // Sự kiện khi click vào cái thu gọn của sidebar
    $(document).on("click", ".rutgon-sidebar-cv", function () {
        $(".content-main-cv").css({
            "transition": "all 0.5s ease", // độ mượt
            "max-width": "100%",// set content-cv chính thành 100%
        });
        $(this).parents(".box-sidebar-cv").hide(); // Cái này dùng để ẩn sidebar bên trái đi
        setTimeout(() => {
            $(".content-main-cv").attr("style", ""); 
        }, 500);
    });
    
    // các lựa chọn toolbar để hiển thị sidebar
    function sidebar_option(e) {
        // Thay đổi kích thước content-main-cv
        $(".content-main-cv").css({
            "max-width": "calc(100% - 430px)",
            "transition": "all 0.5s ease",
        });
        $(".box-sidebar-cv").show();// đây là toàn bộ sidebar
        let option = $(e).attr("data");
        $('.content-sidebar-cv .content-sidebar-cm').hide(); //ẩn content-sidebar-cm giúp cho không bị che mất nội dung tuy nhiên chưa hiểu sao phải ẩn content-sidebar-cv
        if (option == 1) {
            $(".content-sidebar-maucv").show();
        } else if (option == 2) {
            $(".content-sidebar-colorcv").show();
        } else if (option == 3) {
            $(".content-sidebar-langcv").show(); // ngôn ngữ
        } else if (option == 4) {
            $(".content-sidebar-cvthamkhao").show();
        } else if (option == 5) {
            $(".content-sidebar-doibocuc").show();
        } else if (option == 6) {
            $(".content-sidebar-toiuukhonggian").show();
        }

    }
} 
// màn hình <1250
else {
    function sidebar_option(e) {
        $(".box-sidebar-cv").show();
        let option = $(e).attr("data");
        $('.content-sidebar-cv .content-sidebar-cm').hide();
        if (option == 1) {
            $(".content-sidebar-maucv").show();
        } else if (option == 2) {
            $(".content-sidebar-colorcv").show();
        } else if (option == 3) {
            $(".content-sidebar-langcv").show();
        } else if (option == 4) {
            $(".content-sidebar-cvthamkhao").show();
        } else if (option == 5) {
            $(".content-sidebar-doibocuc").show();
        } else if (option == 6) {
            $(".content-sidebar-toiuukhonggian").show();
        }
    }
}

$(document).on("click", ".txt_close_sidebar", function () {
    $(this).parents(".box-sidebar-cv").hide();
});

// ========================END Su kien page cv===================================
$(document).ready(function () {
    var position = $('#position').val();
    if (position == '') {
        $('#cv-profile-job').text('');
    }
    // ==================Sự kiện đổi màu cho cv===============================
    $(document).on('click', '.boder-sidebar-colorcv', function (e) {
        $('.boder-sidebar-colorcv').removeClass('activecolor');
        $(this).addClass('activecolor');
        var newcolor = $(this).find(".sidebar-colorcv").attr('data-color');
        var oldlink = $('#cv-color-css').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newcolor + '.css';
        $('#cv-color-css').attr('href', newlink);
        // Đổi màu trên toolbar
        $(".cvo-toolbar-color .options-color .color").attr("style", `background-color:#${newcolor}`).attr('data-color', newcolor);
    });
    // ==================Sự kiện đổi ngon ngu cho cv===============================
    $(document).on("click", ".button-lang", function () {
        $(".button-lang").removeClass("activelang");
        var data_lang = $(this).attr("data-lang");
        $(this).addClass("activelang");
        setCookieJS("langcv", data_lang, 1, '/');
        location.reload();
    });
    // ==================Sự kiện đổi font chu cho cv==========================
    $(document).on('change', '.container-phongchu #font-selector', function (e) {
        var newfont = $(this).find("option:selected").val();
        var oldlink = $('#cv-font').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newfont + '.css';
        $('#cv-font').attr('href', newlink);
    });

    // ==================Su kien thay doi kich co chu + gian dong=========================
    $(document).on('input', '.items_toiuukg .ip_font_size', function () {
        var valuesize = $(this).val();
        // Thực hiện các hành động khác sau khi giá trị thay đổi
        var newsize = '';
        if (valuesize == 1) {
            newsize = 'small';
        } else if (valuesize == 2) {
            newsize = 'normal';
        } else if (valuesize == 3) {
            newsize = 'large';
        }
        var oldlink = $('#cv-font-size').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newsize + '.css';
        $('#cv-font-size').attr('href', newlink);
    });

    $(document).on('input', '.items_toiuukg .ip_line_height', function () {
        var valuelineheight = $(this).val();
        var newspacing = '';
        if (valuelineheight == 1) {
            newspacing = 'small';
        } else if (valuelineheight == 2) {
            newspacing = 'normal';
        } else if (valuelineheight == 3) {
            newspacing = 'large';
        }
        // Thực hiện các hành động khác sau khi giá trị thay đổi
        var oldlink = $('#cv-cpacing-css').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newspacing + '.css';
        $('#cv-cpacing-css').attr('href', newlink);
    });

    $(document).on("click", ".plus_range_btn", function () {
        let typeplus = $(this).attr("data");
        if (typeplus == "size") {
            var max = $(this).parents('.form_range').find("input").attr("max");
            var valuesize = $(this).parents('.form_range').find("input").val();
            var valuelineheight = $('.items_toiuukg .ip_line_height').val();
            if (valuesize < max) {
                valuesize = Number(valuesize) + 1;
                var newsize = '';
                if (valuesize == 1) {
                    newsize = 'small';
                } else if (valuesize == 2) {
                    newsize = 'normal';
                } else if (valuesize == 3) {
                    newsize = 'large';
                }
                var oldlink = $('#cv-font-size').attr('href');
                var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newsize + '.css';
                $('#cv-font-size').attr('href', newlink);
                $(this).parents('.form_range').find("input").val(valuesize);
            }
        } else {
            var max = $(this).parents('.form_range').find("input").attr("max");
            var valuelineheight = $(this).parents('.form_range').find("input").val();
            if (valuelineheight < max) {
                valuelineheight = Number(valuelineheight) + 1;
                var newspacing = '';
                if (valuelineheight == 1) {
                    newspacing = 'small';
                } else if (valuelineheight == 2) {
                    newspacing = 'normal';
                } else if (valuelineheight == 3) {
                    newspacing = 'large';
                }
                // Thực hiện các hành động khác sau khi giá trị thay đổi
                var oldlink = $('#cv-cpacing-css').attr('href');
                var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newspacing + '.css';
                $('#cv-cpacing-css').attr('href', newlink);
                $(this).parents('.form_range').find("input").val(valuelineheight);
            }
        }
    });

    $(document).on("click", ".minus_range_btn", function () {
        let typepminus = $(this).attr("data");
        if (typepminus == "size") {
            var min = $(this).parents('.form_range').find("input").attr("min");
            var valuesize = $(this).parents('.form_range').find("input").val();
            var valuelineheight = $('.items_toiuukg .ip_line_height').val();
            if (min < valuesize) {
                valuesize = Number(valuesize) - 1;
                var newsize = '';
                if (valuesize == 1) {
                    newsize = 'small';
                } else if (valuesize == 2) {
                    newsize = 'normal';
                } else if (valuesize == 3) {
                    newsize = 'large';
                }
                var oldlink = $('#cv-font-size').attr('href');
                var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newsize + '.css';
                $('#cv-font-size').attr('href', newlink);
                $(this).parents('.form_range').find("input").val(valuesize);
            }
        } else {
            var min = $(this).parents('.form_range').find("input").attr("min");
            var valuelineheight = $(this).parents('.form_range').find("input").val();
            if (min < valuelineheight) {
                valuelineheight = Number(valuelineheight) - 1;
                var newspacing = '';
                if (valuelineheight == 1) {
                    newspacing = 'small';
                } else if (valuelineheight == 2) {
                    newspacing = 'normal';
                } else if (valuelineheight == 3) {
                    newspacing = 'large';
                }
                // Thực hiện các hành động khác sau khi giá trị thay đổi
                var oldlink = $('#cv-cpacing-css').attr('href');
                var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newspacing + '.css';
                $('#cv-cpacing-css').attr('href', newlink);
                $(this).parents('.form_range').find("input").val(valuelineheight);
            }
        }
    });
    // =====================End su kien thay doi kich co chu + gian dong================================

    // ======================sắp xếp lại thứ tự id cho các box .experience================================
    function update_index_item_block(id_block) {
        let el_experience = $('#' + id_block + ' .experience');

        if (el_experience.length > 0) {
            for (var i = 0; i < el_experience.length; i++) {
                let el_item = el_experience.eq(i);
                el_item.attr('id', 'exp' + (i + 1));
            }
        }
    }

    $(document).on('click', '.fieldgroup_controls .remove', function (e) {
        var el = $(this),
            item = el.parent().parent(),
            itemId = item.attr('id'),
            parentRemoveId = '#' + item.parent().parent().attr('id');

        // Kiểm tra nếu có ít hơn 2 phần tử, không thực hiện xoá
        if ($(parentRemoveId + ' .ctbx').length < 2) {
            return;
        }
        let id_block = el.parents('.cvo-block.ui-sortable-handle').attr('id');
        item.remove();

        update_index_item_block(id_block);

        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.removeItem(sortAbleArea[h].area, itemId);

                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);

                return false;
            }
        }
    });

    $(document).on('click', '.fieldgroup_controls .clone', function (e) {
        var item = $(this).parent().parent().clone();
        item.attr('id', $.randomStr);
        item.appendTo($(this).parent().parent().parent());
        var itemv2 = $(this).parent().parent();
        var parent_cvo_block = itemv2.parents('.cvo-block');
        let id_block = $(this).parents('.cvo-block.ui-sortable-handle').attr('id');
        update_index_item_block(id_block);

        for (var t = 0; t < sortAbleArea.length; t++) {
            if (sortAbleArea[t].el === '#' + item.parent().attr('id')) {
                var area = sortAbleArea[t];
                $.createOrder(area.area, item.attr('id'), $(area.el).children().length);

                $.initSortable(area, false);
                $.upAndDown(item, area.el);

                return false;
            }
        }
        if (parent_cvo_block.find('.ctbx').length == 1) {
            parent_cvo_block.find('.remove').hide();
        } else {
            parent_cvo_block.find('.remove').show();
        }
    });

    // ======================Su kien an muc + them muc========================
    // Ẩn mục
    $(document).on('click', '.blockControls .an-muc', function (e) {
        var item = $(this).parent().parent();
        var itemId = item.attr('id');
        var parentRemoveId = '#' + item.parent().attr('id');
        $("#layout-editor .group").find(".block").each(function () {
            var an_muc = $(this).attr("blockkey");
            if (an_muc == itemId) {
                $(this).removeClass("active");
            }
        });
        console.log($('.container_bocuc_hide').find(`.boder-item-bocuc[data-id="${itemId}"]`));
        $('.container_bocuc_show').find(`.boder-item-bocuc[data-id="${itemId}"]`).addClass("d_none");
        $('.container_bocuc_hide').find(`.boder-item-bocuc[data-id="${itemId}"]`).removeClass("d_none");
        item.hide();
        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.hideBlock(sortAbleArea[h].area, itemId);

                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);

                return false;
            }
        };

    });

    $(document).on('click', '.popup_nhaptt .an_muc', function () {
        var item = $(this).parents('.popup_nhaptt');
        var itemId = item.attr('data-block');
        var parentRemoveId = '#' + item.attr('data');
        item.addClass('hidden');
        $('#' + itemId).hide();
        $("#layout-editor-container-mb .layout-editor-container-mb ").each(function () {
            var key = $(this).attr("blockkey");
            if (key == itemId) {
                $(this).removeClass("active");
            }
        });
        $("#layout-editor .group").find(".block").each(function () {
            var an_muc = $(this).attr("blockkey");
            if (an_muc == itemId) {
                $(this).removeClass("active");
            }
        });

        $('.container_bocuc_hide').find(`.boder-item-bocuc[data-id="${itemId}"]`).removeClass("d_none");
        $('.container_bocuc_show').find(`.boder-item-bocuc[data-id="${itemId}"]`).addClass("d_none");
        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.hideBlock(sortAbleArea[h].area, itemId);
                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);
                return false;
            }
        }
    });

    $(document).on('click', '.boder-item-bocuc .icon_an_muc', function () {
        var item = $(this).parents('.boder-item-bocuc');
        var itemId = item.attr('data-id');
        var parentRemoveId = '#' + item.attr('data');
        item.addClass('d_none');
        $('.container_bocuc_hide').find(`.boder-item-bocuc[data-id="${itemId}"]`).removeClass("d_none");
        $('#' + itemId).hide();
        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.hideBlock(sortAbleArea[h].area, itemId);
                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);
                return false;
            }
        }
    });

    $(document).on('click', '.boder-item-bocuc .icon_them_muc', function () {
        var item = $(this).parents('.boder-item-bocuc');
        var itemId = item.attr('data-id');
        var parentRemoveId = '#' + item.attr('data');
        item.addClass('d_none');
        $('.container_bocuc_show').find(`.boder-item-bocuc[data-id="${itemId}"]`).removeClass("d_none");
        $('#' + itemId).show();
        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.hideBlock(sortAbleArea[h].area, itemId);
                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);
                return false;
            }
        }
    });
    // =========================End su kien an muc + them muc========================

    $(document).on('click', '.js-edit-content', function (e) {
        $(this).parent().parent().addClass('edit-content');
        $(this).parent().append('<div class="save js-save-content" title="Lưu"><i class="fa fa-floppy-o"></i>&nbspSave</div>').find('.clone,.edit,.remove').hide();
    });

    $(document).on('click', '.js-save-content', function (e) {
        var div = $(this).parent().parent();
        var bar = div.removeClass('edit-content').find('.bar-exp');
        var p = div.find('.bar-value-exp input').val();
        if (p > 100) { p = 100; } else if (p < 0) { p = 0; }
        bar.html('<div style="width: ' + p + '%"></div>');
        $(this).parent().find('.clone,.edit,.remove').show();
        $(this).remove();

    });

    //Declare sortable area and item want to sort here
    var sortAbleArea = [
        { el: '#sortable', item: '.block', area: 'menu' },
        { el: '#sort_block', item: '.cvo-block', area: 'experiences' }
    ];

    //Initial json data
    var data = {
        css: [],
        cv_title: '',
        avatar: '',
        name: '',
        position: '',
        introduction: '',
        menu: [],
        experiences: []
    };

    //Create order data for first time
    $.createOrder = function (area, id, order) {
        var sub = { id: id, order: order, content: '' };
        let check = data[area].find(item => item.id == sub.id);
        if (!check) {
            data[area].push(sub);
        }
    };

    //Remove item from data
    $.removeItem = function (area, id) {
        data[area].forEach(function (arrayItem, index) {
            if (data[area][index].id === id) {
                data[area].splice(index, 1);
            }
        });
    };

    //Hide block from data
    $.hideBlock = function (area, id) {
        data[area].forEach(function (arrayItem, index) {
            if (data[area][index].id === id) {
                $('#layout-editor').find("[blockkey='" + id + "']").removeClass('active');
            }
        });
    };

    $.showBlock = function (area, id) {
        data[area].forEach(function (arrayItem, index) {
            if (data[area][index].id === id) {
                //data[area][index].status = null;
            }
        });
    };

    //Update order by id
    $.updateOrder = function (area, id, order) {
        for (var i = 0; i < data[area].length; i++) {
            if (data[area][i].id === id) {
                data[area][i].order = order;

                return false;
            }
        }
    };

    $.initSortable = function (sortable, updown) {
        var item = $(sortable.el + ' ' + sortable.item); //Lấy các phần tử chính có thẻ blockControls, không lấy phần tử chia
        let listItem = [];
        let orderData = 1;
        item.each(function () {
            let self = $(this);
            let check = listItem.find(itemData => itemData.id == self.attr('id'))
            if (!check) {
                listItem.push({ id: self.attr('id'), order: orderData });
                orderData++;
            }
        });

        //Handle sortable
        $(sortable.el).sortable({
            cancel: 'input, [contenteditable]',
            connectWith: ".connectedSortable",
            disabled: true, // tắt kéo mục
            create: function (event, ui) {
                $.each(listItem, function (i, val) {
                    $.createOrder(sortable.area, val.id, val.order);
                });
            },
            start: function (event, ui) {
                merge_block(ui.item);
            },
            stop: function (event, ui) {
                let page = ui.item.parents('.cv_page').attr('data-page');
                page = Number(page);
                page - 1 > 0 ? adjustPage(page - 1) : adjustPage(page)
            },
            update: function (event, ui) {
                // item = $($('.blockControls').parents(sortable.el + ' ' + sortable.item).get().reverse());
                var item = $(sortable.el + ' ' + sortable.item); //Lấy các phần tử chính có thẻ blockControls, không lấy phần tử chia
                let listItem = [];
                let orderData = 1;
                item.each(function () {
                    let self = $(this);
                    let check = listItem.find(itemData => itemData.id == self.attr('id'))
                    if (!check) {
                        listItem.push({ id: self.attr('id'), order: orderData });
                        orderData++;
                    }
                });
                adjustPage();
                $.each(listItem, function (i, val) {
                    $(`#${val.id}`).css('opacity', 1);
                    // let order = (item.toArray().indexOf(this));
                    $.updateOrder(sortable.area, val.id, val.order);
                });
            }
        });

        if (updown) {
            $.upAndDown(item, sortable.el);
        }
    };

    $.upAndDown = function (items, sortableEl) {
        items.each(function callback(item, i) {
            var self = $(this);
            let id = self.attr('id');
            if (id) {
                $(document).on('click', `#${id} .up`, function () {
                    console.log('move');
                    let order = (items.toArray().indexOf(self) + 1);
                    // console.log(id);
                    self = $(`#${id}`);
                    if (self.parents('#cv-content').length) {
                        let find_order = data['experiences'].find(x => x.id == id);
                        order = find_order.order;
                    } else {
                        let find_order = data['menu'].find(x => x.id == id);
                        order = find_order.order;
                    }
                    merge_block(self);
                    if (order > 0) {
                        if (self.parents('#cv-content').length) {
                            let find_data = data['experiences'].find(x => x.order == order - 1);
                            var prev = $(`#${find_data.id}`);
                        } else {
                            let find_data = data['menu'].find(x => x.order == order - 1);
                            var prev = $(`#${find_data.id}`);
                        }
                        merge_block(prev);
                        if (prev.parents('#cv-content').length || prev.parents('#cv-main').length) {
                            self.insertBefore(prev);
                        }
                        $(sortableEl).sortable('option', 'update')();
                    }
                });

                $(document).on('click', `#${id} .down`, function () {
                    console.log('move');
                    let order = (items.toArray().indexOf(self) + 1);
                    self = $(`#${id}`);
                    let max = 0;
                    if (self.parents('#cv-content').length) {
                        let find_order = data['experiences'].find(x => x.id == id);
                        order = find_order.order;
                        max = data['experiences'].length
                    } else {
                        let find_order = data['menu'].find(x => x.id == id);
                        order = find_order.order;
                        max = data['menu'].length
                    }
                    merge_block(self);
                    if (order < max) {
                        if (self.parents('#cv-content').length) {
                            let find_data = data['experiences'].find(x => x.order == order + 1);
                            var next = $(`#${find_data.id}`);
                        } else {
                            let find_data = data['menu'].find(x => x.order == order + 1);
                            var next = $(`#${find_data.id}`);
                        }
                        merge_block(next);
                        if (next.parents('#cv-content').length || next.parents('#cv-main').length) {
                            self.insertAfter(next);
                        }
                        $(sortableEl).sortable('option', 'update')();
                    }
                })
            }
        });
    };

    function merge_block(block) {
        let id = block.attr('id'),
            page = block.parents('.cv_page').attr('data-page');
        let nextPage = $(`.cv_page[data-page="${Number(page) + 1}"]`)
        if (nextPage.length) {
            let check = nextPage.find(`#${id}`).length;
            if (check) {
                let htmlAdd = nextPage.find(`#${id} #experience-table`).html();
                block.find(`#experience-table`).append(htmlAdd);
                nextPage.find(`#${id}`).remove();
            }
        }
    }
    //Start create data
    for (var l = 0; l < sortAbleArea.length; l++) {
        $.initSortable(sortAbleArea[l], true);
    }
    // Lấy nội dung cv và đẩy vào json data
    $.exportData = function () {
        // font-size
        let valuesz = $('.items_toiuukg .ip_font_size').val();
        let newsz = '';
        if (valuesz == 1) {
            newsz = 'small';
        } else if (valuesz == 2) {
            newsz = 'normal';
        } else if (valuesz == 3) {
            newsz = 'large';
        }
        // line-height
        let valuelh = $('.items_toiuukg .ip_line_height').val();
        let newlh = '';
        if (valuelh == 1) {
            newlh = 'small';
        } else if (valuelh == 2) {
            newlh = 'normal';
        } else if (valuelh == 3) {
            newlh = 'large';
        }
        // 
        data['css'] = {
            color: $('#cvo-toolbar .color.active').attr('data-color'),
            font: $('#font-selector').val(),
            font_size: newsz,
            font_spacing: newlh,
        }
        var cv_title = $('.main-cv-namecv #cv-title').text().trim();
        if (cv_title == '') {
            cv_title = $('#cv_alias').val();
        }
        data['cv_title'] = cv_title;
        data['avatar'] = $('#page-cv #cvo-profile-avatar').attr('src');//  đi đến phần cvo-profile-avatar với page-cv là cha(parents) lấy thuộc tính src, hình ảnh
        data['name'] = $('#cv-profile-fullname').text().trim();
        data['email'] = $('#cv-profile-email').text().trim();
        data['address'] = $('#cv-profile-address').text().trim();
        data['position'] = $('#cv-profile-job').text().trim();
        data['introduction'] = $('#cv-profile-about').html();
        data['background'] = $('#form-cv').attr('data-background') ? $('#form-cv').attr('data-background') : '';
        // Du lieu cua menu
        for (var k = 0; k < data['menu'].length; k++) {
            var tmpItem = $('#' + data['menu'][k].id);
            var content = '';
            // box thông tin liên hệ
            if (tmpItem.hasClass('box-contact')) {
                var phone = $('#cv-profile-phone').text().trim();
                var email = $('#cv-profile-email').text().trim();
                if (typeof ($('#cv-profile-cmnd').text()) !== 'undefined') {
                    content = {
                        type: 'profile',
                        content: {
                            birthday: $('#cv-profile-birthday').text().trim(),
                            sex: $('#cv-profile-sex').text().trim(),
                            phone: phone,
                            email: email,
                            address: $('#cv-profile-address').text().trim(),
                            face: $('#cv-profile-face').text().trim(),
                            cmnd: $('#cv-profile-cmnd').text().trim(),
                            ngaycap: $('#cv-profile-ngaycap').text().trim(),
                            noicap: $('#cv-profile-noicap').text().trim()
                        }
                    }
                } else {
                    content = {
                        type: 'profile',
                        content: {
                            birthday: $('#cv-profile-birthday').text().trim(),
                            sex: $('#cv-profile-sex').text().trim(),
                            phone: phone,
                            email: email,
                            address: $('#cv-profile-address').text().trim(),
                            face: $('#cv-profile-face').text().trim()
                        }
                    }
                }
            }
            // box kỹ năng
            else if (tmpItem.hasClass('box-skills')) {
                content = {
                    type: 'skill',
                    skills: []
                };
                $('.box-skills .ctbx').each(function () {
                    content.skills.push({
                        name: $(this).find('.skill-name').text().trim(),
                        exp: $(this).find('.bar-value-exp input').val().trim()
                    });
                });
            }
            // các box còn lại
            else {
                let box_content = tmpItem.find('.box-content').html();
                content = (box_content) ? box_content.trim() : box_content;
            }
            // ================================================================
            var status = '';
            if (tmpItem.is(":hidden") == true) {
                status = 'hide';
            }
            data['menu'][k].content = {
                title: tmpItem.find('.box-title').text().trim(),
                content: content
            }
            data['menu'][k].status = status;
        }
        // Du lieu cua experiences
        for (var k = 0; k < data['experiences'].length; k++) {
            var tmpItem = $('#' + data['experiences'][k].id),
                content = [],
                el_experience = $('#' + data['experiences'][k].id + ' .experience');
            //export data for box experience
            for (var m = 0; m < el_experience.length; m++) {
                var tmpExp = $('#' + data['experiences'][k].id + ' #' + el_experience[m].id);
                var content1 = tmpExp.find('.exp-content').html();
                content.push({
                    title: tmpExp.find('.exp-title').text().trim(),
                    date: tmpExp.find('.exp-date').text().trim(),
                    subtitle: tmpExp.find('.exp-subtitle').text().trim(),
                    content: (content1) ? content1.trim() : content1
                });
            }
            var status = '';
            if (tmpItem.is(":hidden") == true) {
                status = 'hide';
            }
            data['experiences'][k].content = {
                title: tmpItem.find('.block-title').text().trim(),
                content: content
            }
            data['experiences'][k].status = status;
        }
        var ar_data = JSON.stringify(data);
        var idcv = $('#idcv').val();
        var iduser = $('#uid_cv').val();
        var lang = $('#cvo-toolbar .options-lang .active-lang').attr('data-lang');
        var height_cv = $('#form-cv').height();
        $.ajax({
            cache: false,
            type: "POST",
            url: "/SaveCVByUv",
            dataType: 'json',
            async: false,
            data: { idcv: idcv, iduser: iduser, ar_data: ar_data, lang: lang, height_cv: height_cv },
            success: function (result) {
                console.log(result);
            }
        });
    };
    // get getDataCv
    $.getDataCv = function () {
        // font-size
        let valuesz = $('.items_toiuukg .ip_font_size').val();
        let newsz = '';
        if (valuesz == 1) {
            newsz = 'small';
        } else if (valuesz == 2) {
            newsz = 'normal';
        } else if (valuesz == 3) {
            newsz = 'large';
        }
        // line-height
        let valuelh = $('.items_toiuukg .ip_line_height').val();
        let newlh = '';
        if (valuelh == 1) {
            newlh = 'small';
        } else if (valuelh == 2) {
            newlh = 'normal';
        } else if (valuelh == 3) {
            newlh = 'large';
        }
        // 
        data['css'] = {
            color: $('#cvo-toolbar .color.active').attr('data-color'),
            font: $('#font-selector').val(),
            font_size: newsz,
            font_spacing: newlh,
        }
        var cv_title = $('.main-cv-namecv #cv-title').text().trim();
        if (cv_title == '') {
            cv_title = $('#cv_alias').val();
        }
        data['cv_title'] = cv_title;
        data['avatar'] = $('#page-cv #cvo-profile-avatar').attr('src');
        data['name'] = $('#cv-profile-fullname').text().trim();
        data['email'] = $('#cv-profile-email').text().trim();
        data['address'] = $('#cv-profile-address').text().trim();
        data['position'] = $('#cv-profile-job').text().trim();
        data['introduction'] = $('#cv-profile-about').html();
        data['background'] = $('#form-cv').attr('data-background') ? $('#form-cv').attr('data-background') : '';
        // Du lieu cua menu
        for (var k = 0; k < data['menu'].length; k++) {
            var tmpItem = $('#' + data['menu'][k].id);
            var content = '';
            // box thông tin liên hệ
            if (tmpItem.hasClass('box-contact')) {
                var phone = $('#cv-profile-phone').text().trim();
                var email = $('#cv-profile-email').text().trim();
                if (typeof ($('#cv-profile-cmnd').text()) !== 'undefined') {
                    content = {
                        type: 'profile',
                        content: {
                            birthday: $('#cv-profile-birthday').text().trim(),
                            sex: $('#cv-profile-sex').text().trim(),
                            phone: phone,
                            email: email,
                            address: $('#cv-profile-address').text().trim(),
                            face: $('#cv-profile-face').text().trim(),
                            cmnd: $('#cv-profile-cmnd').text().trim(),
                            ngaycap: $('#cv-profile-ngaycap').text().trim(),
                            noicap: $('#cv-profile-noicap').text().trim()
                        }
                    }
                } else {
                    content = {
                        type: 'profile',
                        content: {
                            birthday: $('#cv-profile-birthday').text().trim(),
                            sex: $('#cv-profile-sex').text().trim(),
                            phone: phone,
                            email: email,
                            address: $('#cv-profile-address').text().trim(),
                            face: $('#cv-profile-face').text().trim()
                        }
                    }
                }
            }
            // box kỹ năng
            else if (tmpItem.hasClass('box-skills')) {
                content = {
                    type: 'skill',
                    skills: []
                };
                $('.box-skills .ctbx').each(function () {
                    content.skills.push({
                        name: $(this).find('.skill-name').text().trim(),
                        exp: $(this).find('.bar-value-exp input').val().trim()
                    });
                });
            }
            // các box còn lại
            else {
                let box_content = tmpItem.find('.box-content').html();
                content = (box_content) ? box_content.trim() : box_content;
            }
            // ================================================================
            var status = '';
            if (tmpItem.is(":hidden") == true) {
                status = 'hide';
            }
            data['menu'][k].content = {
                title: tmpItem.find('.box-title').text().trim(),
                content: content
            }
            data['menu'][k].status = status;
        }
        // Du lieu cua experiences
        for (var k = 0; k < data['experiences'].length; k++) {
            var tmpItem = $('#' + data['experiences'][k].id),
                content = [],
                el_experience = $('#' + data['experiences'][k].id + ' .experience');
            //export data for box experience
            for (var m = 0; m < el_experience.length; m++) {
                var tmpExp = $('#' + data['experiences'][k].id + ' #' + el_experience[m].id);
                var content1 = tmpExp.find('.exp-content').html();
                content.push({
                    title: tmpExp.find('.exp-title').text().trim(),
                    date: tmpExp.find('.exp-date').text().trim(),
                    subtitle: tmpExp.find('.exp-subtitle').text().trim(),
                    content: (content1) ? content1.trim() : content1
                });
            }
            var status = '';
            if (tmpItem.is(":hidden") == true) {
                status = 'hide';
            }
            data['experiences'][k].content = {
                title: tmpItem.find('.block-title').text().trim(),
                content: content
            }
            data['experiences'][k].status = status;
        }
        var ar_data = JSON.stringify(data);
        return ar_data;
    };

    function validatecv() {
        var phone = $('#cv-profile-phone');
        var email = $('#cv-profile-email');
        var address = $('#cv-profile-address');
        var fname = $('#cv-profile-fullname');
        var jobname = $('#cv-profile-job');
        var birthday = $('#cv-profile-birthday');
        var sexcv = $('#cv-profile-sex');
        var txt_err = "";
        var error_return = true;
        if (birthday.text() == '' || sexcv.text() == '' || phone.text() == '' || email.text() == '' || fname.text() == '' || address.text() == '' || (jobname.text() == '' || jobname.text().trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.text().trim() == '지원하고 싶은 위치' || jobname.text().trim() == '応募仕事' || jobname.text().trim() == 'Job position')) {
            txt_err += "Bạn chưa nhập các trường: ";
            if (birthday.text() == '') {
                birthday.css('outline', '1px dashed red');
                txt_err += "Ngày sinh, ";
            } else {
                birthday.css('outline', 'unset');
            }
            if (sexcv.text() == '') {
                sexcv.css('outline', '1px dashed red');
                txt_err += "Giới tính, ";
            } else {
                sexcv.css('outline', 'unset');
            }
            if (fname.text() == '') {
                fname.css('outline', '1px dashed red');
                txt_err += "Họ tên, ";
            } else {
                fname.css('outline', 'unset');
            }
            if (jobname.text().trim() == '' || jobname.text().trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.text().trim() == '지원하고 싶은 위치' || jobname.text().trim() == '応募仕事' || jobname.text().trim() == 'Job position') {
                jobname.css('outline', '1px dashed red');
                txt_err += "Vị trí muốn ứng tuyển, ";
            } else {
                jobname.css('outline', 'unset');
            }
            if (phone.text() == '') {
                phone.css('outline', '1px dashed red');
                txt_err += "Số điện thoại, ";
            } else {
                phone.css('outline', 'unset');
            }
            if (email.text() == '') {
                email.css('outline', '1px dashed red');
                txt_err += "Email, ";
            } else {
                email.css('outline', 'unset');
            }
            if (address.text() == '') {
                address.css('outline', '1px dashed red');
                txt_err += "Địa chỉ, ";
            } else {
                address.css('outline', 'unset');
            }
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = ' <div class="show_err_box">'
            msg += '<div class="error-box">'
            msg += '<h2 class="error-header">Thông báo</h2>'
            msg += '<p class="error-message">' + txt_err + '</p>'
            msg += '<button class="error-button">Đóng</button>'
            msg += '</div>'
            msg += '</div>';
            $('body').append(msg);
            return false;
        }
        if (fname.text() != "") {
            var txt_err = '';
            const containsAdmin = fname.text().toLowerCase().indexOf("admin") !== -1; // Sử dụng indexOf
            if (containsAdmin) {
                $("#cv-profile-fullname").css('outline', '1px dashed red');
                
                txt_err += "Tên không được chứa ký tự admin, ";
                txt_err = txt_err.substring(0, txt_err.length - 2);
                var msg = ' <div class="show_err_box">'
                msg += '<div class="error-box">'
                msg += '<h2 class="error-header">Thông báo</h2>'
                msg += '<p class="error-message">' + txt_err + '</p>'
                msg += '<button class="error-button">Đóng</button>'
                msg += '</div>'
                msg += '</div>';
                $('body').append(msg);
                return false;
            } else {
                $("#cv-profile-fullname").css('outline', 'unset');
            }
        }
        if (birthday.text() != '') {
            if (!isDate(birthday.text())) {
                txt_err += 'Ngày sinh không hợp lệ (dd/mm/YYYY) và tuổi phải từ 6 - 80 tuổi, ';
                txt_err = txt_err.substring(0, txt_err.length - 2);
                var msg = ' <div class="show_err_box">'
                msg += '<div class="error-box">'
                msg += '<h2 class="error-header">Thông báo</h2>'
                msg += '<p class="error-message">' + txt_err + '</p>'
                msg += '<button class="error-button">Đóng</button>'
                msg += '</div>'
                msg += '</div>';
                $('body').append(msg);
                return false;
            }
        }
        if (!/^[0-9]{10}$/.test(phone.text())) {
            let txt_err = "Số điện thoại không hợp lệ";
            var msg = ' <div class="show_err_box">'
            msg += '<div class="error-box">'
            msg += '<h2 class="error-header">Thông báo</h2>'
            msg += '<p class="error-message">' + txt_err + '</p>'
            msg += '<button class="error-button">Đóng</button>'
            msg += '</div>'
            msg += '</div>';
            $('body').append(msg);
            return false;
        }
        if (validateEmail(email.text()) == false) {
            let txt_err = "Email không hợp lệ";
            var msg = ' <div class="show_err_box">'
            msg += '<div class="error-box">'
            msg += '<h2 class="error-header">Thông báo</h2>'
            msg += '<p class="error-message">' + txt_err + '</p>'
            msg += '<button class="error-button">Đóng</button>'
            msg += '</div>'
            msg += '</div>';
            $('body').append(msg);
            return false;
        }
        let show_error = 0;
        let name_box = [];
        let selector = $('#form-cv .cvo-block:not(.box-contact) [contenteditable="true"]:not(.box-title,.block-title):visible');
        selector.removeClass('err_cv_content');
        if (selector.length) {
            selector.each(function () {
                let title = '';
                let error = 0;
                if ($(this).parents('.block').length) {
                    box_id = $(this).parents('.block').attr('id');
                    content_suggest = data_box.find(box => box.id == box_id);
                    title = $(this).parents('.cvo-block').find('.box-title').text();
                } else if ($(this).parents('.cvo-block').length) {
                    box_id = $(this).parents('.cvo-block').attr('id');
                    content_suggest = data_block.find(block => block.id == box_id);
                    title = $(this).parents('.cvo-block').find('.block-title').text();
                }
                if (content_suggest) {
                    //check nội dung box
                    if ($(this).hasClass('box-content')) {
                        if ((replaceStr(content_suggest.content) == replaceStr($(this).html()) && replaceStr(content_suggest.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                            error = 1;
                        }
                    } else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                        //check nội dung block
                        content_suggest.content.forEach(item => {
                            if ((replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                                error = 1;
                            }
                        });
                    }
                    if (error == 1) {
                        $(this).addClass('err_cv_content');
                        show_error = 1;
                        if (name_box.indexOf(title) == -1 && title) {
                            name_box.push(title);
                        }
                    }
                }

            });
        }
        //Check nội dung trống
        let empty = 0;
        $('#form-cv .cvo-block:not(.box-contact) [contenteditable="true"]:visible').each(function () {
            if (!$(this).parents('#block05').length) {  //thông tin thêm
                if ($(this).text().trim() == '') {
                    empty = 1;
                    if ($(this).parents('.cvo-block').find('.block-title').length) {
                        let title = $(this).parents('.cvo-block').find('.block-title').text();
                        if (name_box.indexOf(title) == -1 && title) {
                            name_box.push(title);
                        }
                    } else if ($(this).parents('.cvo-block').find('.box-title').length) {
                        let title = $(this).parents('.cvo-block').find('.box-title').text();
                        if (name_box.indexOf(title) == -1 && title) {
                            name_box.push(title);
                        }
                    }
                    $(this).addClass('err_cv_content');
                }
            }
        });
        if (empty == 1) {
            show_error = 1;
        }
        if (show_error == 1) {
            var msg = ' <div class="show_err_box">'
            msg += '<div class="error-box">'
            msg += '<h2 class="error-header">Thông báo</h2>'
            msg += `<p class="error-message">Bạn chưa nhập hoặc chưa thay đổi nội dung các trường: ${name_box.join(', ').toLowerCase()}</p>`;
            msg += '<button class="error-button">Đóng</button>'
            msg += '</div>'
            msg += '</div>';
            $('body').append(msg);
            return false;
        }
    }
    // ==============Khi tạo tài khoản bước 1 xong sau đó mới tạo Cv===============
    $(document).on("click", "#btn-save-step2", function () {
        let check = validatecv();
        var accountUser = $('#accountUser').val();
        var idcv = $('#idcv').val();
        var lang = $('#cvo-toolbar .options-lang .active-lang').attr('data-lang');
        var height_cv = $('#form-cv').height();
        var datacv = $.getDataCv();
        if (check != false && idcv && lang && datacv) {
            $("#loader").show();
            $.ajax({
                type: "POST",
                url: "/RegisterUvAfterCv",
                dataType: 'json',
                data: { idcv: idcv, dataCVJson: datacv, lang: lang, height_cv: height_cv },
                success: function (result) {
                    if (result.result != false) {
                        $("#loader").remove();
                        dataLayer = [];
                        dataLayer.push({
                            'event': 'dangkyuv',
                            'email': accountUser,
                        });
                        var msg = ' <div class="show_success_box">'
                        msg += '<div class="success-box">'
                        msg += '<h2 class="success-header">Thông báo</h2>'
                        msg += `<p class="success-message">Tạo Cv Thành Công. Cv Của Bạn Được Lưu Trữ Tại Mục Cv Đã Tạo !!!</p>`;
                        msg += '<button class="success-button" onclick="closeCv(this)">Đóng</button>'
                        msg += '</div>'
                        msg += '</div>';
                        $('body').append(msg);
                        // var url = result.base64StringPDF;
                        // var name_cv = result.userName;
                        // downloadAsPDF(`data:application/octet-stream;base64,${url}`, `${name_cv}`);
                        // setTimeout(function () {
                        //     window.location = '/';
                        // }, 1000);
                    }
                }
            });
        }
    });
    // ==============Tạo cv sau đó đăng ký tài khoản===============
    // Hàm validate ứng viên
    function validateUv() {
        let arr_focus = new Array;
        var account = $("#account");
        var newpassword = $("#newpassword");
        var confirmnewpass = $("#confirmnewpass");
        var hoten_uv = $("#hoten_uv");
        var phone_lh = $("#phone_lh");
        var tinhthanhlv = $("#use_city_job");
        var nganhnghe = $("#use_nganh_nghe");
        var cv_title = $("#cv_title");
        var dd_quanhuyenlv = $("#use_district_job");
        var returnForm = true;
        if (account.val().trim().length == 0) {
            if (account.parent().hasClass("error") == false) {
                account.parent().addClass("error");
                account.after("<label class='error' id='account_error'>Vui lòng nhập email đăng ký</label>");
            }
            arr_focus.push('#account');
            returnForm = false;
        } else {
            account.parent().removeClass("error");
            $("#account_error").remove();
            if (validateEmail(account.val()) == false) {
                if (account.parent().hasClass('error') == false) {
                    account.parent().addClass('error');
                    account.after("<label id='account_error' class='error'>Định dạng email không đúng</label>");
                }
            } else {
                $.ajax({
                    type: "POST",
                    url: "/check_account_register",
                    async: false,
                    data: {
                        account_check: account.val(),
                    },
                    success: function (data) {
                        if (data.data != 1) {
                            if (account.parent().hasClass("error") == false) {
                                account.parent().addClass("error");
                                account.after("<label class='error' id='account_error'>Tài khoản đã tồn tại</label>");
                            }
                            arr_focus.push('#account')
                            returnForm = false;
                        } else {
                            account.parent().removeClass("error");
                            $("#account_error").remove();
                        }
                    },
                });
            }
        }

        if (newpassword.val().trim().length == 0) {
            if (newpassword.parent().hasClass("error") == false) {
                newpassword.parent().addClass("error");
                newpassword.after("<label class='error' id='newpassword_error'>Vui lòng nhập mật khẩu</label>");
            }
            arr_focus.push('#newpassword')
            returnForm = false;
        } else {
            newpassword.parent().removeClass("error");
            $("#newpassword_error").remove();
            if (!checkPassWord(newpassword.val())) {
                if (newpassword.parent().hasClass("error") == false) {
                    newpassword.parent().addClass("error");
                    newpassword.after("<label class='error' id='newpassword_error' >Mật khẩu phải có ít nhất 6 ký tự gồm cả chữ và số</label>");
                }
                arr_focus.push('#newpassword')
                returnForm = false;
            } else {
                newpassword.parent().removeClass("error");
                $("#newpassword_error").remove();
            }
        }

        if (confirmnewpass.val().trim().length == 0) {
            if (confirmnewpass.parent().hasClass("error") == false) {
                confirmnewpass.parent().addClass("error");
                confirmnewpass.after("<label class='error' id='confirmnewpass_error'>Vui lòng nhập mật khẩu xác nhận</label>");
            }
            arr_focus.push('#confirmnewpass')
            returnForm = false;
        } else {
            confirmnewpass.parent().removeClass("error");
            $("#confirmnewpass_error").remove();
            if (confirmnewpass.val().length < 6) {
                if (confirmnewpass.parent().hasClass("error") == false) {
                    confirmnewpass.parent().addClass("error");
                    confirmnewpass.after("<label class='error' id='confirmnewpass_error'>Độ dài mật khẩu phải ít nhất 6 kí tự</label>");
                }
                arr_focus.push('#confirmnewpass')
                returnForm = false;
            } else {
                confirmnewpass.parent().removeClass("error");
                $("#confirmnewpass_error").remove();
                if (newpassword.val() != confirmnewpass.val()) {
                    if (confirmnewpass.parent().hasClass("error") == false) {
                        confirmnewpass.parent().addClass("error");
                        confirmnewpass.after("<label class='error' id='confirmnewpass_error'>Mật khẩu xác thực không trùng khớp</label>");
                    }
                    arr_focus.push('#confirmnewpass')
                    returnForm = false;
                }
            }
        }

        if (hoten_uv.val().trim().length == 0) {
            if (hoten_uv.parent().hasClass("error") == false) {
                hoten_uv.parent().addClass("error");
                hoten_uv.after("<label class='error' id='hoten_uv_error'>Vui lòng nhập họ tên</label>");
            }
            arr_focus.push('#hoten_uv')
            returnForm = false;
        } else {
            hoten_uv.parent().removeClass("error");
            $("#hoten_uv_error").remove();
        }

        if (phone_lh.val().trim().length == 0) {
            if (phone_lh.parent().hasClass("error") == false) {
                phone_lh.parent().addClass("error");
                phone_lh.after("<label class='error' id='phone_lh_error'>Vui lòng nhập số điện thoại liên hệ</label>");
            }
            arr_focus.push('#phone_lh')
            returnForm = false;
        } else {
            phone_lh.parent().removeClass("error");
            $("#phone_lh_error").remove();
            if (!validatePhone(phone_lh.val().trim())) {
                phone_lh.parent().addClass("error");
                phone_lh.after("<label class='error' id='phone_lh_error'>Số điện thoại liên hệ không đúng định dạng</label>");
                arr_focus.push('#phone_lh')
                returnForm = false;
            }
        }

        if (cv_title.val() == "") {
            if (cv_title.parent().hasClass("error") == false) {
                cv_title.parent().addClass("error");
                cv_title.after("<label class='error' id='cv-title_error' style='width:100%'>Vui lòng nhập ngành nghề mong muốn</label>");
            }
            arr_focus.push('#cv_title')
            returnForm = false;
        } else {
            cv_title.parent().removeClass("error");
            $("#cv-title_error").remove();
        }

        if (tinhthanhlv.val().length == 0) {
            if ($(".city_job").hasClass("error") == false) {
                $(".city_job").addClass("error");
                $(".city_job").append("<label class='error' id='city_job_error' style='width:100%'>Vui lòng chọn địa điểm làm việc</label>");
            }
            arr_focus.push('#tinhthanhlv')
            returnForm = false;
        } else {
            $(".city_job").removeClass("error");
            $("#city_job_error").remove();
        }

        if (dd_quanhuyenlv.val().length == 0) {
            if ($(".district_job").hasClass("error") == false) {
                $(".district_job").addClass("error");
                $(".district_job").append("<label class='error' id='district_job_error' style='width:100%'>Vui lòng chọn quận huyện làm việc</label>");
            }
            arr_focus.push('#quanhuyenlv')
            returnForm = false;
        } else {
            $(".district_job").removeClass("error");
            $("#district_job_error").remove();
        }

        if (nganhnghe.val().length == 0) {
            if ($(".nganh_nghe").hasClass("error") == false) {
                $(".nganh_nghe").addClass("error");
                $(".nganh_nghe").append("<label class='error' id='nganh_nghe_error' style='width:100%'>Vui lòng chọn ngành nghề</label>");
            }
            arr_focus.push('#use_nganh_nghe');
            returnForm = false;
        } else {
            $(".nganh_nghe").removeClass("error");
            $("#nganh_nghe_error").remove();
        }

        $(arr_focus[0]).focus();
        return returnForm;
    };
    // validate khi ứng viên nhập vào input, select cho popup đăng ký ứng viên
    $(document).ready(function () {
        $('#account').keyup(function () {
            var account = $(this);
            if (account.val().trim().length == 0) {
                if (account.parent().hasClass("error") == false) {
                    account.parent().addClass("error");
                    account.after("<label class='error' id='account_error'>Vui lòng nhập email đăng ký</label>");
                }
                $('#account').focus();
            } else {
                account.parent().removeClass("error");
                $("#account_error").remove();
                if (validateEmail(account.val()) == false) {
                    if (account.parent().hasClass('error') == false) {
                        account.parent().addClass('error');
                        account.after("<label id='account_error' class='error'>Định dạng email không đúng</label>");
                    }
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/check_account_register",
                        async: false,
                        data: {
                            account_check: account.val(),
                        },
                        success: function (data) {
                            if (data.data != 1) {
                                if (account.parent().hasClass("error") == false) {
                                    account.parent().addClass("error");
                                    account.after("<label class='error' id='account_error'>Tài khoản đã tồn tại</label>");
                                }
                                $('#account').focus();
                            } else {
                                account.parent().removeClass("error");
                                $("#account_error").remove();
                            }
                        },
                    });
                }
            }
        });

        $('#newpassword').keyup(function () {
            var newpassword = $(this);
            if (newpassword.val().trim().length == 0) {
                if (newpassword.parent().hasClass("error") == false) {
                    newpassword.parent().addClass("error");
                    newpassword.after("<label class='error' id='newpassword_error'>Vui lòng nhập mật khẩu</label>");
                }
                $('#newpassword').focus();
            } else {
                newpassword.parent().removeClass("error");
                $("#newpassword_error").remove();
                if (!checkPassWord(newpassword.val())) {
                    if (newpassword.parent().hasClass("error") == false) {
                        newpassword.parent().addClass("error");
                        newpassword.after("<label class='error' id='newpassword_error' >Mật khẩu phải có ít nhất 6 ký tự gồm cả chữ và số</label>");
                    }
                    $('#newpassword').focus();
                } else {
                    newpassword.parent().removeClass("error");
                    $("#newpassword_error").remove();
                }
            }
        });

        $('#confirmnewpass').keyup(function () {
            var newpassword = $('#newpassword');
            var confirmnewpass = $(this);
            if (confirmnewpass.val().trim().length == 0) {
                if (confirmnewpass.parent().hasClass("error") == false) {
                    confirmnewpass.parent().addClass("error");
                    confirmnewpass.after("<label class='error' id='confirmnewpass_error'>Vui lòng nhập mật khẩu xác nhận</label>");
                }
                arr_focus.push('#confirmnewpass')
                returnForm = false;
            } else {
                confirmnewpass.parent().removeClass("error");
                $("#confirmnewpass_error").remove();
                if (confirmnewpass.val().length < 6) {
                    if (confirmnewpass.parent().hasClass("error") == false) {
                        confirmnewpass.parent().addClass("error");
                        confirmnewpass.after("<label class='error' id='confirmnewpass_error'>Độ dài mật khẩu phải ít nhất 6 kí tự</label>");
                    }
                } else {
                    confirmnewpass.parent().removeClass("error");
                    $("#confirmnewpass_error").remove();
                    if (newpassword.val().trim() != confirmnewpass.val().trim()) {
                        if (confirmnewpass.parent().hasClass("error") == false) {
                            confirmnewpass.parent().addClass("error");
                            confirmnewpass.after("<label class='error' id='confirmnewpass_error'>Mật khẩu xác thực không trùng khớp</label>");
                        }
                    }
                }
            }
        });

        $('#hoten_uv').keyup(function () {
            var hoten_uv = $(this);
            if (hoten_uv.val().trim().length == 0) {
                if (hoten_uv.parent().hasClass("error") == false) {
                    hoten_uv.parent().addClass("error");
                    hoten_uv.after("<label class='error' id='hoten_uv_error'>Vui lòng nhập họ tên</label>");
                }
                $('#hoten_uv').focus();
            } else {
                hoten_uv.parent().removeClass("error");
                $("#hoten_uv_error").remove();
            }
        });

        $('#phone_lh').keyup(function () {
            var phone_lh = $(this);
            if (phone_lh.val().trim().length == 0) {
                if (phone_lh.parent().hasClass("error") == false) {
                    phone_lh.parent().addClass("error");
                    phone_lh.after("<label class='error' id='phone_lh_error'>Vui lòng nhập số điện thoại liên hệ</label>");
                }
                $('#phone_lh').focus();
            } else {
                phone_lh.parent().removeClass("error");
                $("#phone_lh_error").remove();
                if (!validatePhone(phone_lh.val().trim())) {
                    phone_lh.parent().addClass("error");
                    phone_lh.after("<label class='error' id='phone_lh_error'>Số điện thoại liên hệ không đúng định dạng</label>");
                }
            }
        });

        $('#cv_title').keyup(function () {
            var cv_title = $(this);
            if (cv_title.val() == "") {
                if (cv_title.parent().hasClass("error") == false) {
                    cv_title.parent().addClass("error");
                    cv_title.after("<label class='error' id='cv-title_error' style='width:100%'>Vui lòng nhập ngành nghề mong muốn</label>");
                }
                $('#cv_title').focus();
            } else {
                cv_title.parent().removeClass("error");
                $("#cv-title_error").remove();
            }
        });

        $('#use_city_job').change(function () {
            var tinhthanhlv = $(this);
            if (tinhthanhlv.val().length == 0) {
                if ($(".city_job").hasClass("error") == false) {
                    $(".city_job").addClass("error");
                    $(".city_job").append("<label class='error' id='city_job_error' style='width:100%'>Vui lòng chọn địa điểm làm việc</label>");
                }
                $('#use_city_job').focus();
            } else {
                $(".city_job").removeClass("error");
                $("#city_job_error").remove();
            }
        });

        $('#use_district_job').change(function () {
            var quanhuyenlv = $(this);
            if (quanhuyenlv.val().length == 0) {
                if ($(".district_job").hasClass("error") == false) {
                    $(".district_job").addClass("error");
                    $(".district_job").append("<label class='error' id='district_job_error' style='width:100%'>Vui lòng chọn quận huyện làm việc</label>");
                }
                $('#use_district_job').focus();
            } else {
                $(".district_job").removeClass("error");
                $("#district_job_error").remove();
            }
        });

        $('#use_nganh_nghe').change(function () {
            var nganhnghe = $(this);
            if (nganhnghe.val().length == 0) {
                if ($(".nganh_nghe").hasClass("error") == false) {
                    $(".nganh_nghe").addClass("error");
                    $(".nganh_nghe").append("<label class='error' id='nganh_nghe_error' style='width:100%'>Vui lòng chọn ngành nghề</label>");
                }
                $('#use_nganh_nghe').focus();
            } else {
                $(".nganh_nghe").removeClass("error");
                $("#nganh_nghe_error").remove();
            }
        });
    });
    // sự kiện khi click vào lưu cv thì check và hiển thị popup đăng ký 
    $(document).on("click", "#save-cv-step1", function () {
        let check = validatecv();
        if (check != false) {
            var phone_lh = $('#cv-profile-phone').text().trim();
            var account = $('#cv-profile-email').text().trim();
            var name = $('#cv-profile-fullname').text().trim();
            var cv_title = $('#cv-profile-job').text().trim();
            $("#register_candidate").find("#account").val(account);
            $("#register_candidate").find("#phone_lh").val(phone_lh);
            $("#register_candidate").find("#hoten_uv").val(name);
            $("#register_candidate").find("#cv_title").val(cv_title);
            $("#register_candidate").show();
        }
    });
    // Khi nhập đủ thông tin thì nhấn đăng ký
    $(document).on("click", ".registeruvcv", function () {
        var returnForm = validateUv();
        var idcv = $('#idcv').val();
        var lang = $('#cvo-toolbar .options-lang .active-lang').attr('data-lang');
        var height_cv = $('#form-cv').height();
        var datacv = $.getDataCv();
        if (returnForm && idcv && lang && height_cv && datacv) {
            $("#loader").show();
            // Lấy dữ liệu từ CV
            var cv_title = $('#cv-profile-job').text().trim();
            var hoten_uv = $('#cv-profile-fullname').text().trim();
            var phone_lh = $('#cv-profile-phone').text().trim();
            // Lấy dữ liệu từ popup
            // ==Tạm thời đóng==
            // var hoten_uv = $("#hoten_uv").val();
            // var phone_lh = $("#phone_lh").val();
            // var cv_title = $("#cv_title").val();
            var account = $("#account").val();
            var newpassword = $("#newpassword").val();
            var confirmnewpass = $("#confirmnewpass").val();
            var tinhthanhlv = $("#use_city_job").val();
            var nganhnghe = $("#use_nganh_nghe").val();
            var dd_quanhuyenlv = $("#use_district_job").val();
            // Tạo formdata
            var formdata = new FormData();
            formdata.append("idcv", idcv);
            formdata.append("dataCVJson", datacv);
            formdata.append("lang", lang);
            formdata.append("height_cv", height_cv);
            formdata.append("account", account);
            formdata.append("phone_lh", phone_lh);
            formdata.append("username", hoten_uv);
            formdata.append("password", newpassword);
            formdata.append("rePassword", confirmnewpass);
            formdata.append("jobName", cv_title);
            formdata.append("address", '');
            formdata.append("ddlv", tinhthanhlv);
            formdata.append("nganhNghe", nganhnghe);
            formdata.append("district", dd_quanhuyenlv);
            $.ajax({
                cache: false,
                type: "POST",
                url: "/CreateCVInOrderToRegister",
                dataType: 'json',
                async: false,
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if (result.result != false) {
                        $("#loader").remove();
                        dataLayer = [];
                        dataLayer.push({
                            'event': 'dangkycv',
                            'email': account,
                        });
                        $("#register_candidate").hide();
                        var msg = ' <div class="show_success_box">'
                        msg += '<div class="success-box">'
                        msg += '<h2 class="success-header">Thông báo</h2>'
                        msg += `<p class="success-message">Tạo Cv Thành Công. Cv Của Bạn Được Lưu Trữ Tại Mục Cv Đã Tạo !!!</p>`;
                        msg += '<button class="success-button" onclick="closeCv(this)">Đóng</button>'
                        msg += '</div>'
                        msg += '</div>';
                        $('body').append(msg);
                    }
                }
            })
        }
    });
    // Luồng chỉnh sửa CV ứng viên (đã có cv) + tạo cv (chưa có cv)
    $(document).on("click", "#btn-save-cv", function () {
        let check = validatecv();
        var idcv = $('#idcv').val();
        var lang = $('#cvo-toolbar .options-lang .active-lang').attr('data-lang');
        var height_cv = $('#form-cv').height();
        var datacv = $.getDataCv();
        if (check != false && idcv && lang && datacv) {
            $("#loader").show();
            $.ajax({
                type: "POST",
                url: "/UpdateInfoCv",
                dataType: 'json',
                data: { idcv: idcv, dataCVJson: datacv, lang: lang, height_cv: height_cv },
                success: function (result) {
                    if (result.result != false) {
                        $("#loader").hide();
                        var msg = ' <div class="show_success_box">'
                        msg += '<div class="success-box">'
                        msg += '<h2 class="success-header">Thông báo</h2>'
                        msg += `<p class="success-message">Chỉnh Sửa Cv Thành Công !!!</p>`;
                        msg += `<button class="success-button" onclick="closeAndDownCV(this)">Đóng</button>`
                        msg += '</div>'
                        msg += '</div>';
                        $('body').append(msg);
                    }
                }
            });
        }
    });
    // 
    $(document).on("click", ".error-button", function () {
        $(this).parents(".show_err_box").hide();
    });

    $(document).on("click", ".txt_close_cvtk", function () {
        $(this).parents(".show-cv-thamkhao").hide();
    });
    // Khi mở sidebar của cv_thamkhao chọn cv bạn muốn
    $(document).on("click", ".input_cvthamkhao", function () {
        var img = $(this).val();
        var linkcv = $(this).attr("data-link");
        //Đi đến content_cv_suggest.ejs
        $(".show-cv-thamkhao").show().find(".img-cv-thamkhao").attr("src", img); // hiển thị ảnh 
        $(".show-cv-thamkhao").find(".button_usesamplecv").attr("href", linkcv); // tìm kiếm link và cho href=linkcv
    });
});

function downloadAsPDF(base64String, cv_name) {
    const downloadLink = document.createElement('a')
    downloadLink.href = base64String
    downloadLink.download = `${cv_name}.pdf`
    downloadLink.click()
}

function closeAndDownCV(e) {
    $("#loader").show();
    var idcv = $('#idcv').val();
    var uid = $('#uid').val();
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "/DowloadFileCVPDF",
        data: {
            idcv: idcv,
            uid: uid
        },
        success: function (result) {
            $("#loader").hide();
            $(".show_success_box").remove();
            if (result.result == true) {
                var url = result.data;
                var name_cv = (result.userName) ? result.userName : "CV_topcvvn";
                downloadAsPDF(`data:application/octet-stream;base64,${url}`, `${name_cv}`);
                setTimeout(() => {
                    alert("Sau khi tải xong bạn sẽ được điều hướng về page trang chủ");
                    window.location.href = "/";
                }, 4000);
            }
        }
    });
}

function closeCv(e) {
    window.location.href = "/";
}