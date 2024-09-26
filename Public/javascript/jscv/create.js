function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
function removeVietnameseTonesTime(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, " ");
    str = str.replace(/tu|nam/g, '');
    str = str.replace('den', '-');
    return str;
}
function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for dd/mm/yyyy format.
    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }

    var today = new Date();
    var year_h = today.getFullYear();
    if ((Number(year_h) - Number(dtYear)) <= 6 || (Number(year_h) - Number(dtYear)) >= 80) {
        return false;
    }
    return true;
}
function renderLoadHtml() {
    var html = `<section id="loader">
                <div class="loader loader-6">
                    <div class="loader-inner"></div>
                </div>
            </section>`;
    $('body').append(html);
}
$(document).ready(function () {
    var position = $('#position').val();
    if (position == '') {
        $('#cv-profile-job').text('');
    }
    // sắp xếp lại thứ tự id cho các box .experience
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
        var parent_cvo_block = item.parents('.cvo-block');
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
        if (parent_cvo_block.find('.ctbx').length == 1) {
            parent_cvo_block.find('.remove').hide();
        } else {
            parent_cvo_block.find('.remove').show();
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
    $(document).on('click', '.blockControls .an-muc', function (e) {
        var item = $(this).parent().parent();
        var itemId = item.attr('id');
        var parentRemoveId = '#' + item.parent().attr('id');
        item.hide();

        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.hideBlock(sortAbleArea[h].area, itemId);

                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);

                return false;
            }
        }
        $("#layout-editor .group").find(".block").each(function () {
            var an_muc = $(this).attr("blockkey");
            if (an_muc == itemId) {
                $(this).removeClass("active");
            }
        })
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
        })
        $("#layout-editor .group").find(".block").each(function () {
            var an_muc = $(this).attr("blockkey");
            if (an_muc == itemId) {
                $(this).removeClass("active");
            }
        })
        for (var h = 0; h < sortAbleArea.length; h++) {
            if (sortAbleArea[h].el === parentRemoveId) {
                $.hideBlock(sortAbleArea[h].area, itemId);

                $.initSortable(sortAbleArea[h], false);
                $.upAndDown(item, sortAbleArea[h].el);

                return false;
            }
        }
    });
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
                // nhấn chuyển box lên trên
                $(document).on('click', `#${id} .up`, function () {
                    console.log('move');
                    let order = (items.toArray().indexOf(self) + 1);
                    console.log(id);
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

                // nhấn chuyển box xuống dưới
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

    if (!$('#toolbar-color').hasClass('mobile') && $('#page-cv').attr('data-type') != 'mobile') {
        changeLayoutCv();
        $(document).on('focusout', function (e) {
            let page = $(e.target).parents('.cv_page').attr('data-page');
            if (page > 1) {
                adjustPage(page - 1);
            } else {
                adjustPage(page);
            }
            // $(e.target).focus();
        })
        if ($('#form-cv .cv_page').length) {
            var sortAbleArea = [
                { el: '.sortable', item: '.block', area: 'menu' },
                { el: '.sort_block', item: '.cvo-block', area: 'experiences' }
            ];
        }
    }
    //Start create data
    for (var l = 0; l < sortAbleArea.length; l++) {
        $.initSortable(sortAbleArea[l], true);
    }
    // bỏ thẻ html khi paste vào
    $('[contenteditable]').on('paste', function (e) {
        e.preventDefault();
        var text = '';
        if (e.clipboardData || e.originalEvent.clipboardData) {
            text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            text = window.clipboardData.getData('Text');
        }
        text = text.replace(/<[^>]*>?/gm, '');

        if (document.queryCommandSupported('insertText')) {
            document.execCommand('insertText', false, text);
        } else {
            document.execCommand('paste', false, text);
        }
        $(this).html($(this).html().replace(/<div>/gi, '<br>').replace(/<\/div>/gi, ''));
    });
    //Get content and export to json data
    $.exportData = function () {
        if ($(document).width() <= 600) {
            data['css'] = {
                color: $('#toolbar-color-mb .boder_color_cv .color.active').attr('data-color'),
                font: $('#font-selector-mb').find("option:selected").val(),
                font_size: $('#cvo-toolbar-mobile .fontsize.active').attr('data-size'),
                font_spacing: $('#giandong_mobi .line-height.active').attr('data-spacing')
            }
        } else {
            data['css'] = {
                color: $('#toolbar-color .color.active').attr('data-color'),
                font: $('#font-selector').find("option:selected").val(),
                font_size: $('#cvo-toolbar .fontsize.active').attr('data-size'),
                font_spacing: $('#cvo-toolbar .line-height.active').attr('data-spacing')
            }
        }
        var cv_title = $('#page-cv #cv-title').text().trim();
        if (cv_title == '') {
            cv_title = $('#cv_alias').val();
        }
        data['cv_title'] = cv_title;
        data['avatar'] = $('#page-cv #cvo-profile-avatar').attr('src');
        data['name'] = $('#cv-profile-fullname').text();
        data['email'] = $('#cv-profile-email').text();
        data['address'] = $('#cv-profile-address').text();
        data['position'] = $('#cv-profile-job').text();
        data['introduction'] = $('#cv-profile-about').html();
        data['background'] = $('#form-cv').attr('data-background') ? $('#form-cv').attr('data-background') : '';
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
                //content = content.replace(/<(?!br\s*\/?)[^>]+>/g, '');
            }
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
        for (var k = 0; k < data['experiences'].length; k++) {
            var tmpItem = $('#' + data['experiences'][k].id),
                content = [],
                el_experience = $('#' + data['experiences'][k].id + ' .experience');
            //export data for box experience
            for (var m = 0; m < el_experience.length; m++) {
                var tmpExp = $('#' + data['experiences'][k].id + ' #' + el_experience[m].id);
                var content1 = tmpExp.find('.exp-content').html();
                //content1 = content1.replace(/<(?!br\s*\/?)[^>]+>/g, '');
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
        var lang = $('#cvo-toolbar-lang .active').attr('data-lang');
        var height_cv = $('#form-cv').height();
        // console.log(ar_data);
        // console.log(lang);
        $.ajax({
            cache: false,
            type: "POST",
            url: "/ajax/SaveCVByUv.php",
            dataType: 'json',
            async: false,
            data: { idcv: idcv, iduser: iduser, ar_data: ar_data, lang: lang, height_cv: height_cv },
            success: function (result) {
                console.log(result);
            }
        });
    };
    $('#btn-save-cv,#btn-save-cv-mobile').on('click', function () {
        var phone = $('#cv-profile-phone');
        var email = $('#cv-profile-email');
        var address = $('#cv-profile-address');
        var fname = $('#cv-profile-fullname');
        var jobname = $('#cv-profile-job');
        var birthday = $('#cv-profile-birthday');
        var sexcv = $('#cv-profile-sex');
        var txt_err = "";
        if (fname.text() != "") {
            var txt_err = '';
            const containsAdmin = fname.text().toLowerCase().indexOf("admin") !== -1; // Sử dụng indexOf
            if (containsAdmin) {
                $("#cv-profile-fullname").css('outline', '1px dashed red');
                txt_err += "Tên không được chứa ký tự admin, ";
                txt_err = txt_err.substring(0, txt_err.length - 2);
                var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
                msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
                msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
                msg += '<div class="el-message-box__btns">';
                msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
                $('body').append(msg);
                return false;
            } else {
                $("#cv-profile-fullname").css('outline', 'unset');
            }
        }
        if (birthday.text() == '' || sexcv.text() == '' || phone.text() == '' || email.text() == '' || fname.text() == '' || address.text() == '' || (jobname.text() == '' || jobname.text().trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.text().trim() == '지원하고 싶은 위치' || jobname.text().trim() == '応募仕事' || jobname.text().trim() == 'Job position')) {
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
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);

            return false;
        }
        if (birthday.text() != '') {
            if (!isDate(birthday.text())) {
                txt_err += 'Ngày sinh không hợp lệ (dd/mm/YYYY) và tuổi phải từ 6 - 80 tuổi, ';
                txt_err = txt_err.substring(0, txt_err.length - 2);
                var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
                msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
                msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
                msg += '<div class="el-message-box__btns">';
                msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
                $('body').append(msg);
                return false;
            }
        }
        if (!/^[0-9]{10}$/.test(phone.text())) {
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Số điện thoại không hợp lệ</div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);

            return false;
        }
        if (validateEmail(email.text()) == false) {
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Email nhập không hợp lệ</div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
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
                    }
                    //check nội dung block
                    else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                        content_suggest.content.forEach(item => {
                            if ((replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                                error = 1;
                            }
                        });
                    }
                    // //check tên công ty trong block
                    // else if ($(this).hasClass('exp-title')) {
                    //     content_suggest.content.forEach(item => {
                    //         if ((replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                    //             error = 1;
                    //         }
                    //     });
                    // }

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
            if (!$(this).parents('#block05').length) { //Không check mục hoạt động, dự án tham gia, thông tin thêm
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
        // // Check box kinh nghiệm
        let errTime = '';
        if (show_error == 1 || errTime) {
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">'
            msg += '<div class="el-message-box"><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'
            msg += name_box.length ? `Bạn chưa sửa các mục: <span style="color:red">${name_box.join(', ')}</span><br>` : ''
            msg += errTime ? `<span style="color:red">${errTime.toUpperCase()}</span>` : ''
            msg += '</div></div>'
            $('body').append(msg)
            if (errTime) {
                $('body').data('focus', forcusTime)
            }
            return false;
        }
        $('#cvo-toolbar').removeClass('fx');
        renderLoadHtml();
        $.exportData();
        var idcv = $('#idcv').val();
        var iduser = $('#uid_cv').val();
        if (is_busy == true) {
            return false;
        }
        save_cv_hide(iduser);
        $.ajax({
            cache: false,
            type: "POST",
            url: "/home/postcv.php",
            data: { iduser: iduser, idcv: idcv },
            success: function (html) {
                var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
                msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
                msg += 'CV của bạn đã được lưu thành công</div></div>';
                msg += '<div class="el-message-box__btns">';
                msg += '<button type="button" onclick="closepopup()" class="el-button el-button--default el-button--primary "><span>Đóng</span></button></div></div></div>';
                $('body').append(msg);
                is_busy = false;
                $('#loader').remove();
            }
        });
    });
    $.randomStr = function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    //Them tool
    $(document).on('click', '#toolbar-color .color', function (e) {
        $('#toolbar-color .color').removeClass('active');
        $(this).addClass('active');
        var newcolor = $(this).attr('data-color');
        var oldlink = $('#cv-color-css').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newcolor + '.css';
        $('#cv-color-css').attr('href', newlink);
    });
    $(document).on('change', '#toolbar-font #font-selector, #cvo-toolbar-mobile #font-selector-mb', function (e) {
        var newfont = $(this).find("option:selected").val();
        var oldlink = $('#cv-font').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newfont + '.css';
        $('#cv-font').attr('href', newlink);
    });
    $(document).on('click', '#cvo-toolbar .fontsize, #cvo-toolbar-mobile .fontsize', function (e) {
        $('#cvo-toolbar .fontsize,#cvo-toolbar-mobile .fontsize').removeClass('active');
        $(this).addClass('active');
        var newsize = $(this).attr('data-size');
        var oldlink = $('#cv-font-size').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newsize + '.css';
        $('#cv-font-size').attr('href', newlink);
    });
    // gian dòng
    $(document).on('click', '#cvo-toolbar .line-height, #giandong_mobi .line-height', function (e) {
        $('#cvo-toolbar .line-height, #giandong_mobi .line-height').removeClass('active');
        $(this).addClass('active');
        var newspacing = $(this).attr('data-spacing');
        var oldlink = $('#cv-cpacing-css').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newspacing + '.css';
        $('#cv-cpacing-css').attr('href', newlink);
    });
    $(document).on('click', '#cvo-toolbar-lang .btn-lang-option, #cvo-toolbar-lang-mb .btn-lang-option, .ld-lang .btn-lang-option', function () {
        var lang = $(this).attr('data-lang');
        if (lang != '') {
            setCookie('lang', lang, 86400, "/");
            location.reload();
        }
    });
    $(document).on('click', '.ld-color .color', function (e) {
        $('.ld-color .border-color').removeClass('active');
        $(this).parent('.border-color').addClass('active');
        var newcolor = $(this).attr('data-color');
        var oldlink = $('#cv-color-css').attr('href');
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newcolor + '.css';
        $('#cv-color-css').attr('href', newlink);
        $('#cvo-toolbar-mobile .color').attr('data-color', newcolor);
        $('#cvo-toolbar-mobile .color').css('background-color', `#${newcolor}`);
    });
    $(document).on('click', '#layout-editor .group .block, #layout-editor-mb .group .block', function (e) {
        var id = $(this).attr('blockkey');
        var boxid = $(this).attr('blockmain');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $.hideBlock(boxid, id);
            $('#' + id).hide();
        } else {
            $(this).addClass('active');
            $.showBlock(boxid, id);
            $('#' + id).show();
        }
    });
    $(document).on('click', '#btn-edit-layout', function (e) {
        $('#layout-editor-container').show();
        $('#btn-shadow').show();
    });
    $(document).on('click', '.action-bar .btn-finish', function (e) {
        $('#layout-editor-container').hide();
        $('.ld-them-muc').addClass('hidden');
        $('#btn-shadow').hide();
    });
});
// =====================================================download file pdf sau khi tạo cv xong=========================================================================================================================
function downloadAsPDF(base64String, cv_name) {
    const downloadLink = document.createElement('a')
    downloadLink.href = base64String
    downloadLink.download = `${cv_name}.pdf`
    downloadLink.click()
}
function closepopup() {
    $('.bg-spinner').remove();
    $('.v-modal').hide();
    $('.el-message-box').hide();
    var idcv = $('#idcv').val();
    var iduser = $('#uid_cv').val();
    renderLoadHtml();
    $.ajax({
        type: "POST",
        url: "/ajax/saveCVUVPDF.php",
        dataType: 'json',
        data: { idcv: idcv, iduser: iduser },
        success: function (result) {
            if (result.result != false) {
                var url = result.file_cv;
                var name_cv = result.name_cv;
                downloadAsPDF(`data:application/octet-stream;base64,${url}`, `${name_cv}`);
                var idcv = $('#idcv').val();
                $.ajax({
                    type: "POST",
                    url: "/ajax/update_downcv.php",
                    data: {
                        idcv: idcv,
                    },
                    success: function (data) { }
                })
                setTimeout(function () {
                    // window.location = '/ung-vien/cv-xin-viec.html';
                    window.location = '/';
                }, 1000)
            } else {
                $.exportData();
                url = $('#download_Cv').attr('href');
                name_cv = $('#download_Cv').attr('name-cv');
                window.location = url;
            }
        }
    });
}
function closepopupuvdk() {
    $('.bg-spinner').remove();
    $('.v-modal').hide();
    $('.el-message-box').hide();
    window.location = '/';
}
function closepopup_dhuong() {
    $('.bg-spinner').remove();
    $('.v-modal').hide();
    $('.el-message-box__wrapper').hide();
    window.location = '/ ';
}
function checkvali_CV1() {
    var phone = $('#cv-profile-phone');
    var email = $('#cv-profile-email');
    var address = $('#cv-profile-address');
    var fname = $('#cv-profile-fullname');
    var jobname = $('#cv-profile-job');
    var birthday = $('#cv-profile-birthday');
    var sexcv = $('#cv-profile-sex');
    var txt_err = "";
    var returnform_cv = true;
    if (fname.text() != "") {
        var txt_err = '';
        const containsAdmin = fname.text().toLowerCase().indexOf("admin") !== -1; // Sử dụng indexOf
        if (containsAdmin) {
            $("#cv-profile-fullname").css('outline', '1px dashed red');
            txt_err += "Tên không được chứa ký tự admin, ";
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            returnform_cv = false;
        } else {
            $("#cv-profile-fullname").css('outline', 'unset');
        }
    }
    if (birthday.text() == '' || sexcv.text() == '' || phone.text() == '' || email.text() == '' || fname.text() == '' || address.text() == '' || (jobname.text() == '' || jobname.text().trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.text().trim() == '지원하고 싶은 위치' || jobname.text().trim() == '応募仕事' || jobname.text().trim() == 'Job position')) {
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
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        returnform_cv = false;
    }
    if (birthday.text() != '') {
        if (!isDate(birthday.text())) {
            txt_err += 'Ngày sinh không hợp lệ (dd/mm/YYYY) và tuổi phải từ 6 - 80 tuổi, ';
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            return false;
        }
    }
    if (!/^[0-9]{10}$/.test(phone.text())) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Số điện thoại không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        returnform_cv = false;
    }
    if (validateEmail(email.text()) == false) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Email nhập không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        returnform_cv = false;
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
                }
                //check nội dung block
                else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                    content_suggest.content.forEach(item => {
                        if ((replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                            error = 1;
                        }
                    });
                }
                //check tên công ty trong block
                // else if ($(this).hasClass('exp-title')) {
                //     content_suggest.content.forEach(item => {
                //         if ((replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                //             error = 1;
                //         }
                //     });
                // }
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
        if (!$(this).parents('#block05').length) { //thông tin thêm
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
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += `Bạn chưa sửa các mục: <span style="color:red">${name_box.join(', ')}</span></div></div>`;
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);
        $('body').append(msg);
        returnform_cv == false;
    }

    if (returnform_cv == true) {
        $.ajax({
            type: "POST",
            url: "/codelogin/register_bycv_tdn.php",
            data: {
                email: email,
                password: ccrepass_cv.val(),
                user_name: hoten,
                phone: ccphone_cv.val(),
                jobname: jobname,
                address: user_address,
                ddlv: job_city_cv.val(),
                nn_mm: nganh_nghe_cv.val()
            },
            dataType: 'json',
            beforeSend: function () {
                $('#submit_b1_dki').val('Đang tải dữ liệu ..');
            },
            success: function (e) {
                if (e.result == true) {
                    $("#uid_cv").val(e.id_user)
                    save_cv_login(e.id_user);
                    $(".box-modal-create-cv").addClass("hidden");
                } else {
                    ccphone_cv.addClass('error');
                    ccphone_cv.after('<label id="user_phone_error" class="error tt" for="user_phone">Tài khoản đã tồn tại</label>');
                    $('#submit_b1_dki').val('Đăng ký');
                }
            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "../ajax/candi_register_error.php",
            data: {
                email_lh: email,
                password_uv: ccrepass_cv.val(),
                full_name: hoten,
                uv_phone: ccphone_cv.val(),
                phone_tk: ccphone_cv.val(),
                cvmm: jobname,
                frm_address: user_address,
                job_address: job_city_cv.val(),
                nganh_nghe: nganh_nghe_cv.val(),
                tmp_register: 2
            },
            success: function () { }
        })
    }
    return false;
}
function validatePass($pass) {
    var valPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    return valPass.test($pass);
}
function validateUserPhone($phone) {
    var valPhone = /^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/;
    return valPhone.test($phone);
}
// =====================================================LUỒNG CV KHI ĐĂNG NHẬP RỒI MỚI TẠO CV========================================================================================================================
$(document).on("click", "#luu_cv_dk", function () {
    var phone = $('#cv-profile-phone');
    var email = $('#cv-profile-email');
    var address = $('#cv-profile-address');
    var fname = $('#cv-profile-fullname');
    var jobname = $('#cv-profile-job');
    var birthday = $('#cv-profile-birthday');
    var sexcv = $('#cv-profile-sex');
    var txt_err = "";

    if (fname.text() != "") {
        var txt_err = '';
        const containsAdmin = fname.text().toLowerCase().indexOf("admin") !== -1; // Sử dụng indexOf
        if (containsAdmin) {
            $("#cv-profile-fullname").css('outline', '1px dashed red');
            txt_err += "Tên không được chứa ký tự admin, ";
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            return false;
        } else {
            $("#cv-profile-fullname").css('outline', 'unset');
        }
    }
    if (birthday.text() == '' || sexcv.text() == '' || phone.text() == '' || email.text() == '' || fname.text() == '' || address.text() == '' || (jobname.text() == '' || jobname.text().trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.text().trim() == '지원하고 싶은 위치' || jobname.text().trim() == '応募仕事' || jobname.text().trim() == 'Job position')) {
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
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        return false;
    }
    if (birthday.text() != '') {
        if (!isDate(birthday.text())) {
            txt_err += 'Ngày sinh không hợp lệ (dd/mm/YYYY) và tuổi phải từ 6 - 80 tuổi, ';
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            return false;
        }
    }
    if (!/^[0-9]{10}$/.test(phone.text())) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Số điện thoại không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        return false;
    }
    if (validateEmail(email.text()) == false) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Email nhập không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
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
                }
                //check nội dung block
                else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                    content_suggest.content.forEach(item => {
                        if ((replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                            error = 1;
                        }
                    });
                }
                //check tên công ty trong block
                // else if ($(this).hasClass('exp-title')) {
                //     content_suggest.content.forEach(item => {
                //         if ((replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                //             error = 1;
                //         }
                //     });
                // }
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
        if (!$(this).parents('#block05').length) { //Không check mục hoạt động, dự án tham gia, thông tin thêm
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
    // // Check box kinh nghiệm
    let errTime = '';
    if (show_error == 1 || errTime) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">'
        msg += '<div class="el-message-box"><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'
        msg += name_box.length ? `Bạn chưa sửa các mục: <span style="color:red">${name_box.join(', ')}</span><br>` : ''
        msg += errTime ? `<span style="color:red">${errTime.toUpperCase()}</span>` : ''
        msg += '</div></div>'
        $('body').append(msg)
        if (errTime) {
            $('body').data('focus', forcusTime)
        }
        return false;
    }
    // gọi đến api đưa ra popup gợi ý ngành nghề
    var html = '';
    if (jobname.text().trim() !== "") {
        $.ajax({
            url: '/ajax/goiynganhngheuv.php',
            type: 'POST',
            data: {
                txt_timkiem: jobname.text().trim(),
            },
            dataType: "JSON",
            success: function (data) {
                html = '';
                if (data.length > 0) {
                    data.forEach(element => {
                        html += `
                            <div class="boxslgeneral">
                                <input class="inputsl" type="checkbox" value="${element.cat_user_id}">
                                <p class="txtslgeneral">${element.cat_user_name}</p>
                            </div>
                        `;
                    });
                    $("#popup_selectcateUV .show_select").html(html);
                    $("#popup_selectcateUV").show();
                }
            }
        });
    }
    // ========================================
    $("#boxRes").show();
    $("#boxRes #phone").val(phone.text());
    $("#boxRes #name").val(fname.text());
})
$(document).on("click", ".button_selectcate", function () {
    var arr_idcate = []
    $(".boxslgeneral").each(function () {
        if ($(this).find(".inputsl").is(":checked")) {
            var valueid = $(this).find(".inputsl").val();
            arr_idcate.push(valueid);
        }
    })
    $("#cate-dk").val(arr_idcate).trigger("change");
    $("#popup_selectcateUV").hide();
})
$(document).on("click", ".button_cancel_cate", function () {
    $("#popup_selectcateUV").hide();
})
// ====================================================LUỒNG KHI TẠO CV XONG THÌ ĐĂNG KÝ TÀI KHOẢN THÔNG QUA POPUP ĐĂNG KÝ==========================================================================================
//Kiểm tra password trong form
$("#password").keyup(function () {
    var valPass = $("#password");
    $("#password").addClass("valid");
    if ($("#password").hasClass('valid') == true) {
        if (valPass.val().length > 0) {
            $("#password_error").remove();
            if (valPass.val().length < 6 || validatePass(valPass.val()) == false) {
                if ($("#password_error").hasClass("error") == false) {
                    valPass.after('<span id="password_error" class="error" for="password" style="display: inline-block;">Mật khẩu phải tối thiểu 6 kí tự, có ít nhất 1 chữ, 1 số và không chứa dấu cách.</span>');
                    valPass.addClass('error');
                }
            } else {
                $("#password_error").remove();
                valPass.removeClass('error');
            }
        } else {
            $("#password_error").remove();
            valPass.after('<span id="password_error" class="error" for="password" style="display: inline-block;">Vui lòng nhập mật khẩu.</span>');
            valPass.addClass('error');
        }
    }
});
//Kiểm tra password trong form
$("#repassword").keyup(function () {
    var valRePass = $("#repassword");
    $("#repassword_error").remove();
    $("#repassword").addClass("valid");
    if ($("#repassword").hasClass('valid') == true) {
        if (valRePass.val().length > 0) {
            var valPass = $("#password");
            if (valRePass.val() != valPass.val()) {
                valRePass.after('<span id="repassword_error" class="error" for="repassword" style="display: inline-block;">Bạn đang nhập sai mật khẩu xác nhận</span>');
                valRePass.addClass('error');
            } else {
                $("#repassword_error").remove();
                valRePass.removeClass('error');
            }
        } else {
            $("#repassword_error").remove();
            valRePass.removeClass('error');
        }
    }
});
//Kiểm tra trống tên ứng viên
$("#name").keyup(function () {
    $("#name_error").remove();
    var valcandidate = $("#name");
    $("#name").addClass("valid");
    if (valcandidate.hasClass("valid") == true) {
        if (valcandidate.val().length == 0) {
            valcandidate.after('<span id="name_error" class="error" for="name">Vui lòng nhập họ tên</span>');
            valcandidate.addClass('error');
        } else {
            $("#name_error").remove();
            valcandidate.removeClass('error');
        }
    }
});
//Kiểm tra số điện thoại
jQuery("#phone").keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
$("#phone").keyup(function () {
    var valPhone = $("#phone");
    $("#phone_error").remove();
    valPhone.removeClass('error');
    $("#phone").addClass("valid");
    if (valPhone.val().length == 0) {
        if ($("#phone_error").hasClass("error") == false) {
            valPhone.after('<span id="phone_error" class="error" for="phone">Vui lòng nhập số điện thoại</span>');
            valPhone.addClass('error');
        }
    } else {
        $("#phone_error").remove();
        valPhone.removeClass('error');
        if (validateUserPhone(valPhone.val()) == false) {
            if ($("#phone_error").hasClass("error") == false) {
                valPhone.after('<span id="phone_error" class="error" for="phone">Vui lòng nhập đúng định dạng điện thoại</span>');
                valPhone.addClass('error');
            }
        } else if (valPhone.val() != "") {
            $("#phone_error").remove();
            valPhone.removeClass('error');
            $.ajax({
                url: "/ajax/check_phoneres.php",
                type: "POST",
                data: { phone_check: valPhone.val() },
                success: function (data) {
                    console.log(data);
                    if (data == 1) {
                        console.log(5)
                        $("#phone").after(`<span id="phone_error" class="error" for="phone">Số điện thoại đã được đăng ký, bạn đăng ký bằng số điện thoại khác hoặc lấy lại mật khẩu bằng số ĐT ${valPhone.val()} <a class="m_redirect" href="/ung-vien/quen-mk">tại đây</span>`);
                        $("#phone").addClass('error');
                    }
                }
            })
        } else {
            $("#phone_error").remove();
            valPhone.removeClass('error');
        }
    }
});
// Nhấn đăng ký tài khoản
$(".m_btndangkytk").click(function () {
    var checkerr = true;
    $("#m_dangkytk").removeClass("m_btndangkytk");
    var email = $('#cv-profile-email').text();
    var address = $('#cv-profile-address').text();
    var jobname = $('#cv-profile-job').text();
    let phone_tk = $("#phone").val();
    let name = $("#name").val();
    let password = $("#password").val();
    let repass = $("input[name='repass']").val();
    let nganhnghe = $("#cate-dk").val();
    let tinhthanh = $("#city-selector").val();
    let quanhuyen = $("#district-selector").val();
    $("#cate-dk_error,#city-selector_error,#district-selector_error,#phone_error,#name_error,#password_error,#repassword_error").remove();
    if (phone_tk == "") {
        $('#phone').after('<span id="phone_error" class="error">Vui lòng nhập số điện thoại</span>');
        $('#phone').addClass('error');
        checkerr = false;
    } else if (validateUserPhone($("#phone").val()) == false) {
        if ($("#phone_error").hasClass("error") == false) {
            $("#phone").after('<span id="phone_error" class="error" for="phone">Vui lòng nhập đúng định dạng điện thoại</span>');
            $("#phone").addClass('error');
        }
        checkerr = false;
    } else if (phone_tk != "") {
        $.ajax({
            url: "/ajax/check_phoneres.php",
            type: "POST",
            async: !1,
            data: { phone_check: phone_tk },
            success: function (data) {
                console.log(data);
                if (data == 1) {
                    console.log(5)
                    $("#phone").after(`<span id="phone_error" class="error" for="phone">Số điện thoại đã được đăng ký, bạn đăng ký bằng số điện thoại khác hoặc lấy lại mật khẩu bằng số ĐT ${phone_tk} <a class="m_redirect" href="/ung-vien/quen-mk">tại đây</span>`);
                    $("#phone").addClass('error');
                    checkerr = false;
                }
            }
        })
    } else {
        $("#phone_error").remove();
        $('#phone').removeClass('error');
    }
    if (name.length == 0) {
        $("#name").after('<span id="name_error" class="error">Vui lòng nhập họ tên</span>');
        $("#name").addClass('error');
        checkerr = false;
    } else {
        $("#name_error").remove();
        $("#name").removeClass('error');
    }
    if (password.length == 0) {
        $("#password").after('<span id="password_error" class="error">Vui lòng nhập mật khẩu</span>');
        $("#password").addClass('error');
        checkerr = false;
    } else {
        if (validatePass(password) == false) {
            if ($("#password_error").hasClass("error") == false) {
                $("#password").after('<span id="password_error" class="error" for="password" style="display: inline-block;">Mật khẩu phải có ít nhất 6 ký tự gồm cả chữ và số.</span>');
                $("#password").addClass('error');
            }
            checkerr = false;
        } else {
            $("#password_error").remove();
            $("#password").removeClass('error');
        }
    }
    if (repass.length == 0) {
        $("#repassword").after('<span id="repassword_error" class="error">Vui lòng nhập mật khẩu xác nhận</span>');
        $("#repassword").addClass('error');
        checkerr = false;
    } else {
        if (repass != password) {
            $("#repassword").after('<span id="repassword_error" class="error" for="repassword" style="display: inline-block;">Bạn đang nhập sai mật khẩu xác nhận</span>');
            $("#repassword").addClass('error');
            checkerr = false;
        } else {
            $("#repassword_error").remove();
            $("#repassword").removeClass('error');
        }
    }
    if (nganhnghe.length == 0) {
        $('.m_nganhnghe').after('<span id="cate-dk_error" class="error">Vui lòng ngành nghề mong muốn</span>');
        $('.m_nganhnghe').addClass('error');
        checkerr = false;
    } else {
        $("#cate-dk_error").remove();
        $('.m_nganhnghe').removeClass('error');
    }
    if (tinhthanh.length == 0) {
        $('.m_tinhthanh').after('<span id="city-selector_error" class="error" >Vui lòng chọn tỉnh thành tương ứng</span>');
        $('.m_tinhthanh').addClass('error');
        checkerr = false;
    } else {
        $("#city-selector_error").remove();
        $('.m_tinhthanh').removeClass('error');
    }
    if (quanhuyen.length == 0) {
        $('.m_quanhuyen').after('<span id="district-selector_error" class="error" >Vui lòng chọn quận huyện tương ứng</span>');
        $('.m_quanhuyen').addClass('error');
        checkerr = false;
    } else {
        $("#district-selector_error").remove();
        $('.m_quanhuyen').removeClass('error');
    }
    console.log(checkerr);
    if (checkerr == false) {
        $("#m_dangkytk").addClass("m_btndangkytk");
        if ($("#name").val().length > 0 && $("#phone").val().length > 0) {
            $.ajax({
                type: "POST",
                url: '/ajax/uv_register_error.php',
                data: { hoten_uv: name, username: phone_tk, password: password, cv_title: jobname, diachi_chitiet: address, dd_lamviec: tinhthanh, dd_quanhuyenlv: quanhuyen, nganhnghe: nganhnghe },
                success: function (data) { }
            });
        }
    } else {
        $.ajax({
            url: "/codexuly/register_uvcv.php",
            type: "POST",
            data: {
                name: name,
                phone_tk: phone_tk,
                password: password,
                tinhthanh: tinhthanh,
                quanhuyen: quanhuyen,
                nganhnghe: nganhnghe,
                email: email,
                address: address,
                jobname: jobname
            },
            success: function (data) {
                $("#boxRes").hide();
                $("#m_dangkytk").addClass("m_btndangkytk");
                create_CvUV(data);
            }
        })
    }
})
// ========================================================LUỒNG KHI TẠO TÀI KHOẢN XONG RỒI CHỌN CÁCH ĐĂNG KÝ BẰNG CÁCH TẠO CV=================================================================================================================================
$("#luu_cv_b3").click(function () {
    var email = $('#cv-profile-email').text();
    var address = $('#cv-profile-address').text();
    var jobname = $('#cv-profile-job').text();
    var gender = $('#cv-profile-sex').text();
    var birthday = $('#cv-profile-birthday').text();
    var phone = $('#cv-profile-phone').text();
    var fname = $('#cv-profile-fullname').text();
    var sexcv = $('#cv-profile-sex').text();
    var txt_err = "";
    if (fname != "") {
        var txt_err = '';
        const containsAdmin = fname.toLowerCase().indexOf("admin") !== -1; // Sử dụng indexOf
        if (containsAdmin) {
            $("#cv-profile-fullname").css('outline', '1px dashed red');
            txt_err += "Tên không được chứa ký tự admin, ";
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            returnform_cv = false;
        } else {
            $("#cv-profile-fullname").css('outline', 'unset');
        }
    }
    if (birthday == '' || sexcv == '' || phone == '' || email == '' || fname == '' || address == '' || (jobname == '' || jobname.trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.trim() == '지원하고 싶은 위치' || jobname.trim() == '応募仕事' || jobname.trim() == 'Job position')) {
        if (birthday == '') {
            $('#cv-profile-birthday').css('outline', '1px dashed red');
            txt_err += "Ngày sinh, ";
        } else {
            $('#cv-profile-birthday').css('outline', 'unset');
        }
        if (sexcv == '') {
            $('#cv-profile-sex').css('outline', '1px dashed red');
            txt_err += "Giới tính, ";
        } else {
            $('#cv-profile-sex').css('outline', 'unset');
        }
        if (fname == '') {
            $('#cv-profile-fullname').css('outline', '1px dashed red');
            txt_err += "Họ tên, ";
        } else {
            $('#cv-profile-fullname').css('outline', 'unset');
        }
        if (jobname == '' || jobname.trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.trim() == '지원하고 싶은 위치' || jobname.trim() == '応募仕事' || jobname.trim() == 'Job position') {
            $('#cv-profile-job').css('outline', '1px dashed red');
            txt_err += "Vị trí muốn ứng tuyển, ";
        } else {
            $('#cv-profile-job').css('outline', 'unset');
        }
        if (phone == '') {
            $('#cv-profile-phone').css('outline', '1px dashed red');
            txt_err += "Số điện thoại, ";
        } else {
            $('#cv-profile-phone').css('outline', 'unset');
        }
        if (email == '') {
            $('#cv-profile-email').css('outline', '1px dashed red');
            txt_err += "Email, ";
        } else {
            $('#cv-profile-email').css('outline', 'unset');
        }
        if (address == '') {
            $('#cv-profile-address').css('outline', '1px dashed red');
            txt_err += "Địa chỉ, ";
        } else {
            $('#cv-profile-address').css('outline', 'unset');
        }
        txt_err = txt_err.substring(0, txt_err.length - 2);
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        return false;
    }
    if (birthday != '') {
        if (!isDate(birthday)) {
            txt_err += 'Ngày sinh không hợp lệ (dd/mm/YYYY) và tuổi phải từ 6 - 80 tuổi, ';
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            return false;
        }
    }
    if (!/^[0-9]{10}$/.test(phone)) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Số điện thoại không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        return false;
    }
    if (validateEmail(email) == false) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Email nhập không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
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
                }
                //check nội dung block
                else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                    content_suggest.content.forEach(item => {
                        if ((replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                            error = 1;
                        }
                    });
                }

                //check tên công ty trong block
                // else if ($(this).hasClass('exp-title')) {
                //     content_suggest.content.forEach(item => {
                //         if ((replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                //             error = 1;
                //         }
                //     });
                // }
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
        if (!$(this).parents('#block05').length) { //Không check mục hoạt động, dự án tham gia, thông tin thêm
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
    // // Check box kinh nghiệm
    let errTime = '';
    if (show_error == 1 || errTime) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">'
        msg += '<div class="el-message-box"><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'
        msg += name_box.length ? `Bạn chưa sửa các mục: <span style="color:red">${name_box.join(', ')}</span><br>` : ''
        msg += errTime ? `<span style="color:red">${errTime.toUpperCase()}</span>` : ''
        msg += '</div></div>'
        $('body').append(msg)
        if (errTime) {
            $('body').data('focus', forcusTime)
        }
        return false;
    }
    renderLoadHtml();
    $.ajax({
        url: "/codexuly/register_uvcv_b3.php",
        type: "POST",
        data: {
            email: email,
            address: address,
            jobname: jobname,
            gender: gender,
            birthday: birthday,
        },
        success: function (data) {
            $('#loader').remove();
            create_CvUV(data);
        }
    })
})
// =========================================================LUỒNG KHI TẠO CV XONG RỒI ĐĂNG NHẬP TÀI KHOẢN THÌ LƯU LẠI CV ĐÓ===================================================================================================================
$(document).on("click", ".btndangnhapcv", function () {
    $("#boxRes").hide();
    email = $('#log_mail');
    password = $('#log_pass');
    href = $(this).attr('data-href');

    if (email.val() == '' || password.val() == '') {
        if ($('#alert-log-in-error').hasClass('hidden')) {
            $('#alert-log-in-error').removeClass('hidden');
        }
        $('#alert-log-in-message').html("Vui lòng nhập đầy đủ thông tin đăng nhập");
    } else {
        $.ajax({
            async: false,
            type: "POST",
            dataType: 'json',
            url: "../ajax/uvlogin.php",
            data: {
                email: email.val(),
                password: password.val(),
            },
            success: function (data) {
                if (data.result == 1) {
                    console.log(data.user_id)
                    $("#boxLog").hide();
                    create_CvUV(data.user_id);
                } else {
                    alert(data.message);
                }
            }
        });
    }
})
// ==========================================================HÀM TẠO CV ỨNG VIÊN CHUNG====================================================================================================================
function create_CvUV(iduser) {
    var phone = $('#cv-profile-phone');
    var email = $('#cv-profile-email');
    var address = $('#cv-profile-address');
    var fname = $('#cv-profile-fullname');
    var jobname = $('#cv-profile-job');
    var birthday = $('#cv-profile-birthday');
    var sexcv = $('#cv-profile-sex');
    var txt_err = "";
    if (fname.text() != "") {
        var txt_err = '';
        const containsAdmin = fname.text().toLowerCase().indexOf("admin") !== -1; // Sử dụng indexOf
        if (containsAdmin) {
            $("#cv-profile-fullname").css('outline', '1px dashed red');
            txt_err += "Tên không được chứa ký tự admin, ";
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            return false;
        } else {
            $("#cv-profile-fullname").css('outline', 'unset');
        }
    }
    if (birthday.text() == '' || sexcv.text() == '' || phone.text() == '' || email.text() == '' || fname.text() == '' || address.text() == '' || (jobname.text() == '' || jobname.text().trim() == 'Vị trí công việc bạn muốn ứng tuyển' || jobname.text().trim() == '지원하고 싶은 위치' || jobname.text().trim() == '応募仕事' || jobname.text().trim() == 'Job position')) {
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
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        return false;
    }
    if (birthday.text() != '') {
        if (!isDate(birthday.text())) {
            txt_err += 'Ngày sinh không hợp lệ (dd/mm/YYYY) và tuổi phải từ 6 - 80 tuổi, ';
            txt_err = txt_err.substring(0, txt_err.length - 2);
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'Bạn chưa điền đầy đủ các trường: <span style="color:red">' + txt_err + '</span></div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
            $('body').append(msg);
            return false;
        }
    }
    if (!/^[0-9]{10}$/.test(phone.text())) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Số điện thoại không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
        $('body').append(msg);

        return false;
    }
    if (validateEmail(email.text()) == false) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
        msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
        msg += 'Email nhập không hợp lệ</div></div>';
        msg += '<div class="el-message-box__btns">';
        msg += '<button type="button" onclick="hide()" class="el-button el-button--default"><span>Hủy bỏ</span></button>';
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
                }
                //check nội dung block
                else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                    content_suggest.content.forEach(item => {
                        if ((replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                            error = 1;
                        }
                    });
                }
                //check tên công ty trong block
                // else if ($(this).hasClass('exp-title')) {
                //     content_suggest.content.forEach(item => {
                //         if ((replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') || replaceStr($(this).html().toLowerCase()).includes('cv365')) {
                //             error = 1;
                //         }
                //     });
                // }
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
        if (!$(this).parents('#block05').length) { //Không check mục hoạt động, dự án tham gia, thông tin thêm
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
    // // Check box kinh nghiệm
    let errTime = '';
    if (show_error == 1 || errTime) {
        var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">'
        msg += '<div class="el-message-box"><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">'
        msg += name_box.length ? `Bạn chưa sửa các mục: <span style="color:red">${name_box.join(', ')}</span><br>` : ''
        msg += errTime ? `<span style="color:red">${errTime.toUpperCase()}</span>` : ''
        msg += '</div></div>'
        $('body').append(msg)
        if (errTime) {
            $('body').data('focus', forcusTime)
        }
        return false;
    }
    $('#cvo-toolbar').removeClass('fx');
    renderLoadHtml();
    $.exportData();
    var idcv = $('#idcv').val();
    if (is_busy == true) {
        return false;
    }
    save_cv_hide(iduser);
    $.ajax({
        cache: false,
        type: "POST",
        url: "/home/postcv.php",
        data: { iduser: iduser, idcv: idcv },
        success: function (html) {
            var msg = '<div class="v-modal" style="z-index: 9999;"></div><div tabindex="-1" class="el-message-box__wrapper" style="z-index: 9999;">';
            msg += '<div class="el-message-box"><div class="el-message-box__header"><div class="el-message-box__title">Thông báo</div></div><div class="el-message-box__content"><div class="el-message-box__status el-icon-warning"></div><div class="el-message-box__message" style="margin-left: 50px;">';
            msg += 'CV của bạn đã được lưu thành công và chuyển vào mục CV đã tạo !!!</div></div>';
            msg += '<div class="el-message-box__btns">';
            msg += '<button type="button" onclick="closepopupuvdk()" class="el-button el-button--default el-button--primary "><span>Đóng</span></button></div></div></div>';
            $('body').append(msg);
            is_busy = false;
            $('#loader').remove();
            // location.href = `/`
        }
    });
};
function save_cv_hide(uid) {
    var is_busy = false;
    $('#cv-profile-phone').text('Xem ở trên');
    $('#cv-profile-email').text('Xem ở trên');
    var name = $('#cv-title').text();
    var hide = 1;
    var cvid = $('#idcv').val();
    if (name == '') {
        name = $('#cv_alias').val();
    }
    if (is_busy == true) {
        return false;
    }
    $.ajax({
        cache: false,
        type: "POST",
        url: "/home/postcv.php",
        data: { name: name, idcv: cvid, iduser: uid, hide: hide },
    });
}
function save_cv_login(uid) {
    if ($(window).width() < 1300) {
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
    }
    $('#cvo-toolbar').removeClass('fx');
    $('body').append('<div class="bg-spinner"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>');
    $.exportData();
    var is_busy = false;
    var name = $('#cv-title').text();
    var cvid = $('#idcv').val();
    if (name == '') name = $('#cv_alias').val();
    if (is_busy == true) return false;
    save_cv_hide(uid);
    $.ajax({
        cache: false,
        type: "POST",
        url: "/home/postcv.php",
        data: { name: name, idcv: cvid, iduser: uid },
        success: function () {
            // window.location.href = '/ung-vien/xac-thuc-tai-khoan.html';
        }
    });
}
function btnsb() {
    if ($(window).width() < 1300) {
        $(window).scrollTop(0);
        $(window).scrollLeft(0);
    }
    $('#cvo-toolbar').removeClass('fx');
    $.exportData();
}
$('#page-cv').on('copy', function (e) {
    e.preventDefault();
});
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if (scrollTop >= 120) {
        $("#cvo-toolbar").addClass("showfixed");
        $("#hoso-scroll").css("top", 180);
    } else if (scrollTop < 10) {
        $("#cvo-toolbar").removeClass("showfixed")
        $("#hoso-scroll").css("top", 0);
    }
});
$(window).click(function (e) {
    if (!$(".el-message-box").is(e.target) && $(".el-message-box").has(e.target).length == 0) {
        $(".el-message-box__wrapper").hide();
        $(".v-modal").hide();
    }
})
$(document).on("click", ".lightbox .exit", function () {
    $(this).parents('.lightbox').hide();
})
$(document).on("click", "#cv-profile-job", function () {
    $("span#cv-profile-job[style='outline: red dashed 1px;']").text("");
})