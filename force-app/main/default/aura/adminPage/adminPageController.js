({
    init : function(component, event, helper) {
        console.log('Hi');
        var adminColumns = component.get('v.columns');
        var kastbIl = component.get('v.kastbIl');
        var arrWithSum = [{"value" : 'Summ:', "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_Moccasin'},
                          {"value" : 0, "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_Moccasin'}, 
                          {"value" : 0, "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_Moccasin'}, 
                          {"value" : 0, "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_Moccasin'}, 
                          {"value" : 0, "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_Moccasin'}, 
                          {"value" : 0, "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_Moccasin'}, 
                          {"value" : 0, "color" : 'color_Moccasin'}, {"value" : 0, "color" : 'color_DarkGray'}];
        arrWithSum.unshift(kastbIl[1]);
        arrWithSum.unshift(kastbIl[0]);
        
        var action = component.get('c.adminInit');
        action.setCallback(this, function(a){
            
            
            
            
            var cl2 =JSON.parse(a.getReturnValue());
            var arrToAdd = [];
            for (var item in cl2) {
                arrToAdd.push({"value" : cl2[item].nameOffice,  "color" : 'color_Moccasin'});
                arrToAdd.push({"value" : cl2[item].balanceNow, "color" : 'color_Moccasin'});
                arrToAdd.push({"value" : cl2[item].monthlyAverage, "color" : 'color_Moccasin'});
                //arrToAdd = arrToAdd.concat({"value" : 0,  "color" : 'color_Moccasin'});
                for (var i in cl2[item].byEachMonth) {
                    arrToAdd.push({"value" : cl2[item].byEachMonth[i], "color" : 'color_Moccasin'});
                }
                // cl2[item].byEachMonth
                arrToAdd.push({"value" :cl2[item].total, "color" : 'color_DarkGray'});
                console.log(' ' + cl2[item].balanceNow);
				console.log(' ' + cl2[item].monthlyAverage);
                console.log(' ' + cl2[item].byEachMonth);
                console.log(' ' + cl2[item].total);
                
               // for (var i in item) {
                //    console.log(' ' + i);
                //console.log(' ' + item.balanceNow);
                //console.log(' ' + item.monthlyAverage);
                //console.log(' ' + item.byEachMonth);
                //console.log(' ' + item.total);
                //console.log(' ' + item);
           //     }
           
                adminColumns.splice(1, 0, arrToAdd); //   unshift(item);
               console.log('' + adminColumns);
            }
            
            //Считаем суммы
            
            for (var item in adminColumns) {
            console.log('' + adminColumns[item]);
            for (var i in adminColumns[item]) {
                if (i > 2) {
                    arrWithSum[i].value += adminColumns[item][i].value;
                }
            }   
        }
            adminColumns.push(arrWithSum);
            component.set('v.columns', adminColumns); 
            //console.log(a.getReturnValue());
        });
        
        $A.enqueueAction(action);
   
    },
    
	myAction : function(component, event, helper) {
		
	}
})