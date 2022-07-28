<?php 
/**
 * Ajax 
 */

function ca_ajax_get_compare_items() {
  $result = ca_prepare_compare_table_data($_POST['args']['ids']);
  wp_send_json($result);
}

add_action('wp_ajax_ca_ajax_get_compare_items', 'ca_ajax_get_compare_items');
add_action('wp_ajax_nopriv_ca_ajax_get_compare_items', 'ca_ajax_get_compare_items');