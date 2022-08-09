<?php 
/**
 * ACF Gutenberg Block Register 
 * 
 */

add_action('acf/init', function() {
	if( !function_exists('acf_register_block') ) return;

	acf_register_block([
		'mode' => 'edit',
		'name' => 'compare_advanced',
		'title' => __('Compare Advanced', 'compare-advanced'),
		'description' => __('Compare table block.', 'compare-advanced'),
		'render_callback'	=> 'ca_compare_advanced_block_html',
		'keywords' => ['compare'],
	]);

	acf_register_block([
		'mode' => 'edit',
		'name' => 'ca_image_block',
		'title' => __('Image Block (CA)', 'compare-advanced'),
		'description' => __('Image block.', 'compare-advanced'),
		'render_callback'	=> 'ca_image_block_html',
		'keywords' => ['image'],
	]);

	acf_register_block([
		'mode' => 'edit',
		'name' => 'ca_blog_posts',
		'title' => __('Blog Posts (CA)', 'compare-advanced'),
		'description' => __('Blog posts block.', 'compare-advanced'),
		'render_callback'	=> 'ca_blog_posts_html',
		'keywords' => ['blog', 'posts'],
	]);
});

function ca_compare_advanced_block_html() {
  $items = get_field('compare_items');
	$limit_compare_fields = get_field('limit_compare_fields');
	$extra_class = get_field('extra_class');

	// Colors 
	$row_color_1 = get_field('row_color_1');
	$row_color_2 = get_field('row_color_2');
	$button_color_ide = get_field('button_color_ide');
	$button_color_text_ide = get_field('button_color_text_ide');
	$button_color_hover = get_field('button_color_hover');
	$button_color_text_hover = get_field('button_color_text_hover');

	$limit_fields =  $limit_compare_fields ? implode(',', $limit_compare_fields) : '';
	
  echo do_shortcode('[compare_advanced 
		compare_items="'. implode(',', $items) .'" 
		limit_compare_fields="'. trim($limit_fields) .'" 
		row_color_1="'. $row_color_1 .'" 
		row_color_2="'. $row_color_2 .'" 
		button_color_ide="'. $button_color_ide .'" 
		button_color_text_ide="'. $button_color_text_ide .'" 
		button_color_hover="'. $button_color_hover .'" 
		button_color_text_hover="'. $button_color_text_hover .'" 
		extra_class="'. $extra_class .'" ]');
} 

function ca_image_block_html() {
	$image = get_field('image');
	$label = get_field('label');
	$url = get_field('url');
  $custom_class = get_field('custom_class');
	?>
	<div class="ca-image-block <?php echo $custom_class; ?>">
		<div class="image-layer" style="background: url(<?php echo $image['url'] ?>) no-repeat center center / cover, #333;"></div>
		<div class="ca-image-block--inner">
			<a href="<?php echo $url; ?>"><?php echo $label; ?></a>
		</div>
	</div>
	<?php 
}

function ca_blog_posts_html() {
	$number_posts = get_field('number_posts');
	$custom_class = get_field('custom_class');

	$posts = get_posts([
		'numberposts' => $number_posts,
		'post_type' => 'post',
		'post_status' => 'publish',
	]);

	if(!$posts && count($posts) <= 0) return;
	?>
	<div class="ca-blog-posts-block">
		<ul>
			<?php foreach($posts as $index => $p) : ?>
			<li>
				<?php // var_dump($p); ?>
				<a class="__thumb" href="<?php echo get_the_permalink($p->ID); ?>">
					<?php echo get_the_post_thumbnail($p->ID, 'post-thumbnail') ?>
				</a>
				<h4 class="__title">
					<a href="<?php echo get_the_permalink($p->ID); ?>">
						<?php echo $p->post_title; ?>
					</a>
				</h4>
			</li>
			<?php endforeach; ?>
		</ul>
	</div>
	<?php
}