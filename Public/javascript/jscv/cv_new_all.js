var timeoutPagi;
var focusoutActive = (e) => {
    console.log("focusoutActive")
    let page = $(e.target).parents('.cv_page').attr('data-page')
    if (timeoutPagi) {
        clearTimeout(timeoutPagi)
    }
    //page)
    page = page > 1 ? page - 1 : page
    timeoutPagi = setTimeout(() => {
        adjustPage(page)
    }, 1000);
}

if ($(window).width() > 600) {
    $(document).on('focusout', function (e) {
        focusoutActive(e)
    });
    $(document).on("click", ".clone", function (e) {
        focusoutActive(e)
    });
    $(document).on("click", ".remove", function (e) {
        focusoutActive(e)
    });
} else {
    $(document).on('focusout', function (e) {
        focusoutActive(e)
    });
    $(document).on("click", "#container_box-CV .an_muc", function (e) {
        focusoutActive(e)
    });
    $(document).on("click", "#container_block-CV .an_muc", function (e) {
        focusoutActive(e)
    });
}

function replaceStr(str) {
    $('#checktext').html(str);
    return $('#checktext').html().replaceAll('&nsbp;', ' ').trim();
}
// ===========================CV_ALL_NEW===================================================
const height_page = 1120;

function changeLayoutCv() {
    let layout = detectLayout();
    if (layout.cv_all != '.all') {
        return false;
    }
    let cv_all = layout.cv_all,
        cv_left = layout.cv_left,
        cv_right = layout.cv_right;
    if (!$('#form-cv .cv_page').length) {
        let htmlTop = $('#cv-top')[0] && !$('#cv-top').parents('.all').length ? $('#cv-top')[0].outerHTML : '',
            htmlFooter = $('#form-cv .watermark')[0] ? $('#form-cv .watermark')[0].outerHTML : '',
            htmlContent = $(`#form-cv ${cv_all}`)[0].outerHTML;
        $('#form-cv .watermark').remove();
        let html = `<div class="cv_page min-height" data-page="1">
                                ${htmlTop}
                                ${htmlContent}
                                <div class="footer">
                                    ${htmlFooter}
                                </div>
                            </div>`;
        $('#cv-top,#form-cv .footer,#form-cv .all').remove();
        $('#form-cv').prepend(html);
        $('#sortable').addClass('sortable');
        $('#sort_block').addClass('sort_block');
    }
    adjustPage();
}

$(document).ready(function () {
    changeLayoutCv();
});

function detectLayout() {
    let cv_all = '.all',
        cv_left = '#cv-main',
        cv_right = '#cv-content';
    if (!$('.cv_page').length) {
        if (!$('#form-cv .all').length || !$('.all>#cv-main').length || !$('.all>#cv-main').length) {
            cv_all = '';
            if ($('#cv-main>#cv-content').length) {
                cv_all = '#cv-main';
                cv_left = '#cv-right';
                cv_right = '#cv-content';
            }
        }
        cv_left_offset = $(cv_left).offset();
        cv_left_height = $(cv_left).outerHeight(true);
        cv_right_offset = $(cv_right).offset();
        cv_right_height = $(cv_left).outerHeight(true);

        //Check layout dạng dọc thì không phân trang
        if (cv_left_offset.top < cv_right_offset.top) {
            if (cv_right_offset.top - cv_left_height > 0) {
                cv_all = '.all';
            }
        } else {
            if (cv_left_offset.top - cv_right_height > 0) {
                cv_all = '.all';
            }
        }
    }
    let data = {
        cv_all: cv_all,
        cv_left: cv_left,
        cv_right: cv_right
    }
    // console.log(data);
    return data;
}

function adjustPage(page = 1) {
    let layout = detectLayout();
    if (layout.cv_all != '.all') {
        return false;
    }
    // Xóa phần co giãn CV trước khi phân trang
    removeLineHeight();
    paginationCv(page);
    adjustLineHeight1();
    adjustLineHeight();
    //Thêm watermark
    addWatermark();
}

