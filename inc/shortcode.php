<?php 
/**
 * Shortcode 
 */

function ca_shortcode_compare_advanced_func($atts){
  $a = shortcode_atts([
    'compare_items' => '',
    'extra_class' => '',
  ], $atts);

  // $result = ca_get_compare_items(explode(',', $a['compare_items']));
  if(empty($a)) return;
  ob_start();
  ?>
  <div 
    class="compare-advanced-container <?php echo $a['extra_class'] ?>" 
    data-compare-items="<?php echo $a['compare_items'] ?>">
    <!-- React render content -->
  </div> <!-- .compare-advanced-container -->
  <?php
  return ob_get_clean();
}

add_shortcode('compare_advanced', 'ca_shortcode_compare_advanced_func');