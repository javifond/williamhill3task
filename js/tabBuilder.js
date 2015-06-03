	/*
	* Name: tabBuilder
	* Description: Build tabs from a receive JSON.
	*/

;( function( window ) {
	/*
	* Name: tabBuilder
	* Description: Start processing data sent by server and hide spin loader.
	* Paramenters:
	* response: (httpRequest.responseText) server response
	*/

	function tabBuilder (response) {
		// Parse JSON string into object
		var actual_JSON = JSON.parse(response);
		this._init(actual_JSON);
		document.getElementById('loaderContainer').setAttribute('hidden', 'true');
	}

	/*
	* Name: _init
	* Description: Get main navigation element from the DOM to start adding first level tasbs
	* Paramenters:
	* json: (JSON) data in JSON format
	*/

	tabBuilder.prototype._init = function (json) {

		var navBar = document.getElementById('mainTabList');
		this._appendElements(navBar, json.menu);
	};

	/*
	* Name: _createTabs
	* Description: Create li elements, setting id and css class attributes,
	* according to json 'menu' key, return a single li element.
	* Paramenters:
	* descriptor: (JSON) data in JSON format
	*/

	tabBuilder.prototype._createTabs = function (descriptor) {

		var element = document.createElement('a'),
				li = document.createElement('li'),
				ul;

		if ( descriptor.id ) {
			element.id = descriptor.id;
		}

		if ( descriptor.cssClass ) {
			element.className = descriptor.cssClass;
		}

		if ( descriptor.description ) {
			element.innerHTML = descriptor.description;
		}

		li.appendChild(element);

		if (!descriptor.leaf) {
			ul = document.createElement('ul');

			this._appendElements(ul, descriptor.menu);
			li.appendChild(ul);
		}

		return li;
	};

	/*
	* Name: _appendElements
	* Description: Loop into pass object and add to pass parent
	* Paramenters:
	* parent: (HTML tag) where li elements are gonna be added
	* obj: (object) node data
	*/

	tabBuilder.prototype._appendElements = function (parent, obj) {
		var i,
				length = obj.length;

		for (i = 0; i < length; i++) {
			parent.appendChild(this._createTabs(obj[i]));
		}
	};

	// Add to global namespace
	window.tabBuilder = tabBuilder;

})( window );