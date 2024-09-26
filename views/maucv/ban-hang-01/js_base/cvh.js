$(function () {
    $(document).on('click', '.fieldgroup_controls .remove', function (e) {        
        var item = $(this).parent().parent();        
        var itemId = item.attr('id');
        var parentRemoveId = '#' + item.parent().attr('id');        
        item.remove();        
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

        for (var t = 0; t < sortAbleArea.length; t++) {            
            if (sortAbleArea[t].el === '#' + item.parent().attr('id')) {
                var area = sortAbleArea[t];
                $.createOrder(area.area, item.attr('id'), $(area.el).children().length);

                $.initSortable(area, false);
                $.upAndDown(item, area.el);

                return false;
            }            
        }
    });

    $(document).on('click', '.blockControls .hide', function (e) {
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
    });

    $(document).on('click', '.js-edit-content', function (e) {
        $(this).parent().parent().addClass('edit-content');
        $(this).parent().html('<div class="save js-save-content">Save</div>');
    });

    $(document).on('click', '.js-save-content', function (e) {
        var div = $(this).parent().parent();
        var bar = div.removeClass('edit-content').find('.bar-exp');
        var p = div.find('.bar-value-exp input').val();
        if(p>100){p=100;}else if(p<0){p=0;}
        bar.html('<span style="width: ' + p + '%"></span>');
        $(this).parent().html('<div class="clone"><i class="fa fa-plus"></i> </div>\n' +
            '                                                <div class="edit js-edit-content"><i class="fa fa-edit"></i></div>\n' +
            '                                                <div class="remove"><i class="fa fa-minus"></i> </div>');
    });

    //Declare sortable area and item want to sort here
    var sortAbleArea = [
        {el: '#sortable', item: '.block', area: 'menu'},
        {el: '#sort_block', item: '.cvo-block', area: 'experiences'}
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
        var sub = {id: id, order: order, content: ''};        
        data[area].push(sub);
    };    

    //Remove item from data
    $.removeItem = function (area, id) {
        data[area].forEach( function (arrayItem, index) {
            if (data[area][index].id === id) {
                data[area].splice(index, 1);
            }
        });
    };

    //Hide block from data
    $.hideBlock = function (area, id) {
        data[area].forEach( function (arrayItem, index) {
            if (data[area][index].id === id) {
                data[area][index].status = 'hide';
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
   
    $.initSortable = function (sortable, updown = true) {
        var item = $(sortable.el + ' ' + sortable.item);            
        //Handle sortable
        $(sortable.el).sortable({
            cancel: 'input, [contenteditable]',

            create: function (event, ui) {
              item.each(function (e) {
                $.createOrder(sortable.area, $(this).attr('id'), ($(this).index() + 1));
              });
            },

            update: function (event, ui) {              
              item.each(function (e) {                
                $.updateOrder(sortable.area, $(this).attr('id'), ($(this).index() + 1));
              });

              //console.log(data);
            }
        });

        if (updown) {        
            $.upAndDown(item, sortable.el);
        }       

    };

    $.upAndDown = function (items, sortableEl) {        
        items.each(function () {
            var self = $(this);
            //console.log(self)
            $(this).find('.up').on('click', function () {
              if (!self.is(':first-child')) {
                var prev = self.prev();
                self.insertBefore(prev).hide().fadeIn();
                $(sortableEl).sortable('option', 'update')();
              }
            });

            $(this).find('.down').on('click', function () {
              if (!self.is(':last-child')) {
                var next = self.next();
                self.insertAfter(next).hide().fadeIn();
                $(sortableEl).sortable('option', 'update')();
              }
            })
        });
    };

    //Start create data
    for (var l = 0; l < sortAbleArea.length; l++) {
        $.initSortable(sortAbleArea[l]);
    }

    //Get content and export to json data
    $.exportData = function() {
        data['css'] = {
            color: '479B9D',
            font: 'Roboto',
            font_size: 'normal',
            font_spacing: 'normal'
        }
        data['cv_title'] = $('#page-cv #cv-title').text();        
        data['avatar'] = $('#page-cv #cvo-profile-avatar').attr('src'); 
        data['name'] = $('#cv-profile-fullname').text();
        data['position'] = $('#cv-profile-job').text();
        data['introduction'] = $('#cv-profile-about').html();        
        //export data for box menu
        for (var k = 0; k < data['menu'].length; k++) {
            var tmpItem = $('#' + data['menu'][k].id);
            var content = '';

            if (tmpItem.hasClass('box-contact')) {
                content = {
                    type:'profile',
                    content: {
                        birthday: tmpItem.find('#cv-profile-birthday').text(),
                        sex: tmpItem.find('#cv-profile-sex').text(),
                        phone: tmpItem.find('#cv-profile-phone').text(),
                        email: tmpItem.find('#cv-profile-email').text(),
                        address: tmpItem.find('#cv-profile-address').text(),
                        face: tmpItem.find('#cv-profile-face').text()
                    }
                }
            } else if (tmpItem.hasClass('box-skills')) {
                content = {
                    type: 'skill',
                    skills: []
                };

                $('.box-skills .ctbx').each(function () {
                    content.skills.push({
                        name: $(this).find('.skill-name input').val(),
                        exp: $(this).find('.bar-value-exp input').val()
                    });
                });
            } else {
                content = tmpItem.find('.box-content').html();
            }

            data['menu'][k].content = {
              title: tmpItem.find('.box-title').html(),
              content: content
            }
        }        
        for (var k = 0; k < data['experiences'].length; k++) {
            var tmpItem = $('#' + data['experiences'][k].id);            
            var content = [];
            //export data for box experience              
            for (var m = 0; m < tmpItem.find('.experience').length; m++) {
                var tmpExp = $('#' + data['experiences'][k].id + ' #' + tmpItem.find('.experience')[m].id);                                            
                content.push({
                    title: tmpExp.find('.exp-title').html(),
                    subtitle: tmpExp.find('.exp-subtitle').html(),
                    content: tmpExp.find('.exp-content').html()
                });                
            } 
            data['experiences'][k].content = {
              title: tmpItem.find('.block-title').html(),
              content: content
            }
        }        
        var ar_data = JSON.stringify(data);              
        $('#ar_data').html(ar_data);
    };

    $('#btn-save-cv').on('click', function() {
        $.exportData();
    });

    $.randomStr = function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }    
});