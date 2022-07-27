<?php 
/**
 * Helpers
 */

function ca_build_compare_item_fields() {
  $compare_fields = get_field('compare_fields', 'option');

  if(!$compare_fields || count($compare_fields) == 0) return [];

  return array_map(function($item) {
    return [
      'key' => 'key__' . $item['name'],
      'label' => $item['label'],
      'name' => $item['name'],
      'type' => $item['type'],
      // 'instructions' => $item['help_text']
    ];
  }, $compare_fields);
}

// add_action('init', function() {
//   var_dump(ca_build_compare_item_fields());
// });