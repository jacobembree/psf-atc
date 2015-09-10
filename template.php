<?php

/**
 * @file
 * Process theme data.
 *
 * Use this file to run your theme specific implimentations of theme functions,
 * such preprocess, process, alters, and theme function overrides.
 *
 * Preprocess and process functions are used to modify or create variables for
 * templates and theme functions. They are a common theming tool in Drupal, often
 * used as an alternative to directly editing or adding code to templates. Its
 * worth spending some time to learn more about these functions - they are a
 * powerful way to easily modify the output of any template variable.
 *
 * Preprocess and Process Functions SEE: http://drupal.org/node/254940#variables-processor
 * 1. Rename each function and instance of "adaptivetheme_subtheme" to match
 *    your subthemes name, e.g. if your theme name is "footheme" then the function
 *    name will be "footheme_preprocess_hook". Tip - you can search/replace
 *    on "adaptivetheme_subtheme".
 * 2. Uncomment the required function to use.
 */


/**
 * Preprocess variables for the html template.
 */
function psf_atc_preprocess_html(&$variables) {

  // Disable compatibility mode.  Not sure if this is the best place for this
  // line, but it works.
  header("X-UA-Compatible: IE=Edge");

  // Add Cycle2 plugin to front page.
  if ($variables['is_front']) {
    drupal_add_js(libraries_get_path('jquery.cycle2') . '/jquery.cycle2.js', 'file');
    drupal_add_js(libraries_get_path('jquery.cycle2.carousel') . '/jquery.cycle2.carousel.js', 'file');
  }

  // Auto-discover RSS feed.
  $element = array(
    '#tag' => 'link',
    '#attributes' => array(
      'href' => '/rss.xml',
      'rel' => 'alternate',
      'type' => 'application/rss+xml',
    ),
  );
  drupal_add_html_head($element, 'psf_atc');

  // Fix zooming of colorbox for mobile.
  drupal_add_js('
    (function ($) {
      Drupal.behaviors.psfColorbox = {
        attach: function (context, settings) {
          if (!Modernizr.touch && typeof(Drupal.settings.colorbox) != "undefined") {
            Drupal.settings.colorbox.fixed = true;
          }
        }
      };
    })(jQuery);
  ', array(
    'type' => 'inline',
    'group' => JS_LIBRARY,
  ));

}


/**
 * Process variables for the html template.
 */
/* -- Delete this line if you want to use this function
function adaptivetheme_subtheme_process_html(&$vars) {
}
// */


/**
 * Override or insert variables for the page templates.
 */
function psf_atc_preprocess_page(&$vars) {
  drupal_add_library('system', 'ui.accordion');
}
//function adaptivetheme_subtheme_process_page(&$vars) {
//}


/**
 * Override or insert variables into the node templates.
 */
/* -- Delete this line if you want to use these functions
function adaptivetheme_subtheme_preprocess_node(&$vars) {
}
function adaptivetheme_subtheme_process_node(&$vars) {
}
// */


/**
 * Override or insert variables into the comment templates.
 */
/* -- Delete this line if you want to use these functions
function adaptivetheme_subtheme_preprocess_comment(&$vars) {
}
function adaptivetheme_subtheme_process_comment(&$vars) {
}
// */


/**
 * Override or insert variables into the block templates.
 */
/* -- Delete this line if you want to use these functions
function adaptivetheme_subtheme_preprocess_block(&$vars) {
}
function adaptivetheme_subtheme_process_block(&$vars) {
}
// */

/**
 * Implements hook_js_alter().
 */
function psf_atc_js_alter(&$javascript) {
  // Disable animation of Main Menu
  $file = drupal_get_path('theme', 'psf_atc') . '/scripts/sfsmallscreen.js';
  $javascript[libraries_get_path('superfish') . '/sfsmallscreen.js'] = drupal_js_defaults($file);
}

/**
 * Implements hook_css_alter().
 */
function psf_atc_css_alter(&$css) {
  $css['misc/ui/jquery.ui.accordion.css']['data'] = drupal_get_path('theme', 'psf_atc') . '/css/jquery.ui.accordion.css';
  unset($css[drupal_get_path('theme', 'at_commerce') . '/color/colors.css']);
}

/**
 * Implements hook_form_FORM_ID_alter() for search_block_form.
 */
function psf_atc_form_search_block_form_alter(&$form, &$form_state) {
  $form['actions']['submit']['#type'] = 'image_button';
  $form['actions']['submit']['#src'] = drupal_get_path('theme', 'psf_atc') . '/images/search_btn.png';
  $form['actions']['submit']['#attributes']['alt'] = t('Go');
  unset($form['actions']['submit']['#value']);
}