function paginationCv(page = 1) {
    let layout = detectLayout(),
        cv_all = layout.cv_all,
        cv_left = layout.cv_left,
        cv_right = layout.cv_right;

    let page_current = $(`#form-cv .cv_page[data-page="${page}"]`);
    page_current.removeClass('height_page');
    let heightAll = page_current.outerHeight(true),
        heightTop = page_current.find('#cv-top')[0] ? page_current.find('#cv-top').outerHeight(true) : 0,
        heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0,
        htmlTop = page_current.find('#cv-top')[0] && !page_current.find('#cv-top').parents(`${cv_all}`).length ? page_current.find('#cv-top')[0].outerHTML : '',
        htmlFooter = page_current.find('.footer')[0] ? page_current.find('.footer')[0].outerHTML : '',
        htmlContent = page_current.find(`${cv_all}`)[0] ? page_current.find(`${cv_all}`)[0].outerHTML : '';

    let heightFreeLeft = 0,
        heightFreeRight = 0;
    let nextPage = $(`#form-cv .cv_page[data-page="${Number(page) + 1}"]`),
        new_page = 1;
    while (nextPage.length || heightAll > height_page) {
        page_current = $(`#form-cv .cv_page[data-page="${page}"]`);
        page_current.removeClass('height_page');
        page_current.find(`${cv_right}`).removeAttr('style');
        page_current.find(`${cv_left}`).removeAttr('style');
        heightAll = page_current.outerHeight(true);
        nextPage = $(`#form-cv .cv_page[data-page="${Number(page) + 1}"]`);
        prevPage = $(`#form-cv .cv_page[data-page="${Number(page) - 1}"]`);

        heightTop = page_current.find('#cv-top')[0] && !page_current.find('#cv-top').parents(`${cv_all}`).length ? page_current.find('#cv-top').outerHeight(true) : 0;
        heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0;
        htmlTop = page_current.find('#cv-top')[0] ? page_current.find('#cv-top')[0].outerHTML : '';
        htmlFooter = page_current.find('.footer')[0] ? page_current.find('.footer')[0].outerHTML : '';
        htmlContent = page_current.find(`${cv_all}`)[0] ? page_current.find(`${cv_all}`)[0].outerHTML : '';
        heightFreeLeft = 0;
        heightFreeRight = 0;

        page_current.find(`${cv_left}`).removeAttr('style');
        page_current.find(`${cv_right}`).removeAttr('style');
        new_page = 1;

        if (nextPage.length) {
            new_page = 0;
        }
        if (!nextPage.length && heightAll > height_page) {
            let html = `<div class="cv_page page_more" data-page="${Number(page) + 1}"></div>`;
            $(html).insertAfter(page_current);
            nextPage = $(`#form-cv .cv_page[data-page="${Number(page) + 1}"]`);
            nextPage.prepend(htmlContent);
            nextPage.find('#cv-top').remove();
            nextPage.find(`${cv_right} #sort_block`).html('');
            nextPage.find(`${cv_right} .block.cvo-block `).remove('');
            nextPage.find(`${cv_left} #sortable`).html('');
        }
        if (heightFooter && nextPage.length) {
            page_current.find('.footer').remove()
            // htmlNextPage.push(htmlFooter);
            if (!nextPage.find('.footer').length) {
                nextPage.append(htmlFooter)
            }
        }
        if (nextPage.length && !nextPage.find('.all').length && heightAll > height_page) {
            nextPage.prepend(htmlContent);
            nextPage.find('#cv-top').remove();
            nextPage.find(`${cv_right} #sort_block`).html('');
            nextPage.find(`${cv_right} .block.cvo-block `).remove('');
            nextPage.find(`${cv_left} #sortable`).html('');
        }
        //Đẩy nội dung xuống page tiếp theo
        if (heightAll > height_page) {
            page_current.find(`${cv_right}`).hide();

            let boxLength = page_current.find(`${cv_left} .block`).length;
            let htmlBox = [];
            for (let i = boxLength - 1; i >= 0; i--) {
                if (page_current.outerHeight(true) > height_page) {
                    let html = page_current.find(`${cv_left} .block`).eq(i)[0].outerHTML;
                    page_current.find(`${cv_left} .block`).eq(i).remove();
                    // htmlBox.push(html);
                    nextPage.find(`${cv_left} #sortable`).prepend(html);
                }
            }
            page_current.find(`${cv_right}`).show();
            page_current.find(`${cv_left}`).hide();

            let blockLength = page_current.find(`${cv_right} .cvo-block`).length;
            for (let i = blockLength - 1; i >= 0; i--) {
                if (page_current.outerHeight(true) > height_page) {
                    let html = page_current.find(`${cv_right} .cvo-block`).eq(i)[0].outerHTML;
                    let blockHeight = page_current.find(`${cv_right} .cvo-block`).eq(i).outerHeight(true);
                    let id = page_current.find(`${cv_right} .cvo-block`).eq(i).attr('id');
                    let head = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0] ? page_current.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0].outerHTML : '';
                    let blockControls = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0] ? page_current.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0].outerHTML : '';
                    let childLength = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.experience').length;

                    if (childLength > 1 || nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
                        let d = 0;
                        for (let k = childLength - 1; k >= 0; k--) {
                            let htmlChild = page_current.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k)[0].outerHTML;
                            if (page_current.outerHeight(true) > height_page) {
                                if (nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
                                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).prepend(htmlChild);
                                } else {
                                    nextPage.find(`${cv_right} #sort_block`).prepend(html);
                                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] .experience`).remove();
                                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).prepend(htmlChild);
                                }
                                page_current.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k).remove();
                                d = k;
                            }
                        }
                        if (d > 0) {
                            nextPage.find(`${cv_right} .cvo-block[id="${id}"] .blockControls`).remove();
                            nextPage.find(`${cv_right} .cvo-block[id="${id}"] .head`).remove();
                        } else {
                            if (!nextPage.find(`${cv_right} .cvo-block[id="${id}"] .head`).length) {
                                nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).prepend(blockControls);
                                nextPage.find(`${cv_right} .cvo-block[id="${id}"]`).prepend(head);
                            }
                            page_current.find(`${cv_right} .cvo-block`).eq(i).remove();
                        }
                    } else {
                        if (blockHeight <= height_page) {
                            nextPage.find(`${cv_right} #sort_block`).prepend(html);
                            page_current.find(`${cv_right} .cvo-block`).eq(i).remove();
                        }
                    }
                } else {
                    break;
                }
            }
            heightFreeRight = height_page - page_current.outerHeight(true);
        }

        page_current.find(`${cv_left}`).show();
        page_current.find(`${cv_right}`).hide();

        //Đẩy nội dung từ page sau lên page hiện tại
        heightFreeLeft = height_page - page_current.outerHeight(true);
        if (heightFreeLeft > 0) {
            let boxLength = nextPage.find(`${cv_left} .block`).length;
            let listBoxRemove = [];
            for (let i = 0; i <= boxLength - 1; i++) {
                let boxHeight = nextPage.find(`${cv_left} .block`).eq(i).outerHeight(true);
                if (boxHeight < heightFreeLeft) {
                    let html = nextPage.find(`${cv_left} .block`).eq(i)[0].outerHTML;
                    page_current.find(`${cv_left} #sortable`).append(html);
                    listBoxRemove.push(i);
                    heightFreeLeft -= boxHeight;
                } else {
                    break;
                }
            }
            listBoxRemove.sort((a, b) => { return b - a });
            listBoxRemove.forEach(function callback(item, i) {
                nextPage.find(`${cv_left} .block`).eq(item).remove();
            })
        }
        page_current.find(`${cv_left}`).hide();
        page_current.find(`${cv_right}`).show();
        heightFreeRight = height_page - page_current.outerHeight(true);

        if (heightFreeRight > 0 && nextPage.length > 0) {
            let blockLength = nextPage.find(`${cv_right} .cvo-block`).length;
            let listBlockDelete = [];
            for (let i = 0; i <= blockLength - 1; i++) {
                let html = nextPage.find(`${cv_right} .cvo-block`).eq(i)[0] ? nextPage.find(`${cv_right} .cvo-block`).eq(i)[0].outerHTML : i;
                let id = nextPage.find(`${cv_right} .cvo-block`).eq(i).attr('id');
                let head = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0] ? nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.head')[0].outerHTML : '';
                let blockControls = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0] ? nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.blockControls')[0].outerHTML : '';
                let childLength = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').length;
                let boxHeight = nextPage.find(`${cv_right} .cvo-block`).eq(i).outerHeight(true);

                if (childLength > 1 || page_current.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
                    let childRemove = [];
                    for (let k = 0; k <= childLength - 1; k++) {
                        let htmlChild = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k)[0].outerHTML;
                        let heightChild = nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(k).outerHeight(true);
                        if (k == 0 && childLength > 1) {
                            let heightRemove = 0;
                            for (let j = 1; j < childLength; j++) {
                                heightRemove += nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(j).outerHeight(true);
                            }
                            heightChild = boxHeight - heightRemove;
                        }
                        if (heightFreeRight > heightChild) {
                            if (page_current.find(`${cv_right} .cvo-block[id="${id}"]`).length) {
                                page_current.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).append(htmlChild);
                            } else {
                                page_current.find(`${cv_right} #sort_block`).append(html);
                                page_current.find(`${cv_right} .cvo-block[id="${id}"] .experience`).remove();
                                page_current.find(`${cv_right} .cvo-block[id="${id}"] #experience-table`).append(htmlChild);
                            }
                            childRemove.push(k);
                            heightFreeRight -= heightChild;
                            if (k == 0) {
                                if (head) {
                                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] .blockControls`).remove();
                                    nextPage.find(`${cv_right} .cvo-block[id="${id}"] .head`).remove();
                                }
                            }
                        } else {
                            heightFreeRight -= heightChild;
                        }
                    }
                    childRemove.reverse().forEach((val) => {
                        nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').eq(val).remove()
                    })
                    heightFreeRight -= boxHeight;
                    if (!nextPage.find(`${cv_right} .cvo-block`).eq(i).find('.experience').length) {
                        nextPage.find(`${cv_right} .cvo-block`).eq(i).remove();
                    }
                } else {
                    if (heightFreeRight >= boxHeight) {
                        page_current.find(`${cv_right} #sort_block`).append(html);
                        listBlockDelete.push(i);
                        heightFreeRight -= boxHeight;
                    } else {
                        break;
                    }
                }
            }
            listBlockDelete.reverse().forEach((val) => {
                nextPage.find(`${cv_right} .cvo-block `).eq(val).remove()
            })

        }
        page_current.find(`${cv_right}`).show();
        page_current.find(`${cv_left}`).show();
        if (!heightFooter) {
            heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0;
            heightFreeLeft -= heightFooter;
            heightFreeRight -= heightFooter;
        }
        let heightAllNew = page_current.outerHeight(true);
        if (
            !nextPage.find(`${cv_left} .block:visible`).length &&
            !nextPage.find(`${cv_right} .cvo-block:visible`).length &&
            heightAllNew + heightFooter <= height_page
        ) {
            if (nextPage.find('.footer').length) {
                page_current.append(nextPage.find('.footer')[0].outerHTML);
                if (page_current.outerHeight(true) <= height_page) {
                    nextPage.find('.footer').remove();
                } else {
                    page_current.find('.footer').remove();
                }
                // nextPage.remove();
                // nextPage = '';
            }
        }

        page_current.addClass('height_page');

        page = Number(page);
        page++;
    }

    //Xóa các trang thừa
    for (let i = $(`#form-cv .cv_page`).length; i >= 0; i--) {
        let pagePrev = $(`#form-cv .cv_page[data-page="${i - 1}"]`);
        let page = $(`#form-cv .cv_page[data-page="${i}"]`);
        if (
            !page.find(`${cv_left} .block:visible`).length &&
            !page.find(`${cv_right} .cvo-block:visible`).length &&
            !page.find(`.footer`).length
        ) {
            //Chuyển nội dung box đang ẩn lên page trước
            if (page.find(`${cv_left} .block:hidden`).length) {
                for (let i = 0; i < page.find(`${cv_left} .block:hidden`).length; i++) {
                    let id = page.find(`${cv_left} .block:hidden`)[i].getAttribute('id');
                    let html = page.find(`${cv_left} .block:hidden`)[i].outerHTML;
                    pagePrev.find(`${cv_left} #sortable`).append(html);
                }
            }
            if (page.find(`${cv_right} .cvo-block:hidden`).length) {
                for (let i = 0; i < page.find(`${cv_right} .cvo-block:hidden`).length; i++) {
                    let id = page.find(`${cv_right} .cvo-block:hidden`)[i].getAttribute('id');
                    let html = page.find(`${cv_right} .cvo-block:hidden`)[i].outerHTML;
                    pagePrev.find(`${cv_right} #sort_block`).append(html);
                }
            }
            page.remove();
        }
    }

    //Thêm padding để full trang
    heightFooter = page_current.find('.footer')[0] ? page_current.find('.footer').outerHeight(true) : 0;
    // while (!page_current.length && page >= 0) {
    //     page_current = $(`#form-cv .cv_page[data-page="${Number(page) - 1}"]`);
    //     page--;
    // }
    if (heightFreeLeft > heightFreeRight) {
        page_current.find(`${cv_left}`).css('padding-bottom', heightFreeLeft - 20);
    } else {
        if (heightFreeRight > 0) {
            page_current.find(`${cv_right}`).css('padding-bottom', heightFreeRight - 20);
        }
    }
    if (page_current.attr('data-page') > $(`#form-cv .cv_page`).length) {
        paginationCv($(`#form-cv .cv_page`).length);
    }

    let url_image = $('#form-cv').attr('data-background');
    changeBackgroundCv(url_image);
}


