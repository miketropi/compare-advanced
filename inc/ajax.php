<?php 
/**
 * Ajax 
 */

function ca_ajax_get_compare_items() {
  $compareItems = ca_prepare_compare_table_data($_POST['args']['ids']);
  $compareFields = ca_table_compare_fields_register($_POST['args']['fields']);

  wp_send_json([
    'success' => true,
    'compare_items' => $compareItems,
    'compare_fields' => $compareFields,
  ]);
}

add_action('wp_ajax_ca_ajax_get_compare_items', 'ca_ajax_get_compare_items');
add_action('wp_ajax_nopriv_ca_ajax_get_compare_items', 'ca_ajax_get_compare_items');