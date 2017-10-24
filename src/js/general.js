var s = null,

  Css3clickchart = {
    settings: {
      pathRoot: 'includes/',
      path: 'includes/features/',
      body: document.body,
      currView: null,
      dlHREF: null,
      btnCommon: document.querySelector('.btncommon a'),
      btnEdge: document.querySelector('.btnedge a'),
      viewLink: document.querySelectorAll('.viewnav a'),
      featureLink: document.querySelectorAll('.featureslist a'),
      commonList: document.getElementById('commonlist'),
      edgeList: document.getElementById('edgelist'),
      featureURL: null,
      featureTitle: document.querySelector('#description>h2'),
      description: document.querySelector('#description>p'),
      ed: document.querySelector('.ed'),
      edh2: document.querySelector('.ed>h2'),
      code: document.getElementById('code'),
      result: document.getElementById('result'),
      support: document.getElementById('support'),
      supportHeading: document.getElementById('supportHeading'),
      info: document.querySelector('#info>p'),
      polyfills: document.querySelector('#polyfills>p'),
      tutorials: document.querySelector('#tutorials>p'),
      autoSizeBtn: null,
      codeSelect: null,
      toggleOn: true,
      hiddenText: null,
      codeH: null,
      myAutoSizeBtn: null,
      myCodeSelectBtn: null,
      mySupportBtn: null,
      foo: 'bar'
    },

    init: function () {

      s = this.settings;

      document.documentElement.className += ' js';

      if (document.location.toString().split('?view=')[1] === 'common') {
        document.location = document.location.toString().split('?view=')[0] + '#box-sizing';
      }

      if (document.location.toString().split('?view=')[1] === 'edge') {
        document.location = document.location.toString().split('?view=')[0] + '#calc';
      }

      s.currView = document.location.toString();
      s.currView = s.currView.split('?prop=');

      if (s.currView[1]) {
        document.location = s.currView[0] + "#" + s.currView[1];
      } else {
        if (!location.hash) {
          document.location = s.currView[0] + "#box-sizing";
        }
      }

      s.edgeList.classList.add('hidden');

      this.doViewNav();
      this.doPropLinks();

      if (location.hash) {
        if (location.hash.toString().indexOf('##') > -1) {
          document.location = '#box-sizing';
        } else {
          this.doHash();
        }
      }

      this.doDynamicButtons();

      window.addEventListener('hashchange', function () {
        Css3clickchart.doHash();
        Css3clickchart.doDeepLink();
      });

      this.doDeepLink();
      this.doToggle();
      this.fitCode();
      this.selectCode();
      //this.doServiceWorker();

    },

    doViewNav: function () {
      for (var i = 0; i < s.viewLink.length; i++) {
        s.viewLink[i].addEventListener('click', function (e) {
          document.querySelector('.viewnav a.selected').classList.remove('selected');
          this.classList.add('selected');

          s.viewLink = this.href.split('?view=');
          Css3clickchart.doView(s.viewLink[1]);
          Css3clickchart.doAdLoad();

          e.preventDefault();

        }, false);
      }
    },

    doPropLinks: function () {
      for (var i = 0; i < s.featureLink.length; i++) {

        s.featureLink[i].addEventListener('click', function (e) {
          if (document.querySelector('.featureslist .selected')) {
            document.querySelector('.featureslist .selected').classList.remove('selected');
          }
          this.classList.add('selected');

          s.featureURL = this.href.split('?prop=');
          location.hash = s.featureURL[1];

          Css3clickchart.doAdLoad();

          e.preventDefault();

        }, false);
      }
    },

    doDynamicButtons: function () {
      if (!document.getElementById('codeSelect')) {
        s.myAutoSizeBtn = document.createElement('a');
        s.myAutoSizeBtn.setAttribute('href', '#');
        s.myAutoSizeBtn.setAttribute('id', 'autoSize');
        s.myAutoSizeBtn.setAttribute('class', 'toggle-autosize on');
        s.myAutoSizeBtn.innerHTML = '[ disable auto-size ]';
        s.ed.appendChild(s.myAutoSizeBtn);

        s.myCodeSelectBtn = document.createElement('a');
        s.myCodeSelectBtn.setAttribute('href', '#');
        s.myCodeSelectBtn.setAttribute('id', 'codeSelect');
        s.myCodeSelectBtn.setAttribute('class', 'codeselect');
        s.myCodeSelectBtn.innerHTML = '[ select code ]';
        s.edh2.parentNode.insertBefore(s.myCodeSelectBtn, s.edh2.nextSibling);
      }
    },

    doAjax: function (url, el, callback) {

      var request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var resp = request.response;
          el.innerHTML = resp;
          if (callback) {
            callback();
          }

        } else {
          // We reached our target server, but it returned an error
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
      };

      request.send();
    },

    doHash: function () {

      if (location.hash.toString().indexOf('##') > -1) {
        document.location = location.hash.toString().replace(/#+/, '#');
      }

      s.featureURL = location.hash.replace('#', '');
      s.body.classList.add('loading');

      if (window._gaq) {
        window._gaq.push(['_trackPageview', '/?prop=' + s.featureURL]);
      }

      this.doAjax(s.path + s.featureURL + '/title.html', s.featureTitle);
      this.doAjax(s.path + s.featureURL + '/description.html', s.description);
      this.doAjax(s.path + s.featureURL + '/code.html', s.code);
      this.doAjax(s.path + s.featureURL + '/result.html', s.result);
      this.doAjax(s.path + s.featureURL + '/result.html', s.result);
      this.doAjax(s.path + '../support-widget.php?url=' + s.featureURL, s.support, function () {
        var ciuScript = document.createElement('script');
        ciuScript.src = 'js/caniuse-embed.min.js';
        ciuScript.async = 'async';
        ciuScript.id = "ciuEmbed";
        s.support.appendChild(ciuScript);
        Css3clickchart.doSupportSwitch();
      });
      
      this.doAjax(s.path + s.featureURL + '/technical.html', s.info);
      this.doAjax(s.path + s.featureURL + '/polyfills.html', s.polyfills, function () {
        if (!s.polyfills.innerHTML) {
          s.polyfills.innerHTML = 'No sources yet';
        }
      });
      this.doAjax(s.path + s.featureURL + '/tutorials.html', s.tutorials, function () {
        if (!s.tutorials.innerHTML) {
          s.tutorials.innerHTML = 'No sources yet';
        }
      });

      s.body.classList.remove('loading');
      s.featureURL = s.featureURL.replace('-', ' ');
    },

    doView: function (view) {

      if (view === 'common') {
        s.commonList.classList.remove('hidden');
        s.btnCommon.classList.add('selected');
        s.edgeList.classList.add('hidden');
        s.btnEdge.classList.remove('selected');
        document.location = '#box-sizing';
      } else {
        s.edgeList.classList.remove('hidden');
        s.btnEdge.classList.add('selected');
        s.commonList.classList.add('hidden');
        s.btnCommon.classList.remove('selected');
        document.location = '#resize';
      }

    },

    doDeepLink: function () {

      if (document.querySelector('.featureslist .selected')) {
        document.querySelector('.featureslist .selected').classList.remove('selected');
      }

      if (document.querySelector('#commonlist a[href$="' + location.hash.replace('#', '') + '"]')) {
        document.querySelector('#commonlist a[href$="' + location.hash.replace('#', '') + '"]').classList.add('selected');
      }

      if (document.querySelector('#edgelist a[href$="' + location.hash.replace('#', '') + '"]')) {
        document.querySelector('#edgelist a[href$="' + location.hash.replace('#', '') + '"]').classList.add('selected');
      }

      this.doFindMenu(location.hash.replace('#', ''));

    },

    doFindMenu: function (view) {

      s.dlHREF = document.querySelector('.propsnav ' + 'a[href$="' + view + '"]').parentNode.parentNode.getAttribute('id');

      if (s.dlHREF === 'commonlist') {
        s.commonList.classList.remove('hidden');
        s.btnCommon.classList.add('selected');
        s.edgeList.classList.add('hidden');
        s.btnEdge.classList.remove('selected');
      } else {
        s.edgeList.classList.remove('hidden');
        s.btnEdge.classList.add('selected');
        s.commonList.classList.add('hidden');
        s.btnCommon.classList.remove('selected');
      }

    },

    fitCode: function () {
      s.code.addEventListener('mouseover', Css3clickchart.doExpandCode);
      s.code.addEventListener('mouseout', Css3clickchart.doContractCode);
    },

    doExpandCode: function () {
      s.hiddenText = document.createElement('div');
      s.hiddenText.innerHTML = s.code.innerHTML;
      s.hiddenText.classList.add('hiddentext');
      document.body.append(s.hiddenText);
      s.codeH = s.hiddenText.offsetHeight;

      if (s.codeH > 400) {
        s.codeH = 400;
      }

      if (s.codeH < 110) {
        s.codeH = 110;
      }

      s.code.style.height = s.codeH + 'px';
      s.code.style.overflowY = 'visible';
      document.body.removeChild(s.hiddenText);
    },

    doContractCode: function () {
      s.code.style.height = '110px';
      s.code.style.overflowY = 'auto';
    },

    doFlip: function () {
      document.querySelector('.object').classList.toggle('flipped');
    },

    doToggle: function () {

      s.autoSizeBtn = document.getElementById('autoSize');
      s.autoSizeBtn.addEventListener('click', function (e) {
        if (this.classList.contains('on')) {
          this.classList.toggle('on');
          this.innerHTML = '[ enable auto-size ]';
          s.code.removeEventListener('mouseover', Css3clickchart.doExpandCode);
          s.code.removeEventListener('mouseout', Css3clickchart.doContractCode);
        } else {
          this.classList.toggle('on');
          this.innerHTML = '[ disable auto-size ]';
          Css3clickchart.fitCode();
        }

        e.preventDefault();
      });

    },

    selectCode: function () {
      s.codeSelect = document.getElementById('codeSelect');
      s.codeSelect.addEventListener('click', function (e) {
        s.code.select();
        e.preventDefault();
      });

    },

    doSupportSwitch: function () {
      if (!document.getElementById('supportBtn')) {
        s.mySupportBtn = document.createElement('a');
        s.mySupportBtn.setAttribute('href', '#');
        s.mySupportBtn.setAttribute('id', 'supportBtn');
        s.mySupportBtn.setAttribute('class', 'support-btn');
        s.mySupportBtn.setAttribute('data-support', 'mobile');
        s.mySupportBtn.innerHTML = '[ view mobile ]';
        s.supportHeading.appendChild(s.mySupportBtn);
        Css3clickchart.doSupportSwitchBtn();
      } else {
        s.mySupportBtn.innerHTML = '[ view mobile ]';
        s.mySupportBtn.setAttribute('data-support', 'mobile');
      }
    },

    doSupportSwitchBtn: function () {
      s.mySupportBtn.addEventListener('click', function (e) {
        var ciuScript = document.createElement('script');
        if (this.dataset.support === "mobile") {
          ciuScript.src = 'js/caniuse-embed.m.min.js';
          this.dataset.support = 'desktop';
          this.innerHTML = "[ view desktop ]";
        } else {
          ciuScript.src = 'js/caniuse-embed.min.js';
          this.dataset.support = 'mobile';
          this.innerHTML = "[ view mobile ]";
        }
        ciuScript.async = 'async';
        document.getElementById('ciuEmbed').remove();
        ciuScript.id = "ciuEmbed";
        s.support.appendChild(ciuScript);

        e.preventDefault();
      });
    },

    doAdLoad: function () {
      document.getElementById('ap').setAttribute('src', document.getElementById('ap').getAttribute('src'));
    },

    doServiceWorker: function () {

    }

  };

window.onload = function () {
  Css3clickchart.init();
};