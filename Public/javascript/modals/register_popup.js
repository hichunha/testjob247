$("#use_city_job").select2({
    maximumSelectionLength: 3,
    placeholder: "Chọn tỉnh thành làm việc",
    allowClear: false,
    dropdownParent: $('.box-append-cityjob'),
});

$("#use_nganh_nghe").select2({
    maximumSelectionLength: 3,
    placeholder: "Chọn ngành nghề làm việc",
    allowClear: false,
    dropdownParent: $('.box-append-usenganhnghe'),
});

$("#use_district_job").select2({
    maximumSelectionLength: 3,
    placeholder: "Chọn quận huyện làm việc",
    allowClear: false,
    dropdownParent: $('.box-append-districtjob'),
});

$(document).on("change", "#use_city_job", function () {
    var cit_id = $(this).val();
    $("#use_district_job").html("");
    if (cit_id) {
        cit_id = cit_id.join(",");
        $.ajax({
            type: "POST",
            data: { city_id: cit_id },
            url: "/getDistrictByArrCity",
            dataType: "JSON",
            success: function (data) {
                console.log(data);
                if (data.result == true) {
                    var html = '';
                    data.data.forEach(element => {
                        html += `<option value='${element.cit_id}'>${element.cit_name}</option>`;
                    });
                    $("#use_district_job").html(html);
                }
            }
        });
    }
});

$(document).on("click", ".close_popup_register", function () {
    $(this).parents(".popup_register").hide();
});

function showhidepass(e) {
    var check = $(e).attr("data");
    if (check == 1) {
        $(e).attr("src", "/images/modals/eye-open.png");
        $(e).attr("data", 2);
        $(e).parents(".form_regis_pass").find("input").attr("type", "text");
    } else {
        $(e).attr("src", "/images/modals/eye-close.png");
        $(e).attr("data", 1);
        $(e).parents(".form_regis_pass").find("input").attr("type", "password");
    }
}