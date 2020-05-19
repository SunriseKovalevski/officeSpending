({	init : function(component, event, helper) {
    	var navService = component.find("navService");
    	var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__ExpensesPage'
            },
            state: {
                c__empiduser: '',
            }
        };
    	component.set("v.pageReference", pageReference);
    	var defaultUrl = "#";
    	navService.generateUrl(pageReference)
        	.then($A.getCallback(function(url) {
                component.set("v.url", url ? url : defaultUrl);
            	}), $A.getCallback(function(error) {
                component.set("v.url", defaultUrl);
            })
            );
	},
  
	myAction : function(component, event, helper) {
		
	},
  
    loginPage :function(component, event, helper) {
        console.log('kek');
        helper.loginPage(component, event, helper);
        
    }
})