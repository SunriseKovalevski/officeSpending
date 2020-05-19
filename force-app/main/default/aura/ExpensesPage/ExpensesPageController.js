({
	myAction : function(component, event, helper) {
		
	},
    
    reInit : function(component, event, helper) {
       $A.get('e.force:refreshView').fire();
    },
    
    init : function(component, event, helper) {
        var monthsNavigation = [{ "month":'January',
                                 "amount": 0}, 
                                { "month":'February',
                                 "amount": 0},
                                { "month":'March',
                                 "amount": 0},
                                { "month":'April',
                                 "amount": 0},
                                { "month":'May',
                                 "amount": 0},
                                { "month":'June',
                                 "amount": 0},
                                { "month":'July',
                                 "amount": 0},
                                { "month":'August',
                                 "amount": 0},
                                { "month":'September',
                                 "amount": 0},
                                { "month":'October',
                                 "amount": 0},
                                { "month":'November',
                                 "amount": 0},
                                { "month":'December',
                                 "amount": 0}];

        component.set('v.monthsNavigation', monthsNavigation);
        
        var cmpTable = component.get('v.gridData');
        var columns = [
            {
                type: 'text',
                fieldName: 'description',
                label: 'DESCRIPTION'
            },
            {
                type: 'currency',
                fieldName: 'amount',
                label: 'Amount',
                typeAttributes: {
                    currencyCode: 'USD',
                    currencyDisplayAs: 'symbol'
                }
            },
            {
                type: 'action',
                fieldName: 'action',
                label: 'Action',
                typeAttributes: {
                    rowActions: [
                        { label:'Show details', name: 'showDetails'},
                        { label:'Delete', name: 'delete'}   
                    ]
                    
                }
            }
        ];
        component.set('v.gridColumns', columns);   
        var pageReference = component.get('v.pageReference');
        console.log(pageReference.state.c__empiduser);
        component.set("v.Empiduser", pageReference.state.c__empiduser);
		var userEmail = component.get("v.Empiduser");
        var action1 = component.get('c.getDateList');
        action1.setParams(
            {
                "userEmail": pageReference.state.c__empiduser,
                "selectedMonth": 0
            }
        );
        action1.setCallback(this, function(a){
            console.log('message from first callback ' + a.getReturnValue());
            component.set('v.cardList', a.getReturnValue()); 
        });
        $A.enqueueAction(action1);
           
        var action = component.get('c.getExpenseForUser');
        console.log('message from Expense Page Controller 2 ' + pageReference.state.c__empiduser );
       	action.setParams(
            {
                "userEmail": pageReference.state.c__empiduser,
                "selectedMonth": 0
            }
       	);
       	action.setCallback(this, function(a){
            console.log('message from Expense Page Controller 3' + a.getReturnValue());
           var cl2 =JSON.parse(a.getReturnValue());
           
            monthsNavigation[0].amount = 0;
            var totalAmount = 0;
            var resArr = [];
            var tmpArr = [];
            var cardList3 = component.get('v.cardList');
             console.log('hello there cardList ' + cardList3 );
            for (var item1 in cardList3) {
                 console.log('hello there item1 ' + cardList3[item1] );
                resArr = [];
                totalAmount = 0;
                for (var item2 in cl2) {
                    console.log('hello there item2 ' + cl2[item2].cardDate );
                    if (cardList3[item1].includes(cl2[item2].cardDate)) {
                          resArr.push({
                            "description" : cl2[item2].description,
                            "amount" : cl2[item2].amount,
                            "tdate" : cl2[item2].cardDate
                          });
                        totalAmount += cl2[item2].amount;
                        console.log('hello there ' + cardList3[item1] + ' ' + cl2[item2]);
                    }
                 
                }
                tmpArr.push({"label": cardList3[item1],
                             "data" : resArr,
                             "totalAmount" : totalAmount
                            });
     			monthsNavigation[0].amount += totalAmount;

                console.log(' resARR ==>> ' + JSON.stringify(resArr));
            };
            
            console.log(' tmpARR ==>> ' + JSON.stringify(tmpArr));
        //    component.set('v.gridData', JSON.parse(a.getReturnValue())); 
            //console.log('gridData ' + component.get('v.gridData'));
            component.set('v.cardList', tmpArr);
   			component.set('v.monthsNavigation', monthsNavigation);
         //   console.log('  totalAmountPerMonth  ==>> ' + totalAmountPerMonth);
        });

               

               $A.enqueueAction(action);
                
		var action2 = component.get('c.getAllAmountsForInit');
        action2.setParams({
            "userEmail": pageReference.state.c__empiduser
        	}
		);
        action2.setCallback(this, function(a){    
            var monthExpenseAmounts = a.getReturnValue();
            for (var item in monthExpenseAmounts) {
                monthsNavigation[item].amount = monthExpenseAmounts[item];
                console.log(''+ item + ' ' + monthExpenseAmounts[item]);
            }
        });
		$A.enqueueAction(action2);     
        
    
        // data
        var nestedData = [
            {

                "description": "Rewis Inc",
                "amount": "3100",
                "action": "837-555-1212"
            },
            {

                "description": "Acme Corporation",
                "amount": "10000",
                "action": "837-555-1212"
            },
            {

                "description": "Rhode Enterprises",
                "amount": "6000",
                "action": "837-555-1212"
            },
            {

                "description": "Tech Labs",
                "amount": "1856",
                "action": "837-555-1212"
            }
        ];

    },
    
    handleRowAction: function(component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        var dataId = event.getParam('data-id');
        console.log(' ' + dataId);
        var navService = component.find('navService');
        var pageReference = component.get('v.pageReference');
        console.log('hi hello 1 ' + pageReference.attributes.componentName);
        switch (action.name) {
            case 'showDetails':
       			pageReference.attributes.componentName = 'c__newCardWizard';
                pageReference.state.c__amount=row.amount;
                pageReference.state.c__tdate=row.tdate;
                console.log('hi from in');
                //console.log(' ' +component.find("accordionSection")[0].get("v.label"));
                pageReference.state.c__description=row.description;
                console.log('hi hello 2');
        		event.preventDefault();
				navService.navigate(pageReference);
                break;
        }
     //   pageReference.state.
    },
    
    handleBeforeSelect: function(component, event) {
   		component.set('v.cardList', []);
		var id = event.target.dataset.id;
        console.log(id);
        var pageReference = component.get('v.pageReference');
        console.log(pageReference.state.c__empiduser);
        component.set("v.Empiduser", pageReference.state.c__empiduser);
		var userEmail = component.get("v.Empiduser");
             

        var action3 = component.get('c.getDateList');
        action3.setParams(
            {
                "userEmail": pageReference.state.c__empiduser,
                "selectedMonth": id
            }
        );
        action3.setCallback(this, function(a){
            var state = a.getState();
            if (state === "SUCCESS") {
                console.log('message from first callback ' + a.getReturnValue());
            	var resultFromAct = a.getReturnValue();
            	component.set('v.cardList', resultFromAct);
                
                //----------------
                
                var action4 = component.get('c.getExpenseForUser');
       			action4.setParams(
            		{
                		"userEmail": pageReference.state.c__empiduser,
                		"selectedMonth": id
            		}
       			);
       			action4.setCallback(this, function(a){
            		var state = a.getState();
            		if (state === "SUCCESS") {
                		var monthsNavigation = component.get('v.monthsNavigation');
            			var cl2 =JSON.parse(a.getReturnValue());
            			var totalAmount = 0;
            			var resArr = [];
            			var tmpArr = [];
            			monthsNavigation[id].amount = 0;
            			var cardList3 = component.get('v.cardList');
            			for (var item1 in cardList3) {
                			resArr = [];
                			totalAmount = 0;
                			for (var item2 in cl2) {
                    			if (cardList3[item1].includes(cl2[item2].cardDate)) {
                          			resArr.push({
                            			"description" : cl2[item2].description,
                            			"amount" : cl2[item2].amount,
                            			"tdate" : cl2[item2].cardDate
                          			});
                        			totalAmount += cl2[item2].amount;
                    			}
                			}
                			tmpArr.push({"label": cardList3[item1],
                             	"data" : resArr,
                             	"totalAmount" : totalAmount
                            });
                			monthsNavigation[id].amount += totalAmount;
            			};
            			component.set('v.cardList', tmpArr);
            			component.set('v.monthsNavigation', monthsNavigation);
            			totalAmount = 0;
            			resArr = [];
            			tmpArr = [];
            		}
        		});
                $A.enqueueAction(action4);
            }
        });
        $A.enqueueAction(action3);
    },
    
    handleCreateCard : function (component, event, helper) {
        var action = component.get('c.createCard');
        var navService = component.find('navService');
        var pageReference = component.get('v.pageReference');
        pageReference.attributes.componentName = 'c__newCardWizard';
        pageReference.state.c__amount='';
        pageReference.state.c__tdate='';
        pageReference.state.c__description='';
        console.log('hi hello 2');
     	event.preventDefault();	
		navService.navigate(pageReference);
        console.log('hi opyat');
     
    },
    
    
    handleSectionToggle: function(cmp, event) {
        
    }
})