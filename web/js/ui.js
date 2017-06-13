/* global app - user interface */
app.ui = {
	
  // Custom handling of dismissible alert - hide instead of removing
  addAlertDismissHandler: function() {
	$("[data-close]").on("click", function(e){
		e.preventDefault();
		var d = $(this).closest("." + $(this).attr("data-close"));
		d.removeClass("alert-danger");
		d.removeClass("alert-warning");
		d.removeClass("alert-success");
		d.removeClass("alert-info");
		d.parent().hide();
		uniface.getInstance(app.alertPage).activate("clearMessage");
   	});
  },

  // Add suitable class to Alert message
  initialize: function() {
	  app.ui.addAlertDismissHandler();
  },
  
  formatAlert: function(msgType, elarea, wrapper) {
	switch(msgType) {
		case 'E': 
			wrapper.setProperty("html:class", "alert alert-danger alert-dismissible fade in");
			break;
		case 'I':
			wrapper.setProperty("html:class", "alert alert-info alert-dismissible fade in");
			break;
		case 'W':
			wrapper.setProperty("html:class", "alert alert-warning alert-dismissible fade in");
			break;
		case 'S':
			wrapper.setProperty("html:class", "alert alert-success alert-dismissible fade in");
			break;
	}
	elarea.setProperty("style:display", "block");
  },

  showError: function(msg) {
      console.error(msg);
	  uniface.getInstance(app.alertPage).activate("showError", msg);
  },

  makeNavActive: function() {
  	$('#nav li.active').removeClass('active');
	$(document.activeElement).addClass('active');
  },
  
  modalHide: function() {
  	$('#modal').modal('hide');
  },
  
  modalShow: function() {
  	$('#modal').modal('show');
  },
  
  getPlatform: function() {
  	if (typeof device !== 'undefined') {
		return device.platform;
	} else {
		return 'browser';
	}

  }
  
};
