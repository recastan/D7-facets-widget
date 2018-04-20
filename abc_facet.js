(function ($) {

  Drupal.behaviors.abcFacet = {
    attach: function (context, settings) {
      // Iterates over facet settings, applies functionality like the "Show more"
      // links for block realm facets.
      // @todo We need some sort of JS API so we don't have to make decisions
      // based on the realm.
      if (settings.facetapi) {
        for (var index in settings.facetapi.tfacets) {
          if (null != settings.facetapi.tfacets[index]) {            
            makeCheckbox(settings.facetapi.tfacets[index]);
          }
        }
      }
    }
  }

  /**
   * Class containing functionality for Facet API.
   */
  Drupal.abcFacet = {}

  /**
   * Constructor for the facetapi redirect class.
   */
  Drupal.abcFacet.Redirect = function (href) {
    this.href = href;
  }

  /**
   * Method to redirect to the stored href.
   */
  Drupal.abcFacet.Redirect.prototype.gotoHref = function () {
    window.location.href = this.href;
  }

  /**
   * Disable all facet links and checkboxes in the facet and apply a 'disabled'
   * class.
   */
  Drupal.abcFacet.disableFacet = function ($facet) {
    $facet.addClass('facetapi-disabled');
    $('a.facetapi-checkbox').click(Drupal.facetapi.preventDefault);
    $('input.facetapi-checkbox', $facet).attr('disabled', true);
  }

  /**
   * Event listener for easy prevention of event propagation.
   */
  Drupal.abcFacet.preventDefault = function (e) {
    e.preventDefault();
  }

  /**
   * Replace an unclick link with a checked checkbox.
   */
  function makeCheckbox(id) {
    var $link = $(id),
      active = $link.hasClass('facetapi-active');

    if (!active && !$link.hasClass('facetapi-inactive')) {
      // Not a facet link.
      return;
    }

    // Derive an ID and label for the checkbox based on the associated link.
    // The label is required for accessibility, but it duplicates information
    // in the link itself, so it should only be shown to screen reader users.
    var id = id + '--checkbox',
      description = $link.html(),
      label = $('<label class="element-invisible" for="' + id + '">' + description + '</label>'),
      checkbox = $('<input type="checkbox" class="facetapi-checkbox" id="' + id + '" />'),
      // Get the href of the link that is this DOM object.
      href = $link.attr('href'),
      redirect = new Drupal.abcFacet.Redirect(href);


    checkbox.click(function (e) {
      Drupal.abcFacet.disableFacet($link.parents('ul'));
      redirect.gotoHref();
    });
    $link.before(label).before(checkbox);

    if (active) {
      checkbox.attr('checked', true);
    }
    else {
      $link.before(label).before(checkbox);
    }
  }

})(jQuery);
