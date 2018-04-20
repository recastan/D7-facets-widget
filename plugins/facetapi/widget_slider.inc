<?php

/**
 * @file
 */

/**
 * Slider widget for reko site.
 */
class FacetapiWidgetAbcCategory extends FacetapiWidgetLinks {
  /**
   * JavaScript settings.
   *
   * @var array
   */

  /**
   * Overrides FacetapiWidgetLinks::init().
   *
   * Adds additional JavaScript settings and CSS.
   */
  public function init() {
    parent::init();
    drupal_add_css(drupal_get_path('module', 'facetapi') . '/facetapi.css');
  }

  /**
   * Overrides FacetapiWidget::__construct().
   *
   * For links, it is better to use the machine name of the facet as opposed to
   * the alias for the key. Alias are usually, but not necessarily, unique. It
   * doesn't make sense to group links in the same element as they are usually
   * rendered in blocks with are separate from one another.
   */
  public function __construct($id, array $realm, FacetapiFacet $facet, stdClass $settings) {
    parent::__construct($id, $realm, $facet, $settings);
    // $this->jsSettings['limit'] = $this->settings->settings['soft_limit'];
    $this->key = $facet['name'];
  }

  /**
   * Renders .
   */
  public function execute() {
    $element = &$this->build[$this->facet['field alias']];
    $adapter = $this->build['#adapter'];
    $element = array(
      '#theme' => 'abc_facet',
      '#tree' => $element,    
      '#attached' => $this->build['#attached'],
      '#attributes' => $this->build['#attributes'],
    );  
    $element['#attached']['js'][] = drupal_get_path('module', 'abc_facet') . '/abc_facet.js';
   }
}
