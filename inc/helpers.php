<?php 
/**
 * Helpers
 */

function ca_get_all_items() {
  $all = get_posts([
    'post_type' => 'compare-items',
    'numberposts' => -1,
    'post_status' => 'publish',
  ]);

  if(count($all) == 0) return [];

  return array_map(function($i) {
    return $i->ID;
  }, $all);
}

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

function ca_get_post_compare_fields($post_id = null) {
  if(!$post_id) return [];
  
  $compare_fields_register = get_field('compare_fields', 'option');
  if(!$compare_fields_register || count($compare_fields_register) == 0) return [];

  return array_map(function($f) use ($post_id) {
    $f['value'] = get_field($f['name'], $post_id);
    return $f;
  }, $compare_fields_register);
}

function ca_get_compare_items($ids = []) {
  $args = [
    'include' => $ids,
    'orderby' => 'post__in',
    'post_type' => 'compare-items',
    'post_status' => 'publish'
  ];

  $result = get_posts($args);
  if(! $result || count($result) == 0) return [];

  return array_map(function($item) {
    $ID = $item->ID;
    return [
      '_key' => ca_rand_key(),
      'ID' => $ID,
      'title' => $item->post_title,
      'featured_image' => get_the_post_thumbnail_url($ID, 'full'),
      'brand_image' => get_field('brand_image', $ID),
      'brand_name' => get_field('brand_name', $ID),
      'product_code' => get_field('product_code', $ID),
      'product_gallery' => get_field('product_gallery', $ID),
      'compare_fields' => ca_get_post_compare_fields($ID),
    ];
  }, $result);
}

function ca_compare_item_render_html_by_type($field) {
  $_html = '';

  switch($field['type']) {
    case 'text':
      $_html = wpautop(!empty($field['value']) ? $field['value'] : 'N/A');
      break;

    case 'image':
      if(!$field['value']) {
        $_html = wpautop('N/A');
      } else {
        $_html = '<img src="'. $field['value']['url'] .'" alt="" />';
      }
      break;

    case 'wysiwyg':
      $_html = wpautop(!empty($field['value']) ? $field['value'] : 'N/A');
      break;
    
    case 'gallery':
      if($field['value']) {
        $_html = '<img src="'. $field['value'][0]['url'] .'" alt="" />';
      } else {
        $_html = wpautop('N/A');
      }
      break;
 
    default:
      break;
  }

  return $_html;
}

function ca_prepare_compare_table_data($ids = []) {
  $result = ca_get_compare_items($ids);
  return array_map(function($item, $_index) {
    $compare_item_data = [
      '__config' => [
        '_key' => $item['_key'],
        'ID' => $item['ID'],
        'pin' => ($_index == 0 ? true : false), // false,
      ],
      'brand_logo' => [
        '_name' => 'brand_logo',
        '_key' => ca_rand_key(),
        '_html' => '<img src="'. $item['brand_image']['url'] .'" alt="'. $item['brand_name'] .'"/>',
        'extra_params' => [],
        'extra_class' => '__product-brand',
      ],
      'infomation' => [
        '_name' => 'infomation',
        '_key' => ca_rand_key(), 
        '_html' => '<img src="'. $item['featured_image'] .'" alt="'. $item['title'] .'"/> <p>'. $item['product_code'] .'</p>',
        'extra_params' => [
          'type' => 'gallery',
          'value' => $item['product_gallery'],
        ],
        'extra_class' => '__product-info',
      ],
    ];

    if($item['compare_fields'] && count($item['compare_fields']) > 0) {
      foreach($item['compare_fields'] as $_index => $f) {
        
        $compare_item_data[$f['name']] = [
          '_name' => $f['name'],
          '_key' => ca_rand_key(),
          '_html' => ca_compare_item_render_html_by_type($f),
          'extra_params' => $f,
          'extra_class' => '',
        ];
      }
    }

    return $compare_item_data;
  }, $result, array_keys($result));
}

function ca_rand_key($prefix = 'key_') {
  return $prefix . substr(md5(uniqid(mt_rand(), true)) , 0, 8);
}

function ca_table_compare_fields_register($limitFields = []) {
  $compare_fields = get_field('compare_fields', 'option');
  $fields = [
    [
      '_key' => ca_rand_key(),
      'visible' => true,
      'image_label' => '',
      'label' => false,
      'help_text' => '',
      'enable_help_text' => false,
      'field_map' => 'brand_logo',
      'extra_class' => '__no-background'
    ],
    [
      '_key' => ca_rand_key(),
      'visible' => true,
      'image_label' => '',
      'label' => __('Brand and model', 'compare-advanced'),
      'help_text' => '',
      'enable_help_text' => false,
      'field_map' => 'infomation',
    ],
  ];

  if($compare_fields && count($compare_fields) > 0) {
    foreach($compare_fields as $index => $f) {
      array_push($fields, [
        '_key' => ca_rand_key(),
        'visible' => $f['visible'],
        'image_label' => $f['image_label'], 
        'label' => $f['label'],
        'help_text' => wpautop($f['help_text']),
        'enable_help_text' => $f['enable_help_text'],
        'field_map' => $f['name'],
      ],);
    }
  }

  if(count($limitFields) > 0) {
    // wp_send_json( $limitFields );
    /**
     * Limit compare fields
     */

    array_unshift($limitFields, 'brand_logo', 'infomation');

    $new_fields = array_map(function($f) use ($fields) {
      $_key = array_search($f, array_column($fields, 'field_map'));
      return $fields[$_key];
    }, $limitFields);

    $fields = $new_fields;
  }

  return apply_filters('ca/table-compare-fields-register', $fields);
}

function ca_acf_load_limit_compare_fields_field_choices($field) {
  $compare_fields = get_field('compare_fields', 'option');
  $field['choices'] = array();
  
  foreach($compare_fields as $_index => $f) {
    $field['choices'][ $f['name'] ] = $f['label'];
  }

  return $field;
}

add_filter('acf/load_field/name=limit_compare_fields', 'ca_acf_load_limit_compare_fields_field_choices');
// add_action('init', function() {
//   var_dump(ca_build_compare_item_fields());
// });