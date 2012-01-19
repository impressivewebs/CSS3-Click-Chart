var s = null,

	Css3clickchart = {
		settings: {
			pathRoot: 'includes/',
			path: 'includes/features/',
			body: $('body'),
			currView: null,
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

			this.doDeepLink();

			s.edgeList.slideUp(0);
			s.commonList.slideDown(0);

			s.viewLink.bind('click', function () {

				$('.viewnav a').removeClass('selected');
				$(this).addClass('selected');

				s.viewLink = this.href.split('?view=');

				Css3clickchart.doView(s.viewLink[1]);

				return false;

			});

			s.featureLink.bind('click', function () {

				s.featureLink.removeClass('selected');
				$(this).addClass('selected');

				s.featureURL = this.href.split('?prop=');
				location.hash = s.featureURL[1];

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

		},

		doHash: function () {

			s = this.settings;

			s.featureURL = location.hash.replace('#', '');
			//s.featureURL = s.featureURL.replace('feature-', '');

			s.body.addClass('loading');
			
			$.when(
				s.featureTitle.load(s.path + s.featureURL + '/title.php'),
				s.description.load(s.path + s.featureURL + '/description.php'),
				$.get(s.path + s.featureURL + '/code.php', function(data) {

				if (s.code.get(0).tagName === "PRE") {
					data = data.replace(/\r/g, '<br>');
					data = data.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
				}

				s.code.html(data);
				
				}),
				s.result.load(s.path + s.featureURL + '/result.php'),
				s.support.load(s.path + s.featureURL + '/support.php'),
				s.info.load(s.path + s.featureURL + '/technical.php'),
				s.polyfills.load(s.path + s.featureURL + '/polyfills.php', function() {
					if (!s.polyfills.html()) {
						s.polyfills.html('No sources yet');
					}
				}),
				s.tutorials.load(s.path + s.featureURL + '/tutorials.php', function() {
					if (!s.tutorials.html()) {
						s.tutorials.html('No sources yet');
					}
				})
				
				).done(function(){ 
				s.body.removeClass('loading');
			});

			s.featureURL = s.featureURL.replace('-', ' ');

		},

		doView: function (view) {

			s = this.settings;

			if (view === 'common') {
				s.commonList.slideDown(s.speed);
				s.edgeList.slideUp(s.speed);
			} else {
				s.edgeList.slideDown(s.speed);
				s.commonList.slideUp(s.speed);
			}

		},

		doDeepLink: function () {

			s = this.settings;

			$('.featureslist a').removeClass('selected');
			$('#commonlist a[href$="' + location.hash.replace('#', '') + '"]').addClass('selected');
			$('#edgelist a[href$="' + location.hash.replace('#', '') + '"]').addClass('selected');

		},

		fitCode: function () {

			s = this.settings;

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

			s = this.settings;
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

			s = this.settings;
			s.codeSelect = $('#codeSelect');
			
			s.codeSelect.bind('click', function () {
			
				s.code.select();
				return false;

			});
			
		}

	};

$(function () {
	Css3clickchart.init();
	Css3clickchart.doToggle();
	Css3clickchart.fitCode();
	Css3clickchart.selectCode();
});