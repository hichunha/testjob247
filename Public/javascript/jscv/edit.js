var parms = [{
    "cmd": "aCommandName",
    "desc": "A DOMString representing the name of the command"
}, {
    "cmd": "aShowDefaultUI",
    "desc": "A Boolean indicating whether the default user interface should be shown. This is not implemented in Mozilla."
}, {
    "cmd": "aValueArgument",
    "desc": "A DOMString representing some commands (such as insertimage) require an extra value argument (the image's url). Pass an argument of null if no argument is needed."
}];
var commands = [{
    "cmd": "bold",
    "icon": "icon_indamblack",
    "icon_active": "icon_indamblue",
    "desc": "In đậm"
},
{
    "cmd": "italic",
    "icon": "icon_innghiengblack",
    "icon_active": "icon_innghiengblue",
    "desc": "In nghiêng"
},
{
    "cmd": "underline",
    "icon": "icon_gachchanblack",
    "icon_active": "icon_gachchanblue",
    "desc": "Gạch chân"
},
{
    "cmd": "justifyLeft",
    "icon": "icon_cantrai_black",
    "icon_active": "icon_cantrai_blue",
    "desc": "Căn trái"
}, {
    "cmd": "justifyCenter",
    "icon": "icon_cangiua_black",
    "icon_active": "icon_cangiua_blue",
    "desc": "Căn giữa"
},
{
    "cmd": "justifyRight",
    "icon": "icon_canphai_black",
    "icon_active": "icon_canphai_blue",
    "desc": "Căn phải"
}, {
    "cmd": "justifyFull",
    "icon": "icon_can2ben_black",
    "icon_active": "icon_can2ben_blue",
    "desc": "Căn đều hai bên"
}, {
    "cmd": "undo",
    "icon": "icon_cv_undo",
    "desc": "Hoàn tác"
}, {
    "cmd": "redo",
    "icon": "icon_cv_redo",
    "desc": "Làm lại"
}];

var commandRelation = {};

function supported(cmd) {
    var css = !!document.queryCommandSupported(cmd.cmd) ? "btn-succes" : "btn-error"
    return css
};

function icon(cmd) {
    return (typeof cmd.icon !== "undefined") ? cmd.icon : "";
};

function icon_active(cmd) {
    return (typeof cmd.icon_active !== "undefined") ? cmd.icon_active : "";
};

function doCommand(cmdKey) {
    var cmd = commandRelation[cmdKey];
    if (supported(cmd) === "btn-error") {
        alert("execCommand(“" + cmd.cmd + "”)\nis not supported in your browser");
        return;
    }
    val = (typeof cmd.val !== "undefined") ? prompt("Value for " + cmd.cmd + "?", cmd.val) : "";
    //document.execCommand("styleWithCSS",true ); //not need span style               
    document.execCommand(cmd.cmd, false, (val || ""));
    if ($('.cmd-' + cmd.cmd).hasClass('actived')) {
        $('.cmd-' + cmd.cmd).removeClass('actived');
    } else {
        $('.cmd-' + cmd.cmd).addClass('actived');
    }
}

function init() {
    var html = '<div class="editor-control-group disabled">',
        template = '<span class="editor-control %btnClass%" title="%desc%" onmousedown="event.preventDefault();" onclick="doCommand(\'%cmd%\')"><span class="font_s14 line_h16 %undoClass%">%undoClass%</span><img width="37px" height="38px" class="icon-controll-black" src="/images/iconcv/%iconClass%.png" alt="icon"><img width="37px" height="38px" class="icon-controll-blue d_none" src="/images/iconcv/%iconblueClass%.png" alt="icon"></i></span>';
    commands.map(function (command, i) {
        commandRelation[command.cmd] = command;
        var temp = template;
        temp = temp.replace(/%iconClass%/gi, icon(command));
        temp = temp.replace(/%iconblueClass%/gi, icon_active(command));
        temp = temp.replace(/%desc%/gi, command.desc);
        temp = temp.replace(/%btnClass%/gi, 'cmd-' + command.cmd);
        if (command.cmd == "undo") {
            temp = temp.replace(/%undoClass%/gi, 'Undo');
        } else if (command.cmd == "redo") {
            temp = temp.replace(/%undoClass%/gi, 'Redo');
        } else {
            temp = temp.replace(/%undoClass%/gi, 'd_none');
        }
        temp = temp.replace(/%cmd%/gi, command.cmd);

        html += temp;
        if (i == 2 || i == 6) {
            html += '</div><div class="editor-control-group disabled">';
        }
    });
    html += '</div>';
    document.querySelector("#tools").innerHTML = html;
    document.querySelector("#tools_mobile_box").innerHTML = html;
    document.querySelector("#tools_mobile_block").innerHTML = html;
}

init();
$(document)
    .on('focus', '.exp-content, .box-content,#lto-about, #lto-content, .skill-name,.exp-content-mb,#ctn_ngthamchieu_uv,#ctn_muctieu_nn,#ctn_gthuong_uv,#ctn_chchi,#ctn_sothich_uv,#ctn_ttinthem_uv', function () {
        $('.editor-control-group').removeClass('disabled');
    })
    .on('blur', '.exp-content, .box-content,#lto-about, #lto-content, .skill-name,.exp-content-mb,#ctn_ngthamchieu_uv,#ctn_muctieu_nn,#ctn_gthuong_uv,#ctn_chchi,#ctn_sothich_uv,#ctn_ttinthem_uv', function () {
        $('.editor-control-group').addClass('disabled');
    });

setInterval(function () {
    $('.editor-control').removeClass('actived');
    commands.map(function (command, i) {
        if (document.queryCommandState(command.cmd) == true) {
            $('.cmd-' + command.cmd).addClass('actived');
        }
    });
}, 100);