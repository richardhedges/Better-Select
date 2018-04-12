# Better-Select `(jQuery)`

Provides a better select with added features, including live search and multiple levels of optgroup.

#### Usage Example

```
$('select').betterSelect({
	inputClass: 'form-control',
    selectedOption: function(option) {
    	
        alert('You have selected ' + $(option).text());
        
    }
});
```


#### Paramaters

```
var args = {
    inputClass: '',						// Specify the classes for the input search field
    inputPlaceholder: 'Type here...',	// Specify the placeholder for the input search field
    listMaxHeight: 0,					// Set a maximum height for the results list
    									// Default is next positioned parents height
    listSpace: 10,						// Offsets the results list from the search field
    inline: false,						// When true, the results list will appear inline with content
    selectedOption: function() {}		// A callback used to trigger events when an option is selected
};
```


<br>
##### Notice

This plugin was created with two single projects in mind that required the use of multiple optgroups in multiple levels of a single select. The plugin successfully accomplishes it's intended purpose however does not yet update the selected items in the original text field. This will be added to the next update, however in the mean time you'll be required to collate the values of each `li` element with a class of `selected` as a child of `.better-select .options-list`

##### Copyright
Copyright 2018 Richard Hedges

Licensed under the [MIT License](https://github.com/richardhedges/Better-Select/blob/master/LICENSE)