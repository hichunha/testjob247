function scale_mobile(widthcv) {
    if (widthcv >= 792) {
        $("#page-cv").attr("style", "");
        $(".page_cv").attr({
            "max-width": "calc(100% - 430px)",
            "transition": "0.5s"
        });
        $("#m_cv").attr("style", "");
    }
    if (widthcv < 792) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.999); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 792px;");
    }
    if (widthcv <= 768) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.97); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.97 + 500);
    }
    if (widthcv <= 600) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.758); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.758 + 500);
    }
    if (widthcv <= 550) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.69); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.69 + 500);
    }
    if (widthcv <= 430) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.54); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.54 + 500);
    }
    if (widthcv <= 416) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.519); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        $("#page-cv").css('height', 'unset');
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.519 + 500);
    }
    if (widthcv <= 400) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.472); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.472 + 500);
    }
    if (widthcv == 390) {
        $("#page-cv").attr("style", "width: 792px; transform: scale(0.489); transform-origin: 0px 0px");
        $(".page_cv").attr("style", "width: 100%;");
        var height_cv1 = $("#page-cv").height();
        $("#page-cv").css('height', height_cv1 * 0.489 + 500);
    }
}


$(document).ready(function () {
    var widthcv = $(window).width();
    scale_mobile(widthcv);
});

