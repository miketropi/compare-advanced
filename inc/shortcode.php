<?php 
/**
 * Shortcode 
 */

function ca_shortcode_compare_advanced_func($atts) {
  $a = shortcode_atts([
    'compare_items' => '',
    'limit_compare_fields' => '',
    'row_color_1' => '#D0D6DF',
    'row_color_2' => '#BDC6D4',
    'button_color_ide' => '#E6E6E6',
    'button_color_text_ide' => '#525252',
    'button_color_hover' => '#C0C2AD',
    'button_color_text_hover' => '#FFF',
    'extra_class' => '',
  ], $atts);

  if(empty($a)) return;
  ob_start();
  ?>
  <div 
    class="compare-advanced-container <?php echo $a['extra_class'] ?>" 
    data-row-color-first="<?php echo $a['row_color_1'] ?>"
    data-row-color-second="<?php echo $a['row_color_2'] ?>"
    data-button-color-ide="<?php echo $a['button_color_ide'] ?>"
    data-button-color-text-ide="<?php echo $a['button_color_text_ide'] ?>"
    data-button-color-hover="<?php echo $a['button_color_hover'] ?>"
    data-button-color-text-hover="<?php echo $a['button_color_text_hover'] ?>"
    data-compare-items="<?php echo $a['compare_items'] ?>" 
    data-limit-compare-fields="<?php echo $a['limit_compare_fields'] ?>">
    <!-- React render content -->
  </div> <!-- .compare-advanced-container -->
  <?php
  return ob_get_clean();
}

add_shortcode('compare_advanced', 'ca_shortcode_compare_advanced_func');