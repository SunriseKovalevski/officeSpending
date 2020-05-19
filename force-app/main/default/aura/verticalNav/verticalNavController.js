({
    init : function(component, event, helper)  {
        var menuItems = ['January', 'February', 'March', 'April', 'May', 
                                'June', 'July', 'August', 'September', 'October', 
                                'November', 'December'];
        component.set('v.menuItems', menuItems);
    },
   onClick : function(component, event, helper) {
       var id = event.target.dataset.menuItemId;
       if (id) {
           component.getSuper().navigate(id);
        }
  }
})