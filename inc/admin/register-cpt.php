<?php 
/**
 * Register custom post type
 */

function ca_register_compare_items_cpt() {
  $compare_items_args = apply_filters('ca/reigister_cpt_compare_items_args_hook', [
    'label' => __('Compare Items', 'compare-advanced'),
    'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'query_var' => true,
    'capability_type'    => 'post',
    'has_archive' => false,
    'hierarchical' => false,
    'menu_position' => 20,
    'supports' => ['title', 'author', 'thumbnail'],
    'menu_icon' => 'dashicons-block-default',
  ]);

  register_post_type('compare-items', $compare_items_args);
}

add_action('init', 'ca_register_compare_items_cpt');