function adjustLineHeight() {
    // return false;
    let totalPage = $('.cv_page').length;
    for (let page = 1; page <= totalPage; page++) {
        let curentPage = $(`.cv_page[data-page="${page}"]`);
        curentPage.removeClass('height_page');
        curentPage.find('#cv-content').hide();
        heightFreeLeft = height_page - curentPage.outerHeight(true);
        curentPage.find('#cv-content').show();
        curentPage.find('#cv-main').hide();
        heightFreeRight = height_page - curentPage.outerHeight(true);
        curentPage.find('#cv-main').show();
        heightFreeLeft = Number(heightFreeLeft);
        heightFreeRight = Number(heightFreeRight);

        let heightFreeMax = heightFreeRight > heightFreeLeft ? heightFreeRight : heightFreeLeft;
        let marginForAll = 0;
        if (curentPage.find('#cv-top').length && heightFreeMax < 200) {
            marginForAll = heightFreeMax * 0.25;
        }
        heightFreeLeft -= marginForAll;
        heightFreeRight -= marginForAll;
        curentPage.find('.all').css('padding-top', marginForAll);
        if (heightFreeLeft < 200) {
            let marginForBox = heightFreeLeft * 0.5;
            let marginForContent = heightFreeLeft - marginForBox;
            //Thêm margin cho các box cha
            let blockLength = curentPage.find('.sortable .block').length;
            curentPage.find('.sortable .block').css('margin-top', (marginForBox / blockLength));

            //Thêm margin cho các box con
            let contentLength = curentPage.find('.sortable .block .box-content:visible').length;
            curentPage.find('.sortable .block .box-content').css('margin-top', (marginForContent / contentLength));
        }
        if (heightFreeRight < 200) {
            let marginForBox = heightFreeRight * 0.5;
            let marginForContent = heightFreeRight - marginForBox;
            //Thêm margin cho các box cha
            let blockLength = curentPage.find('.sort_block .cvo-block').length;
            curentPage.find('.sort_block .cvo-block').css('margin-top', (marginForBox / blockLength));

            //Thêm margin cho các box con
            let contentLength = curentPage.find('.sort_block .cvo-block .ctbx.experience').length;
            curentPage.find('.sort_block .cvo-block .ctbx.experience').css('margin-top', (marginForContent / contentLength));
        }
        curentPage.addClass('height_page');
    }
}

