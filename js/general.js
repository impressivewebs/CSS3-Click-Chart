var s = null,

    Css3clickchart = {
        settings: {
            pathRoot: 'includes/',
            path: 'includes/features/',
            body: $('body'),
            currView: null,
            dlHREF: null,
            btnCommon: $('.btncommon a'),
            btnEdge: $('.btnedge a'),
            viewLink: $('.viewnav a'),
            featureLink: $('.featureslist a'),
            commonList: $('#commonlist'),
            edgeList: $('#edgelist'),
            featureURL: null,
            featureTitle: $('#description>h2'),
            description: $('#description>p'),
            ed: $('.ed'),
            edh2: $('.ed>h2'),
            code: $('#code'),
            result: $('#result'),
            support: $('#support'),
            info: $('#info>p'),
            polyfills: $('#polyfills>p'),
            tutorials: $('#tutorials>p'),
            autoSizeBtn: null,
            codeSelect: null,
            toggleOn: true,
            hiddenText: $(document.createElement('div')),
            codeH: null,
            speed: 500,
            foo: 'bar'
        },

        init: function () {

            s = this.settings;

            s.currView = document.location.toString();
            s.currView = s.currView.split('?prop=');

            if (s.currView[1]) {
                document.location = s.currView[0] + "#" + s.currView[1];
            } else {
                if (!location.hash) {
                    document.location = s.currView[0] + "#box-sizing";
                }
            }

            //s.edgeList.slideUp(0);
            //s.commonList.slideDown(0);

            s.viewLink.bind('click', function () {

                $('.viewnav a').removeClass('selected');
                $(this).addClass('selected');

                s.viewLink = this.href.split('?view=');

                Css3clickchart.doView(s.viewLink[1]);

                Css3clickchart.doAdLoad();

                return false;

            });

            s.featureLink.bind('click', function () {

                s.featureLink.removeClass('selected');
                $(this).addClass('selected');

                s.featureURL = this.href.split('?prop=');
                location.hash = s.featureURL[1];

                Css3clickchart.doAdLoad();

                return false;

            });

            if (location.hash) {
                this.doHash();
            }

            s.ed.append('<a href="#" id="autoSize" class="toggle-autosize on">[ disable auto-size ]</a>');
            $('<a href="#" id="codeSelect" class="codeselect">[ select code ]</a>').insertAfter(s.edh2);

            $(window).bind('hashchange', function () {

                Css3clickchart.doHash();
                Css3clickchart.doDeepLink();

            });

            this.doDeepLink();
            this.doToggle();
            this.fitCode();
            this.selectCode();

        },

        doHash: function () {

            s.featureURL = location.hash.replace('#', '');
            //s.featureURL = s.featureURL.replace('feature-', '');

            s.body.addClass('loading');

            $.when(
                _gaq.push(['_trackPageview', '/?prop=' + s.featureURL]),
                s.featureTitle.load(s.path + s.featureURL + '/title.php'),
                s.description.load(s.path + s.featureURL + '/description.php'),
                $.get(s.path + s.featureURL + '/code.php', function (data) {

                    if (s.code.get(0).tagName === "PRE") {
                        data = data.replace(/\r/g, '<br>');
                        data = data.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                    }

                    s.code.html(data);

                }),
                s.result.load(s.path + s.featureURL + '/result.php'),
                s.support.load(s.path + s.featureURL + '/support.php'),
                s.info.load(s.path + s.featureURL + '/technical.php'),
                s.polyfills.load(s.path + s.featureURL + '/polyfills.php', function () {
                    if (!s.polyfills.html()) {
                        s.polyfills.html('No sources yet');
                    }
                }),
                s.tutorials.load(s.path + s.featureURL + '/tutorials.php', function () {
                    if (!s.tutorials.html()) {
                        s.tutorials.html('No sources yet');
                    }
                })

            ).done(function () {
                s.body.removeClass('loading');
            });

            s.featureURL = s.featureURL.replace('-', ' ');

        },

        doView: function (view) {

            if (view === 'common') {
                s.commonList.slideDown(s.speed);
                s.edgeList.slideUp(s.speed);
                document.location = '#box-sizing';
            } else {
                s.edgeList.slideDown(s.speed);
                s.commonList.slideUp(s.speed);
                document.location = '#calc';
            }

        },

        doDeepLink: function () {

            $('.featureslist a').removeClass('selected');
            $('#commonlist a[href$="' + location.hash.replace('#', '') + '"]').addClass('selected');
            $('#edgelist a[href$="' + location.hash.replace('#', '') + '"]').addClass('selected');

            this.doFindMenu(location.hash.replace('#', ''));

        },

        doFindMenu: function (view) {

            s.dlHREF = $('.propsnav').find('a[href$="' + view + '"]');

            if (s.dlHREF.parent().parent().attr('id') === 'commonlist') {

                s.commonList.slideDown(s.speed);
                s.edgeList.slideUp(s.speed);
                s.btnCommon.addClass('selected');
                s.btnEdge.removeClass('selected');

            } else {

                s.commonList.slideUp(s.speed);
                s.edgeList.slideDown(s.speed);
                s.btnEdge.addClass('selected');
                s.btnCommon.removeClass('selected');

            }

        },

        fitCode: function () {

            s.code.bind('mouseover focus', function () {

                s.hiddenText.html(s.code.html());
                s.hiddenText.addClass('hiddentext');
                $('body').append(s.hiddenText);
                s.codeH = s.hiddenText.height();

                if (s.codeH > 400) {
                    s.codeH = 400;
                }

                if (s.codeH < 110) {
                    s.codeH = 110;
                }

                s.code.stop().animate({
                    minHeight: s.codeH + 'px'
                }, s.speed, function () {
                    s.code.css('overflow-y', 'visible');
                });

            });

            s.code.bind('mouseout blur', function () {
                s.code.stop().animate({
                    minHeight: '110px'
                }, s.speed, function () {
                    s.code.css('overflow-y', 'auto');
                });
            });

        },

        doFlip: function () {

            $('.card').toggleClass('flipped');

        },

        doToggle: function () {

            s.autoSizeBtn = $('#autoSize');

            s.autoSizeBtn.bind('click', function () {
                if ($(this).hasClass('on')) {
                    $(this).toggleClass('on');
                    $(this).html('[ enable auto-size ]');
                    s.code.off('mouseover focus');
                    s.code.off('mouseout blur');
                } else {
                    $(this).toggleClass('on');
                    $(this).html('[ disable auto-size ]');
                    Css3clickchart.fitCode();
                }

                return false;
            });

        },

        selectCode: function () {

            s.codeSelect = $('#codeSelect');

            s.codeSelect.bind('click', function () {

                s.code.select();
                return false;

            });

        },

        doAdLoad: function () {

            $('#ap').attr('src', $('#ap').attr('src'));

        }

    };

$(function () {
    Css3clickchart.init();
});