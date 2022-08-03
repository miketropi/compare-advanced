<?php 
/**
 * ACF Gutenberg Block Register 
 * 
 */
if( function_exists('acf_register_block') ) {
	
	$result = acf_register_block(array(
    'mode' => 'edit',
		'name' => 'compare_advanced',
		'title' => __('Compare Advanced', 'compare-advanced'),
		'description' => __('Compare table block.', 'compare-advanced'),
		'render_callback'	=> 'ca_compare_advanced_block_html',
		//'category' => '',
		//'icon' => '',
		'keywords' => ['compare'],
	));
}

function ca_compare_advanced_block_html() {
  $items = get_field('compare_items');
  $extra_class = get_field('extra_class');
  echo do_shortcode('[compare_advanced compare_items="'. implode(',', $items) .'" extra_class="'. $extra_class .'" ]');
}