function adjustLineHeight1() {
    let totalPage = $('.cv_page').length;
    let lastPage = $(`.cv_page[data-page="${totalPage}"]`);

    lastPage.find('#cv-content').removeAttr('style');
    lastPage.find('#cv-main').removeAttr('style');

    //Lấy chiều dài của 2 cột ở page cuối
    lastPage.removeClass('height_page');
    lastPage.find('.all #cv-content').hide();
    let lastPageHeightLeft = lastPage.find('.all').height() + lastPage.find('.footer').height();
    lastPage.find('.all #cv-main').hide();
    lastPage.find('.all #cv-content').show();
    let lastPageHeightRight = lastPage.find('.all').height() + lastPage.find('.footer').height();
    lastPage.find('.all #cv-main').show();
    lastPage.addClass('height_page');

    freeHeightLeft = 0;
    freeHeightRight = 0;

    //Lấy khoảng trống còn dư của 2 cột
    for (let page = 1; page < totalPage; page++) {

        let currentPage = $(`.cv_page[data-page="${page}"]`);

        if (page == totalPage - 1) {
            currentPage.removeClass('height_page');
            currentPage.find(`#cv-main`).removeAttr('style');
            currentPage.find(`#cv-content`).removeAttr('style');
            currentPage.find('#cv-content').hide();
            freeHeightLeft += height_page - currentPage.outerHeight(true);
            currentPage.find('#cv-content').show();

            currentPage.find('#cv-main').hide();
            freeHeightRight += height_page - currentPage.outerHeight(true);
            currentPage.find('#cv-main').show();
            currentPage.find('#cv-main .cvo-block').each(function () {
                let marginTop = $(this).css('margin-top').replace('px', '');
                let marginBottom = $(this).css('margin-bottom').replace('px', '');
                freeHeightLeft += Number(marginTop);
                freeHeightLeft += Number(marginBottom);
            })
            currentPage.find('#cv-content .cvo-block').each(function () {
                let marginTop = $(this).css('margin-top').replace('px', '');
                let marginBottom = $(this).css('margin-bottom').replace('px', '');
                freeHeightRight += Number(marginTop);
                freeHeightRight += Number(marginBottom);
            });
        }
    }
    if (lastPageHeightLeft <= 200 && lastPageHeightRight <= 200 && freeHeightLeft >= lastPageHeightLeft && freeHeightRight >= lastPageHeightRight) {
        let beforeLastPage = $(`.cv_page[data-page="${totalPage - 1}"]`);
        beforeLastPage.find('#cv-content').removeAttr('style');
        beforeLastPage.find('#cv-main').removeAttr('style');

        beforeLastPage.find('.all #cv-content').hide();
        let paddingLeft = height_page - beforeLastPage.outerHeight(true);
        beforeLastPage.find('.all #cv-main').hide();
        beforeLastPage.find('.all #cv-content').show();
        let paddingRight = height_page - beforeLastPage.outerHeight(true);
        beforeLastPage.find('.all #cv-main').show();
        let heightMarginLeft = freeHeightLeft - paddingLeft;
        let heightMarginRight = freeHeightRight - paddingRight;
        beforeLastPage.find('#cv-main .block').each(function () {
            let marginTop = $(this).css('margin-top').replace('px', '');
            let marginBottom = $(this).css('margin-bottom').replace('px', '');
            let marginTopAdjust = (marginTop / heightMarginLeft) * (marginTop),
                marginBottomAdjust = (marginBottom / heightMarginLeft) * (marginBottom);
            $(this).css('margin-top', marginTopAdjust);
            $(this).css('margin-bottom', marginBottomAdjust);
        });
        beforeLastPage.find('#cv-content .cvo-block').each(function () {
            let marginTop = $(this).css('margin-top').replace('px', '');
            let marginBottom = $(this).css('margin-bottom').replace('px', '');
            let marginTopAdjust = (marginTop / heightMarginRight) * (freeHeightLeft - lastPageHeightRight),
                marginBottomAdjust = (marginBottom / heightMarginRight) * (freeHeightRight - lastPageHeightRight);
            $(this).css('margin-top', marginTopAdjust);
            $(this).css('margin-bottom', marginBottomAdjust);
        });
    }
    paginationCv();
}


