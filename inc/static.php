<?php 
/**
 * Static 
 */

function ca_enqueue_scripts() {
  wp_enqueue_style('compare-advanced-style', CA_URI . '/dist/css/compare-advanced.bundle.css', false, CA_VERSION);
  wp_enqueue_script('compare-advanced-script', CA_URI . '/dist/compare-advanced.bundle.js', ['jquery'], CA_VERSION, true);

  wp_localize_script('compare-advanced-script', 'PHP_CA_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'lang' => []
  ]);
}

add_action('wp_enqueue_scripts', 'ca_enqueue_scripts');

function ca_admin_enqueue_scripts() {
  wp_enqueue_style('compare-advanced-backend-style', CA_URI . '/dist/css/compare-advanced.backend.bundle.css', false, CA_VERSION);
  wp_enqueue_script('compare-advanced-backend-script', CA_URI . '/dist/compare-advanced.backend.bundle.js', ['jquery'], CA_VERSION, true);

  wp_localize_script('compare-advanced-script', 'PHP_CA_DATA', [
    'ajax_url' => admin_url('admin-ajax.php'),
    'lang' => []
  ]);
}

add_action('admin_enqueue_scripts', 'ca_admin_enqueue_scripts');