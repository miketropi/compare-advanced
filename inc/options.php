<?php 
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page([
    'page_title' 	=> 'Compare Settings',
		'menu_title'	=> 'Settings',
		'menu_slug' 	=> 'compare-advanced-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false,
    'parent_slug' => 'edit.php?post_type=compare-items',
  ]);
}