function removeLineHeight() {
    let totalPage = $('.cv_page').length;
    for (let page = 1; page <= totalPage; page++) {
        $('.cv_page .all').removeAttr('style');
        $('.cv_page .sortable .block:visible').removeAttr('style');
        $('.cv_page .sort_block .cvo-block:visible').removeAttr('style');
        $('.cv_page .sort_block .cvo-block .ctbx.experience:visible').removeAttr('style');
    }
}

function changeBackgroundCv(url_image) {
    if (url_image) {
        $('#form-cv').attr('data-background', url_image);
        $('#form-cv').css('background', 'unset');
        $('#form-cv .cv_page').css('background', `url(${url_full})`).css('background-size', 'cover').css('background-position', 'center');
        $('#cv-top,.footer,.all,.exp-fake,.cvo-block,.head,#cv-profile-job,#cv-main,#cv-right,#cv-boxtitle,#cv-right h3,#cv-content .head div,#block01 .exp-date,div#prof,.cvo-block .cum,.ski,.tt-box1').css('background', 'none');
        $('div#cv-boxtitle,.box-content,#cv-content .head div,#block01 .exp-date').css('color', '#000');
        $('#cv-content .head div,#cv-boxtitle').css('border-color', '#000');

    }
}

$(document).ready(function () {
    let url_image = $('#form-cv').attr('data-background');
    changeBackgroundCv(url_image)
});

