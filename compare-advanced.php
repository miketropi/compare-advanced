<?php
/*
Plugin Name: Compare Advanced
Plugin URI: #
Description: a custom plugin for project thebabyedit
Author: Beplus
Author URI: #Beplus
Text Domain: compare-advanced
Domain Path: /languages/
Version: 1.0.0
*/

{
  /**
   * Define
   */
  define('CA_VERSION', '1.0.0');
  define('CA_DIR', plugin_dir_path(__FILE__));
  define('CA_URI', plugin_dir_url(__FILE__));
}

{
  /**
   * Includes
   */
  require(CA_DIR . '/inc/options.php');
  require(CA_DIR . '/inc/static.php');
  require(CA_DIR . '/inc/helpers.php');
  require(CA_DIR . '/inc/hooks.php');
  require(CA_DIR . '/inc/ajax.php');
  require(CA_DIR . '/inc/template-tags.php');
  require(CA_DIR . '/inc/shortcode.php');
  require(CA_DIR . '/inc/guten-block.php');

  /**
   * Admin
   */
  require(CA_DIR . '/inc/admin/register-cpt.php');
  require(CA_DIR . '/inc/admin/register-meta-fields.php');
}
