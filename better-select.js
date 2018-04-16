/**
 * Better Select (Copyright 2018 Richard Hedges)
 * License: MIT License (https://github.com/richardhedges/Better-Select/blob/master/LICENSE)
 * 
 * Provides a better select with added features,
 * including live search and multiple levels of optgroup
 * 
 * @constructor
 *
 * @param {string} inputClass [Default: ""]
 *   Specify the classes for the input search field
 *
 * @param {string} inputPlaceholder [Default: "Type here..."]
 *   Specify the placeholder for the input search field
 *
 * @param {integer} listMaxHeight [Default: 0]
 *   Set a maximum height for the results list
 *   For dynamic height, set to 0
 *
 * @param {integer} listSpace [Default: 10]
 *   Offsets the results list from the search field
 *
 * @param {boolean} inline [Default: false]
 *   When set to true the results list will appear inline with content
 *
 * @param {callback} selectedOption
 *   Specify a callback method to fire when an option is selected
 *   Method args:
 *      option - The options jQuery object
 * 
 */
(function($) {
  
  $.fn.betterSelect = function(options) {
    
    var settings = $.extend({
      inputClass: '',
      inputPlaceholder: 'Type here...',
      listMaxHeight: 0,
      listSpace: 10,
      inline: false,
      paddingBottom: 0,
      selectedOption: function() { },
      selectedDisabledOption: function() {}
    }, options);
    
    var betterSelects = [];
    
    $(this).each(function() {
      
      var betterSelectID = betterSelects.length + 1;
      
      betterSelects[betterSelectID] = {};
      
      $(this).wrap('<div id="better-select-' + betterSelectID + '" class="better-select" />');
      var select = $(this).parent('.better-select');
      
      $(select).append('<input class="search-field ' + settings.inputClass + '" type="text" placeholder="' + settings.inputPlaceholder + '">');
      
      var maxHeight = $(select).offsetParent().height();
      
      if (settings.listMaxHeight > 0) {
        maxHeight = settings.listMaxHeight;
      } else {
        maxHeight -= ($(select).height() + settings.listSpace + settings.paddingBottom);
      }
      
      var listStyles = [
        { key: 'max-height', val: maxHeight + 'px' },
        { key: 'margin-top', val: settings.listSpace + 'px' }
      ].map(function(style) {
        return style.key + ':' + style.val;
      }).join(';');
      
      var listClasses = '';
     
      if (settings.inline) {
        listClasses = 'inline';
      }
      
      $(select).append('<ul class="options-list ' + listClasses + '" style="' + listStyles + '"></ul>');
      var optionsList = $('.options-list', select);
      
      var option, currentLevel, topLevel, tempLevel = null;
      
      $('> optgroup', this).each(function() {
        
        tempLevel = $('<li class="title"><strong>' + $(this).attr('label') + '</strong><ul></ul></li>');
        
        if (typeof $(this).attr('data-level') != 'undefined' && $(this).attr('data-level') == 'top') {
          $(optionsList).append(tempLevel);
          topLevel = $('> ul', tempLevel);
        } else {
          $(topLevel).append(tempLevel);
        }
        
        currentLevel = $('> ul', tempLevel);
        
        $('> option', this).each(function() {
          
          var dataAtts = '';
          
          if (typeof $(this).attr('value') != 'undefined') {
            dataAtts += ' data-value="' + $(this).attr('value') + '"';
          }
          
          $.each($(this).data(), function(index, value) {
            dataAtts += ' data-' + index + '="' + value + '"';
          });
          
          option = $('<li' + dataAtts + '>' + $(this).text() + '</li>');
          currentLevel.append(option);
          
        });
        
        
      });
      
    });
    
    $('body').on('keyup', '.better-select .search-field', function() {
      
      var betterSelect = $(this).parents('.better-select');
      var searchTerm = $(this).val().trim();
      
      openBetterSelect(betterSelect);
      
      if (searchTerm === '') {
        
        $(this).val('');
        $('.options-list li:not(.title)', betterSelect).show();
        
      } else {

        $('.options-list li.title', betterSelect).each(function(index, parent) {

          var allHidden = false;
        
          $('li:not(.title)', parent).each(function() {

            if ($(this).text().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
              allHidden = false;
              $(this).show();
            } else {
              $(this).hide();
            }

          });

          if (allHidden) {
            $(parent).hide();
          } else {
            $(parent).show();
          }

        });
        
      }
      
    });
    
    $('body').on('click', '.better-select .options-list li:not(.title)', function() {

      if ($(this).hasClass('disabled')) {
        settings.selectedDisabledOption(this);
      } else {
        $(this).toggleClass('selected');
        settings.selectedOption(this);
      }
      
    });
    
    $('body').on('focus', '.better-select .search-field', function() {      
      openBetterSelect($(this).parents('.better-select'));
    });
    
    $(document).on('click', function(event) {
      
      if (!$(event.target).parents('.better-select.active').length && $('.better-select.active').length) {
        closeBetterSelect($('.better-select.active'));
      }
      
    });
    
    function openBetterSelect(select) {
      
      if ($(select).length) {
        $('.options-list', select).show();
        $(select).addClass('active');
      }
      
    }
    
    function closeBetterSelect(select) {
      
      if ($(select).length) {
        $('.options-list', select).hide();
        $(select).removeClass('active');
      }
      
    }
    
  };
  
}(jQuery));