<?php 
/**
 * Shortcode 
 */

function ca_shortcode_compare_advanced_func($atts) {
  $a = shortcode_atts([
    'compare_items' => '',
    'limit_compare_fields' => '',
    'extra_class' => '',
  ], $atts);

  // $result = ca_get_compare_items(explode(',', $a['compare_items']));
  // var_dump($a);
  if(empty($a)) return;
  ob_start();
  ?>
  <div 
    class="compare-advanced-container <?php echo $a['extra_class'] ?>" 
    data-compare-items="<?php echo $a['compare_items'] ?>" 
    data-limit-compare-fields="<?php echo $a['limit_compare_fields'] ?>">
    <!-- React render content -->
  </div> <!-- .compare-advanced-container -->
  <?php
  return ob_get_clean();
}

add_shortcode('compare_advanced', 'ca_shortcode_compare_advanced_func');