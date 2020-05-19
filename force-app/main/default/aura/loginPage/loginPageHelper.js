({
	helperMethod : function() {
		
	},
    
    loginPage : function (component, event, helper) {
        console.log('kek2');
        var userEmail = component.get('v.Empiduser');
        var pass = component.get('v.Empidpwd');
		var admin = component.get('v.Admin');
        var isAdmin = false;
        
        if (userEmail != null) {
            var action = component.get('c.getContact');
            action.setParams({
                "userEmail":userEmail,
                "userpassw":pass
            });
            
            action.setCallback(this, function(a){
                var rtnValue = a.getReturnValue();
                if (a.getReturnValue() == "Admin") {
                    console.log('hi hello');
                    isAdmin = true;
                    component.set('v.Admin', isAdmin);
                };
    
                console.log('This field list is: ' +  a.getReturnValue());

                 if (isAdmin == true) {
                    var navService = component.find('navService');
                    var pageReference = component.get('v.pageReference');
                    pageReference.state.c__empiduser = userEmail;
                    pageReference.state.Admin = admin;
                    pageReference.attributes.componentName = "c__adminPage";
                    event.preventDefault();
                    navService.navigate(pageReference);
                } else {
                    var navService = component.find('navService');
                    var pageReference = component.get('v.pageReference');
                    pageReference.state.c__empiduser = userEmail;
                    console.log(' kekol '+ pageReference.state.c__empiduser);
                    pageReference.attributes.componentName = "c__ExpensesPage";
                    event.preventDefault();
                    navService.navigate(pageReference);
	            }
                console.log('vihodim ' + isAdmin);
            });
            $A.enqueueAction(action);
        
            //vihodim v sleduushuyu stranicu

        } else {
            alert('Login Field is Empty');
        }

    	} 
    
})