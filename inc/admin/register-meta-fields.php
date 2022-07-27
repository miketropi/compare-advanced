<?php 
function ca_acf_add_meta_fields_groups() {
	$fields = ca_build_compare_item_fields();
	acf_add_local_field_group([
    'key' => 'E65DC9FE-8E47-423B-ACD9-22B74ACD16B6',
		'title' => __('Compare Fields', 'compare-advanced'),
		'fields' => $fields,
		'location' => [
      [
        [
          'param' => 'post_type',
					'operator' => '==',
					'value' => 'compare-items',
        ]
      ]
    ],
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'left',
    'instruction_placement' => 'field', 
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
    'show_in_rest' => 1,
  ]);
}

add_action('acf/init', 'ca_acf_add_meta_fields_groups');