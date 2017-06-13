/* Global JavaScript */
var app = {
  alertPage:      "BOOTALERT", // Alert notification DSP
  homePage:       "BOOTHOME",  // home page loaded inside mainPage
  mainPage:       "BOOTMAIN",  // The main DSP
  menuPage:       "BOOTNAV",   // The Navigation controller
  menuInstance:   null,        // Navigation Page instance

  //TODO: Get and set menuPage
  getMenuInstance: function() {
	  return menuInstance;
  },
  setMenuInstance: function(menuInstance) {
	this.menuInstance = menuInstance;
  },

  showLogin: function() {
	uniface.getInstance(app.mainPage).activate("showLogin");
  },
  
  // Simpler implementation than WebFramework project, but have maintained parameter compatibility
  showScreen: function(
	resourceName, //The resource to navigate to
    action,       //The action we're opening on the resource (operation)
    param,        //Param needed to identify a record (e.g. on a "detail" action)
    options       //Object containing options that will be passed to the DSP
  ) {
    "use strict";

    var updateState,
    refreshPage,
    resource,
    dspToShow,
    instanceToShow,
    optionString,
    instance,
    stashedOptions,
    attrName,
    state,
	p;

    options     = (typeof options             === "undefined") ? {}              : options;
    refreshPage = (typeof options.refreshPage === "undefined") ? false           : options.refreshPage;
	dspToShow = app._getResource(resourceName, action);
	if (dspToShow === undefined) {
		//TODO: Proper way to report errors arising from JavaScript code like this
		console.error("resourceName ' + resourceName + ' dspToShow undefined");
		//instanceToShow = app.homePage;
	} else {
		instanceToShow = dspToShow;
	}

    //Push the param passed in on the URL to the options object, this then gets
    //passed to the DSP we're starting
    options.param = param;

    //Convert options object in to a string so it can be passed to Uniface
    optionString = JSON.stringify(options);
    //TODO: if this errors then something dodgy was passed in, raise an appropriate exception

    //Call the menu so it can do any presentation work (like highlighting the option we just clicked)
    //app.menuInstance.activate("navigationShowScreen", resourceName).then(function(){

      instance = uniface.getInstance(instanceToShow);
      if (instance === null) {
        //We don't have this DSP in the browser yet, go and create it
        p = app._showNewScreen(dspToShow, instanceToShow, optionString)
      } else {
        //We already have this instance loaded, call appropriate DSP lifecycle operations and redisplay it.
        p = app._showExistingScreen(instance, instanceToShow, optionString, refreshPage)
      }

	  /*
      //Only one of the operations above will have been called and p is the promise it returned
      p.then(function(){
        //Assign to the DSP container
        //Call the menu so it can do any presentation work required (like sliding the newly loaded DSP into view)
        app.menuInstance.activate("postDspSetup", resourceName, instanceToShow);
        app.currentDsp = instanceToShow;
      });
    });
	  */
  },
  
    //Show a screen that hasn't be loaded into the browser yet
  _showNewScreen: function(dspToShow,
    instanceToShow,
    optionString
  ) {

    //Make the call to create the new DSP instance (was appCreate)
    var p = uniface.createInstance(
      dspToShow, //Component Name
      instanceToShow, //Instance Name
      "appCreate", //Operation Name
      optionString //Parameters
	).then(function () {
	  app._setPage(instanceToShow);
    });

    return p;
  },

  //We already have this instance loaded, call appropriate DSP lifecycle operations and redisplay it.
  _showExistingScreen: function(instance, instanceToShow, optionString, refreshPage) {
    //If we've been asked to, call the refresh operations, otherwise run the setup operations
	if (refreshPage) {
	  if (instance.app.hasRefresh) {
		//We have a refresh operation defined so call it, appRefresh will in turn call refreshJs if it's defined
		p = instance.activate("appRefresh", optionString);
	  } else if (instance.app.hasRefreshJs) {
		//We only have a refreshJs operation defined, so call this directly
		p = instance.activate("refreshJs", optionString);
	  }
	} else {
	  //Call setup operations
	  if (instance.app.hasSetup) {
		//We have a setup operation defined so call it, appSetup will in turn call setupJs if it's defined
		p = instance.activate("appSetup", optionString);
	  } else if (instance.app.hasSetupJs) {
		//We only have a setupJs operation defined, so call this directly
		p = instance.activate("appSetupJs", optionString);
	  }
	}
    app._setPage(instanceToShow);
	
    if(typeof p === "undefined") {
      //If we didn't call any of the operations above then simply pass back a resolved promise.
      p = Promise.resolve();
    }

    return p;
  },
  
  _setPage: function(instanceToShow) {
      //Assign to the DSP container
      var cOcc = app.menuInstance.getEntity("FORM.UI").getOccurrence(0);
      cOcc.getField("CONTAINER").setValue(instanceToShow);
  },

  _getResource(resourceName, action) {
		var dspToShow;
	    switch (resourceName) {
		case 'home':
			dspToShow = "BOOTMAIN";
			break;
		case 'users':
			switch(action) {
				case 'detail':
				case 'new':
					//dspToShow = "APP_USER_DETAIL";
					dspToShow = "BOOTUSER";
					break;
				default:
					dspToShow = "APP_USERS";
			}
			break;
		default:
			dspToShow = resourceName;
	}
	return dspToShow;
  }

};