function addWatermark() {
    let html = `<div class="watermark_js">©Topcvvn</div>`;
    let totalPage = $('.cv_page').length;
    for (let page = 1; page <= totalPage; page++) {
        let currentPage = $(`.cv_page[data-page="${page}"]`);
        if (!currentPage.find('.watermark_js').length && !currentPage.find('.watermark').length) {
            currentPage.append(html);
        }
    }
}
function check_cv_begin() {
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
                title = $(this).parents('.cvo-block').find('.box-title').text().trim();
            } else if ($(this).parents('.cvo-block').length) {
                box_id = $(this).parents('.cvo-block').attr('id');
                content_suggest = data_block.find(block => block.id == box_id);
                title = $(this).parents('.cvo-block').find('.block-title').text().trim();
            }
            if (content_suggest) {
                //check nội dung box
                if ($(this).hasClass('box-content')) {
                    if (replaceStr(content_suggest.content) == replaceStr($(this).html()) && replaceStr(content_suggest.content) != '') {
                        error = 1;
                    }
                }
                //check nội dung block
                else if ($(this).hasClass('exp-content') && $(this).parents('.cvo-block').attr('id') != 'block01' && $(this).parents('.cvo-block').attr('id') != 'block05') {
                    content_suggest.content.forEach(item => {
                        if (replaceStr(item.content) == replaceStr($(this).html()) && replaceStr(item.content) != '') {
                            error = 1;
                        }
                    });
                }

                //check tên công ty trong block
                // else if ($(this).hasClass('exp-title')) {
                //     content_suggest.content.forEach(item => {
                //         if (replaceStr(item.title) == replaceStr($(this).html()) && replaceStr(item.title) != '') {
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
}
$(document).ready(function () {
    check_cv_begin();
});
$(document).ready(function () {
    $(".watermark").text("©Topcvvn");
});

