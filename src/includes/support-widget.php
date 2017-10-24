<?php
$sf = '';

if (!isset($proptitlestr)) {
  $proptitlestr = $_GET['url'];
}
switch ($proptitlestr) {

  case 'box-sizing':
    $sf = 'css3-boxsizing';
    break;

  case 'hsla':
    $sf = 'css3-colors';
    break;

  case 'text-shadow':
    $sf = 'css-textshadow';
    break;

  case 'word-wrap':
  case 'overflow-wrap':
    $sf = 'wordwrap';
    break;

  case 'hsla-rgba':
    $sf = 'css3-colors';
    break;

  case '2d-transforms':
  case 'transform-origin':
    $sf = 'transforms2d';
    break;

  case 'border-radius':
    $sf = 'border-radius';
    break;

  case 'multiple-backgrounds':
    $sf = 'multibackgrounds';
    break;

  case 'keyframe-animations':
    $sf = 'css-animation';
    break;

  case 'background-size':
  case 'background-clip':
  case 'background-origin':
    $sf = 'background-img-opts';
    break;

  case 'reflections':
    $sf = 'css-reflections';
    break;

  case 'opacity':
    $sf = 'css-opacity';
    break;

  case 'resize':
    $sf = 'css-resize';
    break;

  case 'font-face':
    $sf = 'fontface';
    break;

  case 'box-shadow':
    $sf = 'css-boxshadow';
    break;

  case 'gradients':
    $sf = 'css-gradients';
    break;

  case 'border-image':
    $sf = 'border-image';
    break;

  case 'text-stroke':
    $sf = 'text-stroke';
    break;

  case 'media-queries':
    $sf = 'css-mediaqueries';
    break;

  case 'multiple-columns':
    $sf = 'multicolumn';
    break;

  case 'media-queries':
    $sf = 'css-mediaqueries';
    break;

  case 'selection-color':
    $sf = 'css-selection';
    break;

  case 'space-round':
    $sf = 'background-repeat-round-space';
    break;

  case 'transitions':
    $sf = 'css-transitions';
    break;

  case 'calc':
    $sf = 'calc';
    break;

  case 'regions':
    $sf = 'css-regions';
    break;

  case 'flexbox':
    $sf = 'flexbox';
    break;

  case 'masks':
    $sf = 'css-masks';
    break;

  case 'tab-size':
    $sf = 'css3-tabsize';
    break;

  case 'paged-media':
    $sf = 'css-paged-media';
    break;

  case '3d-transforms':
    $sf = 'transforms3d';
    break;

  case 'grid-layout':
    $sf = 'css-grid';
    break;

  case 'pointer-events':
    $sf = 'pointer-events';
    break;

  case 'text-overflow':
    $sf = 'text-overflow';
    break;

  case 'conditional-supports':
    $sf = 'css-featurequeries';
    break;

  case 'caret-color':
    $sf = 'css-caret-color';
    break;

  case 'cursors':
    $sf = 'css3-cursors';
    break;

  case 'hyphenation':
    $sf = 'css-hyphens';
    break;

  case 'exclusions':
    $sf = 'css-exclusions';
    break;

  case 'currentcolor':
    $sf = 'currentcolor';
    break;

  case 'filters':
    $sf = 'css-filters';
    break;

  case 'cssom':
    $sf = 'default';
    break;

  case 'marquee':
    $sf = 'default';
    break;

  case 'rem-units':
    $sf = 'rem';
    break;

  case 'variables':
    $sf = 'css-variables';
    break;

  case 'blending-modes':
    $sf = 'css-mixblendmode';
    break;

  case 'canvas-backgrounds':
    $sf = 'default';
    break;

  case 'template-layout':
    $sf = 'default';
    break;

  case 'bg-local':
    $sf = 'background-attachment';
    break;

  case 'object-fit-position':
    $sf = 'object-fit';
    break;

  case 'unset':
    $sf = 'css-unset-value';
    break;

  case 'touch-action':
    $sf = 'css-touch-action';
    break;

  case 'clip-path':
    $sf = 'css-clip-path';
    break;

  case 'will-change':
    $sf = 'will-change';
    break;

  case 'text-decoration':
    $sf = 'text-decoration';
    break;

  case 'scroll-behavior':
    $sf = 'css-scroll-behavior';
    break;

  case 'user-select':
    $sf = 'user-select-none';
    break;

  case 'image-rendering':
    $sf = 'css-crisp-edges';
    break;

  case 'image-orientation':
    $sf = 'css-image-orientation';
    break;

  case 'appearance':
    $sf = 'css-appearance';
    break;

  case 'viewport':
    $sf = 'css-deviceadaptation';
    break;

  case 'viewport-units':
    $sf = 'viewport-units';
    break;

  case 'box-decoration-break':
    $sf = 'css-boxdecorationbreak';
    break;

  case 'font-size-adjust':
    $sf = 'font-size-adjust';
    break;

  case 'scroll-snap-points':
    $sf = 'css-snappoints';
    break;

  case 'placeholder-shown':
    $sf = 'css-placeholder-shown';
    break;
}
?>
<p class="ciu_embed" data-feature="<?= $sf; ?>" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=<?= $sf; ?>">Can I Use <?= $sf; ?>?</a> Data on support for the <?= $proptitlestr; ?> feature across the major browsers from caniuse.com.
</p>