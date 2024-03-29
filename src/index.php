<?php
if (isset($_GET["prop"])) {
  $prop = $_GET["prop"];
  //var_dump($prop);
} else {
  $prop = "feature-default";
}

$proptitlestr = str_replace("feature-", "", $prop);
?><!doctype html>

<html lang="en" class="no-js">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>CSS Click Chart | CSS3 Browser Support and Information</title>
  <meta name="description" content="CSS3 Click Chart">
  <meta name="author" content="Louis Lazaris">

  <meta name="monetization" content="$ilp.uphold.com/K2Xp98WeRgUn">

  <!-- Remove these two references once the files are in root with these file names -->
  <link rel="shortcut icon" href="/favicon.ico">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!--build:css css/styles.min.css-->
  <link rel="stylesheet" href="css/styles.css">
  <!--endbuild-->

  <script type="text/javascript">
    function recordOutboundLink(link, category, action) {
      try {
      var myTracker=_gat._getTrackerByName();
      _gaq.push(['myTracker._trackEvent', ' + category + ', ' + action + ']);
      setTimeout('document.location = "' + link.href + '"', 100)
      }catch(err){}
    }
  </script>

  <!--<link rel="manifest" href="manifest.json">-->

</head>

<body>

  <header>

    <div class="header-inside globalwidth">

      <h1><a href="http://css3clickchart.com" class="title-link">CSS Click Chart</a></h1>

      <ul class="viewnav clearfix">
        <li class="btncommon"><a href="#" class="selected">common stuff</a></li>
        <li class="btnedge"><a href="#">cutting-edge</a></li>
      </ul>

    </div><!-- .header-inside -->

  </header>

  <div class="propsnav globalwidth">

    <ul id="commonlist" class="featureslist">
      <?php include "includes/common.html"; ?>
    </ul>

    <ul id="edgelist" class="featureslist fledge">
      <?php include "includes/edge.html"; ?>
    </ul>

  </div><!-- .propsnav -->

  <div class="globalwidth">

    <div id="description" class="desc">
      <h2><?php include "includes/features/" . $proptitlestr . "/title.html"; ?></h2>
      <p><?php include "includes/features/" . $proptitlestr . "/description.html"; ?></p>
    </div><!-- #description -->

    <div id="info" class="spec ext">
      <h2>Specification</h2>
      <p><?php include "includes/features/" . $proptitlestr . "/technical.html"; ?></p>
    </div><!-- #info -->

  </div><!-- .globalwidth -->

  <div class="globalwidth ed">
    <h2>Example Code</h2>

    <label for="code"><textarea id="code" class="code" readonly><?php include "includes/features/" . $proptitlestr . "/code.html"; ?>
    </textarea></label>

  </div><!-- .ed -->

  <div class="globalwidth">

    <div class="demo-left">
      <h2>Live Demonstration</h2>

      <div id="result" class="result ext"><?php include "includes/features/" . $proptitlestr . "/result.html"; ?>
      </div><!-- #result -->
    </div><!-- .demo-left -->

    <div class="demo-right">
      <div id="supportHeading" class="support-heading">
        <h2>Browser Support</h2>
      </div>

      <div id="support" class="support">
        <?php include "includes/support-widget.php" ?>
      </div><!-- #support -->

    </div><!-- .demo-right -->

  </div><!-- demo / support wrapper -->

  <div class="globalwidth infoboxes ext">

    <div id="polyfills" class="polyfills">
      <h2>Tools / Polyfills</h2>
      <p><?php include "includes/features/" . $proptitlestr . "/polyfills.html"; ?></p>
    </div><!-- #polyfills -->
    
    <div id="tutorials" class="tutorials">
      <h2>Tutorials / Articles</h2>
      <p><?php include "includes/features/" . $proptitlestr . "/tutorials.html"; ?></p>
    </div><!-- #tutorials -->

  </div><!-- .infoboxes -->

  <iframe class="ap" id="ap" src="includes/bsa.html" scrolling="no" title="Ads by Carbon"></iframe> <!-- .ap -->

  <footer>

    <div class="globalwidth">
      <p>If you have any corrections or suggestions, open an issue <a href="https://github.com/impressivewebs/CSS3-Click-Chart">on the GitHub page</a></p>

      <p class="cr">Copyright &copy; 2011 - <?php echo Date('Y'); ?> by <a href="https://www.impressivewebs.com">Louis Lazaris</a> | <a href="https://twitter.com/ImpressiveWebs">Follow me on Twitter</a> | See also: <a href="https://cssvalues.com">CSS Values</a></p>
    </div><!-- .footer-inside -->

  </footer>

<!--build:js js/general.min.js -->
<script src="js/general.js" async></script>
<!-- endbuild -->

<script>
  var _gaq = [['_setAccount', 'UA-1965499-10'], ['_trackPageview']];
  (function(d, t) {
    var g = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    g.async = true;
    g.src = ('https:' == location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g, s);
  })(document, 'script');
</script>
</body>
</html>