$(document)
    .on('click', '.cvo-block:not(.box-contact) [contenteditable="true"]', function () {
        if ($(this).text().trim() != '' && $(this).hasClass('err_cv_content')) {
            $(this).text('');
            $(this).removeClass('err_cv_content');
        }
    })
    .on('input', '.cvo-block:not(.box-contact,.box-skills) [contenteditable="true"]', function () {
        if (!$(this).parents('#block05').length) {
            if ($(this).text().trim() == '') {
                $(this).addClass('err_cv_content');
            } else {
                $(this).removeClass('err_cv_content');
            }
        }
    })
    .on('input', '#cv-profile-fullname, #cv-profile-job, #cv-profile-phone, #cv-profile-email, #cv-profile-address, #cv-profile-sex, #cv-profile-birthday', function () {
        if ($(this).text().trim() != '') {
            $(this).removeAttr('style');
        } else {
            $(this).css('outline', 'red dashed 1px');
        }
    })
    .on('click', function (event) {
        var target = $(event.target);
        if (!target.closest('.el-message-box').length && !target.closest('#btn-save-cv-reg').length) {
            $(".v-modal1").remove(), $(".el-message-box__wrapper1").remove()
        }
        if (!target.closest('.el-message-box').length && !target.closest('#btn-save-cv').length) {
            $(".v-modal2").remove(), $(".el-message-box__wrapper2").remove()
        }
    })
    .on('click', '.item_suggest .open', function () {
        if ($(this).parents('.item_suggest').hasClass('active')) {
            $(this).parents('.item_suggest').removeClass('active');
        } else {
            $(this).parents('.item_suggest').addClass('active');
        }
    })