// if ($(document).width() <= 480) {
//     $("#m_cv").css('height', 'unset');
//     $("#page-cv").css({
//         'width': '792px',
//         'transform': 'scale(0.52)',
//         'transform-origin': '0px 0px'
//     });
//     var width_p1 = 790 * 0.52;
//     $(".page_cv").css('width', width_p1 + 'px');
//     setTimeout(function () {
//         var height_cv1 = $("#m_cv").height();
//         $("#m_cv").css('height', height_cv1 * 0.52);
//     }, 1000)
// }
if ($(window).width() < 600) {
    function check_content_popup() {
        var e = $("#cv-profile-job").text(),
            t = $("#cv-profile-phone").text(),
            a = $("#cv-profile-email").text(),
            i = $("#cv-profile-address").text(),
            s = $("#cv-profile-fullname").text();
        b = $("#cv-profile-birthday").text();
        n = $("#cv-profile-job").text();

        var pbiet = $("#btn-save-cv-reg-mobile").attr("data");
        var err = 2;
        let text_mis = '';

        if ($("#idcv").val() != "" && $("#idcv").val() != "undefined") {
            if ("" == t || "" == s || "" == i || "" == n || "" == b) {
                "" == s && (document.getElementById("cv-profile-fullname").style.outline = "1px dashed red"), "" == t && (document.getElementById("cv-profile-phone").style.outline = "1px dashed red"), "" == a && (document.getElementById("cv-profile-email").style.outline = "1px dashed red"), "" == n && (document.getElementById("cv-profile-job").style.outline = "1px dashed red"), "" == b && (document.getElementById("cv-profile-birthday").style.outline = "1px dashed red"), "" == i && (document.getElementById("cv-profile-address").style.outline = "1px dashed red");
                var dchi_tbao = $("#cv-profile-address").attr("cvo-placeholder");
                // console.log(dchi_tbao);
                if ("" == s.trim()) { text_mis += 'Họ tên, ' }
                if ("" == b.trim()) { text_mis += 'Ngày sinh, ' }
                if ("" == a.trim()) { text_mis += 'Email, ' }
                if ("" == t.trim()) { text_mis += 'Số điện thoại, ' }
                if ("" == i.trim()) { text_mis += 'Địa chỉ, ' }
                if ("" == e.trim()) { text_mis += 'Công việc mong muốn, ' }
            }
            if (!/^(032|033|034|035|036|037|038|039|086|096|097|098|081|082|083|084|085|088|087|091|094|056|058|092|070|076|077|078|079|089|090|093|099|059)+([0-9]{7})$/.test(t) && "" != t)
                text_mis += 'Số điện thoại không hợp lệ, ';
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(a) && "" != a)
                text_mis += 'Địa chỉ email không hợp lệ, ';
            text_mis += check_cv_content()
            if (text_mis.trim(',')) {

                return false;
            }

            err = '1';
        }

    }
    //Them tool
    $(document).on('click', '#toolbar-color-mb .color', function (e) {
        $('#toolbar-color-mb .color').removeClass('active');
        $('#toolbar-color-mb .m_bdcolor_mb').removeClass('active_color');
        $(this).addClass('active');
        $(this).parent().addClass('active_color');
        var newcolor = $(this).attr('data-color');
        var oldlink = $('#cv-color-css').attr('href');
        $(".toolbar-changecolor .color_mobile_toolbar").attr("style", "background-color:#" + newcolor);
        var newlink = oldlink.slice(0, oldlink.lastIndexOf("/")) + '/' + newcolor + '.css';
        $('#cv-color-css').attr('href', newlink);
    });

    $(document).on("click", "#cvo-toolbar-mobile .toolbar-changecolor", function () {
        $(".box_show_selection").show();
        $(".select_color_cv").show();
        $(".select_lang_cv").hide();
        $(".select_design_cv").hide();
        $('.box-show-maucv').hide();
    })

    $(document).on("click", "#cvo-toolbar-mobile .toolbar-lang", function () {
        $(".box_show_selection").show();
        $(".select_color_cv").hide();
        $(".select_lang_cv").show();
        $(".select_design_cv").hide();
        $('.box-show-maucv').hide();
    })

    $(document).on("click", ".box-cogian-dong", function () {
        $(".box_show_selection").show();
        $(".select_color_cv").hide();
        $(".select_lang_cv").hide();
        $(".select_design_cv").show();
        $('.box-show-maucv').hide();
    })

    $(document).on("click", ".toolbar-maucv", function () {
        $(".box_show_selection").show();
        $(".select_color_cv").hide();
        $(".select_lang_cv").hide();
        $(".select_design_cv").hide();
        $(".box-show-maucv").show();
    })

    $(document).on("click", ".toolbar-cvthemmuc", function () {
        $("#layout-editor-container").show();
    })

    $(document).on("click", ".exit_show_selection", function () {
        $(".box_show_selection").hide();
    })

    $(document).on('click', function (event) {
        var target = $(event.target);
        var profile_job = $("#cv-profile-job").text(),
            profile_phone = $("#cv-profile-phone").text(),
            profile_email = $("#cv-profile-email").text(),
            profile_address = $("#cv-profile-address").text(),
            profile_fullname = $("#cv-profile-fullname").text(),
            profile_birthday = $("#cv-profile-birthday").text(),
            profile_sex = $("#cv-profile-sex").text();

        // Sự kiện click vào box và block để điền thông tin
        if (target.is('#cv-profile-fullname') || target.is('#cv-profile-job')) {
            if ($('#fullname_job').hasClass('hidden')) {
                $('#fullname_job').removeClass('hidden');
                $('#thongtin_box').addClass('hidden');
                $('#name_job').removeClass('hidden');
                $('#fullname_job').attr('data-block', 'name_job');
                $("#cv-profile-fullname-mb").text(profile_fullname);
                $("#cv-profile-job-mb").text(profile_job);
                document.getElementById('cv-profile-fullname-mb').focus();
                setTimeout(function () {
                    var $container = $('.popup_nhaptt'),
                        $scrollTo = $('#name_job .box_name');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }, 200)
            }
        }
        var id_popup = '';
        if (target.is('#cvo-experience-blocktitle,.exp-title,.exp-date,.exp-content,.exp-subtitle,.box-content,#box-content,#cv-boxtitle,.skill-name,span,#cv-contact,#cv-profile-sex, #cv-profile-birthday, #cv-profile-phone, #cv-profile-email, #cv-profile-address,div')) {
            id_popup = target.parents('.cvo-block').attr('id');
            if (id_popup == undefined) {
                var id_check = $(target[0].ownerDocument.activeElement);
                if (id_check.hasClass("box-content") || id_check.hasClass("exp-content")) {
                    id_popup = id_check.parents(".cvo-block").attr("id");
                }
            }
        }
        if (id_popup == 'box01') {
            if ($('#input_box01').hasClass('hidden')) {
                $('#input_box01').removeClass('hidden');
                $('#thongtin_box01').removeClass('hidden');
                $('#input_box01').attr('data-block', 'box01');
                $("#cv-profile-birthday-mb").text(profile_birthday);
                $("#cv-profile-sex-mb").text(profile_sex);
                $("#cv-profile-phone-mb").text(profile_phone);
                $("#cv-profile-email-mb").text(profile_email);
                $("#cv-profile-address-mb").text(profile_address);
                setTimeout(function () {
                    document.getElementById('cv-profile-birthday-mb').focus();
                    var $container = $('.popup_nhaptt'),
                        $scrollTo = $('#thongtin_box01 .infor_cv_contact');
                    $container.animate({
                        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                    });
                }, 300);

            }
        }
        var data_id = '';
        if (id_popup == 'box02' || id_popup == 'box04' || id_popup == 'box05' || id_popup == 'box06' || id_popup == 'box07' || id_popup == 'block05') {
            if ($('#fullname_job').hasClass('hidden')) {
                $('#fullname_job').removeClass('hidden');
                $('#thongtin_box').removeClass('hidden');
                $('#name_job').addClass('hidden');
                $('.thongtin_box').addClass('hidden');
                $('#fullname_job').attr('data-block', id_popup);
            }
            if (id_popup == 'block05') {
                var block_content = $("#" + id_popup).find(".ctbx.experience .exp-content").text();
                $("#thongtin_" + id_popup).find(".input_text .content").text(block_content);
            }
            data_id = target.parents('.ui-sortable').attr('id');
            $('#fullname_job').attr('data', data_id);
        }

        // ==================================Block=========================================
        function content_block(block) {
            var arrayblock = {};
            var dataclass = $("#" + block).find(".ctbx.experience");
            dataclass.each(function (e) {
                var exp_title = $(this).find(".exp-title").text();
                var exp_date = $(this).find(".exp-date").text();
                var exp_subtitle = $(this).find(".exp-subtitle").text();
                var exp_content = $(this).find(".exp-content").text();
                arrayblock[e] = {
                    "exp_title": exp_title,
                    "exp_date": exp_date,
                    "exp_subtitle": exp_subtitle,
                    "exp_content": exp_content,
                }
            });
            return arrayblock;
        }
        if (id_popup == 'block01' || id_popup == 'block02' || id_popup == 'block03' || id_popup == 'block04') {
            if ($('#input_block').hasClass('hidden')) {
                $('#input_block').removeClass('hidden');
                $('.thongtin_block').addClass('hidden');
                $('#input_block').attr('data-block', id_popup);
            }
            // var dataArrayBlock = content_block(id_popup);
            // var htmlblock = '';

            // $.each(dataArrayBlock, function (index, item) {
            //     htmlblock += `<div class="ctbx_mobile">
            //                     <div class="icon_remove">
            //                         <img src="/images/iconcv/icon_remove_mb.svg" class="remove_tdhv cursor_pt" alt="remove">
            //                     </div>
            //                     <div class="textarea">
            //                         <div class="input_text">
            //                             <span class="exp-title-mb" id="ten_truong" contenteditable="true" cvo-placeholder="Tên trường">${item.exp_title}</span>
            //                         </div>
            //                         <div class="input_text">
            //                             <span class="exp-date-mb" contenteditable="true" cvo-placeholder="Thời gian">${item.exp_date}</span>
            //                         </div>
            //                         <div class="input_text">
            //                             <span class="exp-subtitle-mb" contenteditable="true" cvo-placeholder="Chuyên ngành">${item.exp_subtitle}</span>
            //                         </div>
            //                         <div class="input_text">
            //                             <span class="exp-content-mb" contenteditable="true" cvo-placeholder="Xếp loại: xếp loại bằng, điểm trung bình">${item.exp_content}</span>
            //                         </div>
            //                     </div>
            //                 </div>`
            // });
            // $("#thongtin_"+id_popup+" .box-ctbx_mobile").html('');
            // $("#thongtin_"+id_popup+" .box-ctbx_mobile").append(htmlblock);
            data_id = target.parents('.ui-sortable').attr('id');
            $('#input_block').attr('data', data_id);
        }
        if (id_popup == 'block01') {
            $('#thongtin_block01').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_block01 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ten_truong'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'block02') {
            $('#thongtin_block02').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_block02 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ten_congty'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'block03') {
            $('#thongtin_block03').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_block03 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ten_hoatdong'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'block04') {
            $('#thongtin_block04').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_block04 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ten_duan'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'box02') {
            $('#thongtin_box02').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_block01 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ctn_muctieu_nn'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'block01' || id_popup == 'block02' || id_popup == 'block03' || id_popup == 'block04' || id_popup == 'block05') {
            var tieude = $('#' + id_popup).find(".block-title").text();
        } else if (id_popup == 'box02' || id_popup == 'box03' || id_popup == 'box04' || id_popup == 'box05' || id_popup == 'box06' || id_popup == 'box07') {
            var tieude = $('#' + id_popup).find(".box-title").text();
        } else if (id_popup == 'box01') {
            var lang_ht = $("#cvo-toolbar-lang-mb").find(".flag").attr("data-lang");
            if (lang_ht != 1) {
                var tieude = '';
            }
        }
        $("#thongtin_" + id_popup).find(".tieude").text(tieude);
        if (id_popup == 'box02' || id_popup == 'box03' || id_popup == 'box04' || id_popup == 'box05' || id_popup == 'box06' || id_popup == 'box07') {

        }
        // ========================================Tách riêng box03================================================
        var id_popupp = '';
        if (target.is('#box03 #cv-boxtitle,#box03 .skill-name')) {
            id_popupp = target.parents('.cvo-block').attr('id');
        }
        var data_id = '';
        if (id_popupp == 'box03') {
            if ($('#fullname_job').hasClass('hidden')) {
                $('#fullname_job').removeClass('hidden');
                $('#thongtin_box').removeClass('hidden');
                $('#name_job').addClass('hidden');
                $('.thongtin_box').addClass('hidden');
                $('#fullname_job').attr('data-block', id_popupp);
            }
            data_id = target.parents('.ui-sortable').attr('id');
            $('#fullname_job').attr('data', data_id);
        }
        if (id_popupp == 'box03') {
            var arrayblock = {};
            var dataclass = $("#box03").find(".content-edit.skill .ctbx");
            dataclass.each(function (e) {
                var skill_name = $(this).find(".skill-name").text();
                var val_skill = $(this).find(".bar-value-exp input").val();
                arrayblock[e] = {
                    "skill_name": skill_name,
                    "val_skill": val_skill,
                }
            });
            var dataArrayBlock = arrayblock;
            var htmlblock = '';

            $.each(dataArrayBlock, function (index, item) {
                htmlblock += `<div class="ctbx_mobile">
                            <div class="icon_remove">
                                <img src="/images/iconcv/icon_remove_mb.svg" class="remove_skill cursor_pt" alt="remove">
                            </div>
                            <div class="skill_value">
                                <div class="input_value skill_name">
                                    <div class="border_dashed input_fullname">
                                        <span class="text_value cursor_pt" contenteditable="true"  ${(index == 0) ? "id='nameskill'" : ""} cvo-placeholder="Nhập kỹ năng">${item.skill_name}</span>
                                    </div>
                                </div>
                                <div class="input_value skill_percent">
                                    <div class="border_dashed input_fullname">
                                        <span class="text_value cursor_pt" contenteditable="true">${item.val_skill}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`
            });
            $("#thongtin_" + id_popup + " .box-ctbx_mobile").html('');
            $("#thongtin_" + id_popup + " .box-ctbx_mobile").append(htmlblock);
            $('#thongtin_box03').removeClass('hidden');
            scroll_pp_cv(id_popup);
            if ($(window).width() < 500) {
                focusAndPlaceCaretAtEnd13(document.getElementById('nameskill'));
            }
        }
        // ====================================================================================================
        if (id_popup == 'box04') {
            $('#thongtin_box04').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_box04 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ctn_gthuong_uv'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'box05') {
            $('#thongtin_box05').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_box05 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ctn_chchi'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'box06') {
            $('#thongtin_box06').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_box06 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ctn_sothich_uv'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'box07') {
            $('#thongtin_box07').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_box07 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ctn_ngthamchieu_uv'));
            }
            scroll_pp_cv(id_popup);
        }
        if (id_popup == 'block05') {
            $('#thongtin_block05').removeClass('hidden');
            if ($(window).width() < 500) {
                $("#thongtin_block05 [contentEditable=true]").css('outline', 'unset');
                focusAndPlaceCaretAtEnd13(document.getElementById('ctn_ttinthem_uv'));
            }
            scroll_pp_cv(id_popup);
        }
    })

    // nhập xong các thông tin vào cv
    $(document).on('click', '.save_infor', function (e) {
        focusoutActive(e)
        $(this).parents('.popup_nhaptt').addClass('hidden');
        var data_block = $(this).parents('.popup_nhaptt').attr('data-block');
        // =============== Trình độ học vấn ================= //
        if (data_block == 'block01') {
            var data = {};
            var tieude = $('#thongtin_block01').find('.tieude').text().trim();
            $('#thongtin_block01').find(".ctbx_mobile").each(function (innerIndex) {
                var ctbx_mobile = $(this);
                var exp_title = ctbx_mobile.find('.exp-title-mb').html();
                var exp_date = ctbx_mobile.find('.exp-date-mb').html();
                var exp_subtitle = ctbx_mobile.find('.exp-subtitle-mb').html();
                if (exp_subtitle != '') {
                    exp_subtitle = `${exp_subtitle}`;
                }
                var exp_content = ctbx_mobile.find('.exp-content-mb').html();
                if (exp_content != '') {
                    exp_content = `${exp_content}`;
                }
                data[innerIndex] = {
                    "TenTruong": exp_title,
                    "ThoiGian": exp_date,
                    "ChuyenNganh": exp_subtitle,
                    "XepLoai": exp_content
                };
            })
            $('#block01 #experience-table').remove();
            var html = `<div id="experience-table">`;
            $.each(data, function (index, item) {
                html += '<div id="exp' + (Number(index) + 1) + '" class="ctbx experience">';
                html += '<div class="fieldgroup_controls">';
                html += '<div class="clone" title="Thêm"><i class="fa fa-plus"></i>Thêm</div>';
                html += '<div class="remove" title="Xóa"><i class="fa fa-minus"></i> Xóa</div>';
                html += '</div>';
                html += '<h3>';
                html += '<div class="exp-title" contenteditable="true" cvo-placeholder="Tên công ty">' + item.TenTruong + '</div>';
                html += '<div class="exp-date" contenteditable="true" cvo-placeholder="Thời gian">' + item.ThoiGian + '</div>';
                html += '</h3>';
                html += '<p class="h3 h3-title">';
                html += '<span class="exp-subtitle" cvo-placeholder="Vị trí công việc" contenteditable="true">' + item.ChuyenNganh + '</span>';
                html += '</p>';
                html += '<div class="exp-content" contenteditable="true" cvo-placeholder="Mô tả chi tiết công việc, những gì đạt được trong quá trình làm việc.">';
                html += item.XepLoai;
                html += '</div>';
                html += '</div>';
            });
            html += `</div>`;
            $('#block01').append(html);
            $('#block01 #cvo-experience-blocktitle').html(tieude);

        }

        // =============== Kinh nghiệm làm việc ================= //
        if (data_block == 'block02') {
            // Kiểm tra xem page 2 trở đi có block02 hay không nếu có thì remove
            let blocks02 = [];
            for (let i = 1; i <= 4; i++) {
                blocks02[i] = $(`.cv_page[data-page="${i}"]`).find("#block02").length;
            }

            if (blocks02[1] > 0) {
                if (blocks02[2] > 0) {
                    $('.cv_page[data-page="2"]').find("#block02").remove();
                    if (blocks02[3] > 0) {
                        $('.cv_page.page_more').find("#block02").remove();
                    }
                }
            } else if (blocks02[2] > 0 && blocks02[3] > 0) {
                $('.cv_page[data-page="3"]').find("#block02").remove();
            }

            // 
            var data = {};
            var tieude = $('#thongtin_block02').find('.tieude').text().trim();
            $('#thongtin_block02').find(".ctbx_mobile").each(function (innerIndex) {
                var ctbx_mobile = $(this);
                var exp_title = ctbx_mobile.find('.exp-title-mb').html();
                var exp_date = ctbx_mobile.find('.exp-date-mb').html();
                var exp_subtitle = ctbx_mobile.find('.exp-subtitle-mb').html();
                if (exp_subtitle != '') {
                    exp_subtitle = `${exp_subtitle}`;
                }
                var exp_content = ctbx_mobile.find('.exp-content-mb').html();
                data[innerIndex] = {
                    "TenTruong": exp_title,
                    "ThoiGian": exp_date,
                    "ViTri": exp_subtitle,
                    "ChiTiet": exp_content
                };
            })
            $('#block02 #experience-table').remove();
            var html = `<div id="experience-table">`;
            $.each(data, function (index, item) {
                html += '<div id="exp' + (Number(index) + 1) + '" class="ctbx experience">';
                html += '<div class="fieldgroup_controls">';
                html += '<div class="clone" title="Thêm"><i class="fa fa-plus"></i>Thêm</div>';
                html += '<div class="remove" title="Xóa"><i class="fa fa-minus"></i> Xóa</div>';
                html += '</div>';
                html += '<h3>';
                html += '<div class="exp-title" contenteditable="true" cvo-placeholder="Tên công ty">' + item.TenTruong + '</div>';
                html += '<div class="exp-date" contenteditable="true" cvo-placeholder="Thời gian làm việc">' + item.ThoiGian + '</div>';
                html += '</h3>';
                html += '<p class="h3 h3-title">';
                html += '<span class="exp-subtitle" cvo-placeholder="Vị trí công việc" contenteditable="true">' + item.ViTri + '</span>';
                html += '</p>';
                html += '<div class="exp-content" contenteditable="true" cvo-placeholder="Mô tả chi tiết công việc, những gì đạt được trong quá trình làm việc.">';
                html += item.ChiTiet;
                html += '</div>';
                html += '</div>';
            });
            html += `</div>`;
            $('#block02').append(html);
            $('#block02 #cvo-experience-blocktitle').html(tieude);

        }

        // =============== Hoạt động ================= //
        if (data_block == 'block03') {
            // Kiểm tra xem page 2 trở đi có block03 hay không nếu có thì remove
            let blocks03 = [];
            for (let i = 1; i <= 4; i++) {
                blocks03[i] = $(`.cv_page[data-page="${i}"]`).find("#block03").length;
            }

            if (blocks03[1] > 0) {
                if (blocks03[2] > 0) {
                    $('.cv_page[data-page="2"]').find("#block03").remove();
                    if (blocks03[3] > 0) {
                        $('.cv_page.page_more').find("#block03").remove();
                    }
                }
            } else if (blocks03[2] > 0 && blocks03[3] > 0) {
                $('.cv_page[data-page="3"]').find("#block03").remove();
            }


            var data = {};
            var tieude = $('#thongtin_block03').find('.tieude').text().trim();
            $('#thongtin_block03').find(".ctbx_mobile").each(function (innerIndex) {
                var ctbx_mobile = $(this);
                var exp_title = ctbx_mobile.find('.exp-title-mb').html();
                var exp_date = ctbx_mobile.find('.exp-date-mb').html();
                var exp_subtitle = ctbx_mobile.find('.exp-subtitle-mb').html();
                if (exp_subtitle != '') {
                    exp_subtitle = `${exp_subtitle}`;
                }
                var exp_content = ctbx_mobile.find('.exp-content-mb').html();
                data[innerIndex] = {
                    "TenTruong": exp_title,
                    "ThoiGian": exp_date,
                    "VaiTro": exp_subtitle,
                    "ChiTiet": exp_content
                };
            })
            $('#block03 #experience-table').remove();
            var html = `<div id="experience-table">`;
            $.each(data, function (index, item) {
                html += '<div id="exp' + (Number(index) + 1) + '" class="ctbx experience">';
                html += '<div class="fieldgroup_controls">';
                html += '<div class="clone" title="Thêm"><i class="fa fa-plus"></i>Thêm</div>';
                html += '<div class="remove" title="Xóa"><i class="fa fa-minus"></i> Xóa</div>';
                html += '</div>';
                html += '<h3>';
                html += '<div class="exp-title" contenteditable="true" cvo-placeholder="Mô tả">' + item.TenTruong + '</div>';
                html += '<div class="exp-date" contenteditable="true" cvo-placeholder="Thời gian">' + item.ThoiGian + '</div>';
                html += '</h3>';
                html += '<p class="h3 h3-title">';
                html += '<span class="exp-subtitle" cvo-placeholder="Vai trò" contenteditable="true">' + item.VaiTro + '</span>';
                html += '</p>';
                html += '<div class="exp-content" contenteditable="true" cvo-placeholder="Chi tiết dự án">';
                html += item.ChiTiet;
                html += '</div>';
                html += '</div>';
            });
            html += `</div>`;
            $('#block03').append(html);
            $('#block03 #cvo-experience-blocktitle').html(tieude);

        }

        // =============== Dự án tham gia ================= //
        if (data_block == 'block04') {
            // Kiểm tra xem page 2 trở đi có block04 hay không nếu có thì remove
            let blocks04 = [];
            for (let i = 1; i <= 4; i++) {
                blocks04[i] = $(`.cv_page[data-page="${i}"]`).find("#block04").length;
            }

            if (blocks04[1] > 0) {
                if (blocks04[2] > 0) {
                    $('.cv_page[data-page="2"]').find("#block04").remove();
                    if (blocks04[3] > 0) {
                        $('.cv_page.page_more').find("#block04").remove();
                    }
                }
            } else if (blocks04[2] > 0 && blocks04[3] > 0) {
                $('.cv_page[data-page="3"]').find("#block04").remove();
            }

            var data = {};
            var tieude = $('#thongtin_block04').find('.tieude').text().trim();
            $('#thongtin_block04').find(".ctbx_mobile").each(function (innerIndex) {
                var ctbx_mobile = $(this);
                var exp_title = ctbx_mobile.find('.exp-title-mb').html();
                var exp_date = ctbx_mobile.find('.exp-date-mb').html();
                var exp_subtitle = ctbx_mobile.find('.exp-subtitle-mb').html();
                if (exp_subtitle != '') {
                    exp_subtitle = `${exp_subtitle}`;
                }
                var exp_content = ctbx_mobile.find('.exp-content-mb').html();
                if (exp_content != '') {
                    exp_content = `${exp_content}`;
                }
                data[innerIndex] = {
                    "TenTruong": exp_title,
                    "ThoiGian": exp_date,
                    "VaiTro": exp_subtitle,
                    "ChiTiet": exp_content
                };
            })
            $('#block04 #experience-table').remove();
            var html = `<div id="experience-table">`;
            $.each(data, function (index, item) {
                html += '<div id="exp' + (Number(index) + 1) + '" class="ctbx experience">';
                html += '<div class="fieldgroup_controls">';
                html += '<div class="clone" title="Thêm"><i class="fa fa-plus"></i>Thêm</div>';
                html += '<div class="remove" title="Xóa"><i class="fa fa-minus"></i> Xóa</div>';
                html += '</div>';
                html += '<h3>';
                html += '<div class="exp-title" contenteditable="true" cvo-placeholder="Tên dự án">' + item.TenTruong + '</div>';
                html += '<div class="exp-date" contenteditable="true" cvo-placeholder="Thời gian làm việc">' + item.ThoiGian + '</div>';
                html += '</h3>';
                html += '<p class="h3 h3-title">';
                html += '<span class="exp-subtitle" cvo-placeholder="Vai trò" contenteditable="true">' + item.VaiTro + '</span>';
                html += '</p>';
                html += '<div class="exp-content" contenteditable="true" cvo-placeholder="Chi tiết dự án">';
                html += item.ChiTiet;
                html += '</div>';
                html += '</div>';
            });
            html += `</div>`;
            $('#block04').append(html);
            $('#block04 #cvo-experience-blocktitle').html(tieude);

        }

        // =============== Thông tin liên hệ ================= //
        if (data_block == 'box01') {
            var tieude = $('#thongtin_box01').find('.tieude').text();
            var ctbx_mobile = $('#thongtin_box01').find(".box_infor_small .text");
            var sex = ctbx_mobile.find('#cv-profile-sex-mb').text();
            var date = ctbx_mobile.find('#cv-profile-birthday-mb').text();
            var phone = ctbx_mobile.find('#cv-profile-phone-mb').text();
            var email = ctbx_mobile.find('#cv-profile-email-mb').text();
            var add = ctbx_mobile.find('#cv-profile-address-mb').text();

            $('#cv-contact').text(tieude);
            $('#cv-profile-sex').text(sex);
            $('#cv-profile-birthday').text(date);
            $('#cv-profile-phone').text(phone);
            $('#cv-profile-email').text(email);
            $('#cv-profile-address').text(add);
        }

        // =============== Tên và công việc mong muốn ================= //
        if (data_block == 'name_job') {
            var cv_profile_fullname = $('#name_job').find('#cv-profile-fullname-mb').text();
            var cv_profile_job = $('#name_job').find('#cv-profile-job-mb').text();

            $('#cv-profile-fullname').text(cv_profile_fullname);
            $('#cv-profile-job').text(cv_profile_job);
        }

        // =============== Mục tiêu nghề nghiệp ================= //
        if (data_block == 'box02') {
            var tieude = $('#thongtin_box02').find('.tieude').text();
            var content = $('#thongtin_box02').find('.content').html();

            $('#box02 #cv-boxtitle').text(tieude);
            $('#box02 .box-content').html(content);

        }

        // =============== Chứng chỉ ================= //
        if (data_block == 'box05') {
            var tieude = $('#thongtin_box05').find('.tieude').text();
            var content = $('#thongtin_box05').find('.content').html();

            $('#box05 #cv-boxtitle').text(tieude);
            $('#box05 .box-content').html(content);

        }

        // =============== Giải thưởng ================= //
        if (data_block == 'box04') {
            var tieude = $('#thongtin_box04').find('.tieude').text();
            var content = $('#thongtin_box04').find('.content').html();

            $('#box04 #cv-boxtitle').text(tieude);
            $('#box04 .box-content').html(content);

        }

        // =============== Sở thích ================= //
        if (data_block == 'box06') {
            var tieude = $('#thongtin_box06').find('.tieude').text();
            var content = $('#thongtin_box06').find('.content').html();

            $('#box06 #cv-boxtitle').text(tieude);
            $('#box06 .box-content').html(content);

        }

        // =============== Người tham chiếu ================= //
        if (data_block == 'box07') {
            var tieude = $('#thongtin_box07').find('.tieude').text();
            var content = $('#thongtin_box07').find('.content').html();
            // console.log(content);
            $('#box07 #cv-boxtitle').text(tieude);
            $('#box07 .box-content').html(content);

        }

        // =============== Thông tin thêm ================= //

        if (data_block == 'block05') {
            var tieude = $('#thongtin_block05').find('.tieude').text().trim(),
                content = $('#thongtin_block05').find('.content').html();
            $('#block05 #cvo-experience-blocktitle').text(tieude);
            $('#block05 .exp-content').html(content);
        }

        // =============== Trình độ học vấn ================= //
        if (data_block == 'box03') {
            var data03 = {};
            var tieude = $('#thongtin_box03').find('.tieude').text().trim();
            $('#thongtin_box03').find(".ctbx_mobile").each(function (innerIndex) {
                var ctbx_mobile = $(this);
                var skill_name = ctbx_mobile.find('.skill_name .input_fullname .text_value').html();
                var skill_percent = ctbx_mobile.find('.skill_percent .input_fullname .text_value').html();
                if (skill_percent > 100) { skill_percent = 100; } else if (skill_percent < 0) { skill_percent = 0; }
                data03[innerIndex] = {
                    "skill_name": skill_name,
                    "skill_percent": skill_percent,
                };
            })
            $('#box03 #experience-table').remove();
            var html03 = '';
            $.each(data03, function (index, item) {
                html03 += `<div class="ctbx">
                        <div class="fieldgroup_controls">
                          <div class="clone" title="Thêm"><i class="fa fa-plus"></i>Thêm</div>
                          <div class="edit js-edit-content" title="Sửa"><i class="fa fa-edit"></i>Sửa</div>
                          <div class="remove" title="Xóa"><i class="fa fa-minus"></i>Xóa</div>
                        </div>
                        <p class="skill-name" cv-form-field="true" contenteditable="true">${item.skill_name}</p>
                        <div class="bar-exp"><div style="width: ${item.skill_percent}%"></div></div>
                        <div class="bar-value-exp">
                          <input min="0" max="100" type="text" value="${item.skill_percent}">
                        </div>
                        <div class="exp-fake"></div>
                    </div>`
            });
            $('#box03 .exp.content-edit.skill').html(html03);
            $('#box03 .exp.content-edit.skill').append(`<div class="clr"></div>`);
            $('#box03 #cv-boxtitle').html(tieude);
        }
    });

    function scroll_pp_cv(id_box) {
        setTimeout(function () {
            // console.log(id_box);
            var $container = $('.popup_nhaptt'),
                $scrollTo = $('#thongtin_' + id_box + ' .infor_cv_contact');
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
            });
        }, 200)
    }

    $(document).ready(function () {
        $("#add_kn").click(function () {
            var newCtbx = `<div class="ctbx_mobile">
                            <div class="icon_remove">
                                <img src="/images/iconcv/icon_remove_mb.svg" class="remove_skill cursor_pt" alt="remove">
                            </div>
                            <div class="skill_value">
                                <div class="input_value skill_name">
                                    <div class="border_dashed input_fullname">
                                        <span class="text_value" contenteditable="true" cvo-placeholder="Nhập kỹ năng"></span>
                                    </div>
                                </div>
                                <div class="input_value skill_percent">
                                    <div class="border_dashed input_fullname">
                                        <span class="text_value" contenteditable="true">80</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            $(this).parents('.thongtin_box').find('.box-ctbx_mobile').append(newCtbx);
        });
        $("#add_tdhv").click(function () {
            var newCtbx = `<div class="ctbx_mobile">
                            <div class="icon_remove">
                                <img src="/images/iconcv/icon_remove_mb.svg" class="remove_tdhv cursor_pt" alt="remove">
                            </div>
                            <div class="textarea">
                                <div class="input_text">
                                    <span class="exp-title-mb" contenteditable="true" cvo-placeholder="Tên trường"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-date-mb" contenteditable="true" cvo-placeholder="Thời gian làm việc"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-subtitle-mb" contenteditable="true" cvo-placeholder="Chuyên ngành"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-content-mb" contenteditable="true" cvo-placeholder="Xếp loại: xếp loại bằng, điểm trung bình"></span>
                                </div>
                            </div>
                        </div>`;
            $(this).parents('.thongtin_block').find('.box-ctbx_mobile').append(newCtbx);
        });
        $("#add_knlv").click(function () {
            var newCtbx = `<div class="ctbx_mobile">
                            <div class="icon_remove">
                                <img src="/images/iconcv/icon_remove_mb.svg" class="remove_knlv cursor_pt" alt="remove">
                            </div>
                            <div class="textarea">
                                <div class="input_text">
                                    <span class="exp-title-mb" contenteditable="true" cvo-placeholder="Tên công ty"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-date-mb" contenteditable="true" cvo-placeholder="Thời gian làm việc"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-subtitle-mb" contenteditable="true" cvo-placeholder="Vị trí"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-content-mb" contenteditable="true" cvo-placeholder="Chi tiết công việc: nhiệm vụ, thành tựu"></span>
                                </div>
                            </div>
                        </div>`;
            $(this).parents('.thongtin_block').find('.box-ctbx_mobile').append(newCtbx);
        });
        $("#add_datg").click(function () {
            var newCtbx = `<div class="ctbx_mobile">
                            <div class="icon_remove">
                                <img src="/images/iconcv/icon_remove_mb.svg" class="remove_datg cursor_pt" alt="remove">
                            </div>
                            <div class="textarea">
                                <div class="input_text">
                                    <span class="exp-title-mb" contenteditable="true" cvo-placeholder="Tên dự án"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-date-mb" contenteditable="true" cvo-placeholder="Thời gian làm việc"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-subtitle-mb" contenteditable="true" cvo-placeholder="Vai trò"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-content-mb" contenteditable="true" cvo-placeholder="Chi tiết dự án"></span>
                                </div>
                            </div>
                        </div>`;
            $(this).parents('.thongtin_block').find('.box-ctbx_mobile').append(newCtbx);
        });
        $("#add_hd").click(function () {
            var newCtbx = `<div class="ctbx_mobile">
                            <div class="icon_remove">
                                <img src="/images/iconcv/icon_remove_mb.svg" class="remove_hd cursor_pt" alt="remove">
                            </div>
                            <div class="textarea">
                                <div class="input_text">
                                    <span class="exp-title-mb" contenteditable="true" cvo-placeholder="Mô tả"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-date-mb" contenteditable="true" cvo-placeholder="Thời gian"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-subtitle-mb" contenteditable="true" cvo-placeholder="Vai trò"></span>
                                </div>
                                <div class="input_text">
                                    <span class="exp-content-mb" contenteditable="true" cvo-placeholder="Nhập hoạt động"></span>
                                </div>
                            </div>
                        </div>`;
            $(this).parents('.thongtin_block').find('.box-ctbx_mobile').append(newCtbx);
        });
    });

    $(document).on('click', '.remove_skill,.remove_tdhv,.remove_knlv,.remove_hd,.remove_datg', function () {
        $(this).parents('.ctbx_mobile').remove();
    });

    function focusAndPlaceCaretAtEnd13(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            // console.log('her')
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    $(document).on("input", ".skill_value .skill_percent .text_value", function () {
        var value = $(this).text().trim();
        if (isNaN(value) || value === "") {
            $(this).text("");
        } else {
            var numValue = parseInt(value, 10);
            if (numValue < 0) {
                $(this).text("1");
            } else if (numValue > 100) {
                $(this).text("100");
            }
        }
    });

    // Tránh người dùng spam thẻ br khi enter xuống dòng
    $(document).ready(function () {
        $('[contenteditable="true"]').on('keyup touchend', function (event) {
            // Kiểm tra nội dung của phần tử và xóa thẻ <br> nếu nội dung trống
            if ($(this).text().trim() === "" && $(this).find("br").length > 0) {
                $(this).find("br").remove();
            }
        });
    });
}
