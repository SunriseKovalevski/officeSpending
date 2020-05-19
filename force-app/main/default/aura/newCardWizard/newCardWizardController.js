({
    init: function(component, event, helper) {
        var pageReference = component.get('v.pageReference');
        console.log(pageReference.state.c__empiduser);
        console.log(pageReference.state.c__amount);
        console.log(pageReference.state.c__description);
        console.log(pageReference.state.c__tdate);
        var amountCmp = component.get('v.amount');
        component.set("v.amountValue", pageReference.state.c__amount);
        component.set("v.descriptionValue", pageReference.state.c__description);
		component.set("v.tdateValue", pageReference.state.c__tdate);
        component.set("v.empiduser", pageReference.state.c__empiduser);
        
        var navService = component.find("navService");
        navService.generateUrl(pageReference)
        	.then($A.getCallback(function(url) {
                component.set("v.url", url ? url : defaultUrl);
            	}), $A.getCallback(function(error) {
                component.set("v.url", defaultUrl);
            })
            );
    },
    
    handleSaveClick: function (component, event, helper) {
   		var pageReference = component.get('v.pageReference');
        pageReference.state.c__amount = component.get('v.amountValue');
        pageReference.state.c__description = component.get('v.descriptionValue');
        pageReference.state.c__tdate = component.get('v.tdateValue');
        console.log (''+  pageReference.state.c__amount + ' ' + pageReference.state.c__description+ ' ' + pageReference.state.c__tdate);
        var action = component.get('c.saveCard');
        action.setParams(
        {
        	"userEmail": pageReference.state.c__empiduser,
            "amountValue": pageReference.state.c__amount,
            "descriptionValue": pageReference.state.c__description,
            "tdateValue": pageReference.state.c__tdate
        }
        );
        action.setCallback(this, function(a){
            console.log('message from new wizard card Controller 1' + a.getReturnValue());
                      
        });
        $A.enqueueAction(action);
        
        var navService = component.find('navService');
        var pageReference = component.get('v.pageReference');
        pageReference.attributes.componentName = 'c__ExpensesPage';
        event.preventDefault();
        
		navService.navigate(pageReference);
    },
    
    handleCancelClick : function(component, event, helper) {
        var navService = component.find('navService');
        var pageReference = component.get('v.pageReference');
        pageReference.attributes.componentName = 'c__ExpensesPage';
        event.preventDefault();
        
		navService.navigate(pageReference);
        
    },
    
	myAction : function(component, event, helper) {
		
	}
})