public class AdminPageClass {
    
    public class PrepAdminTable {
        @AuraEnabled
        public String nameOffice {get;set;}
        public Decimal balanceNow {get;set;}
        public Decimal monthlyAverage {get;set;}
        public List<Decimal> byEachMonth {get;set;}
        public Decimal total {get;set;}
     }
    
    @AuraEnabled
    public static String adminInit () {
        List<Integer> monthAverageAmount =new List<Integer>();
        List<String> colInit = new List<String>();
        List<PrepAdminTable> adminTable = new List<PrepAdminTable>();
        List<Expense_Card__c> expCards = new List<Expense_Card__c>();
        Date dt = Date.today();
        
        List<Monthly_Expense__c> mE = [SELECT Name, Balance__c, MonthDate__c, Reminder__c, SpentAmount__c, Keeper__r.Office__c
                                       FROM Monthly_Expense__c];
        List<String> pickListValuesList = new List<String>();
        Schema.DescribeFieldResult fieldResult = Contact.Office__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPickListValues();
        for (Schema.PicklistEntry pickListVal : ple) 
        {
            pickListValuesList.add(pickListVal.getLabel());
        }
        System.debug(' 1 ');
        for (String str : pickListValuesList) {
            monthAverageAmount.clear();
            System.debug(' 2 ');
            List<Monthly_Expense__c> collectME = [SELECT Id, Name, Balance__c, MonthDate__c, Reminder__c, SpentAmount__c, Keeper__r.Office__c 
                                                 FROM Monthly_Expense__c WHERE Keeper__r.Office__c=: str];
            for (Monthly_Expense__c itemME: collectME) {
                System.debug(' 3 ');
                PrepAdminTable itemAdminTable = new PrepAdminTable();
                itemAdminTable.byEachMonth = new List<Decimal>();
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                itemAdminTable.byEachMonth.add(0);
                 System.debug(' 3.1 ');
				itemAdminTable.nameOffice = itemME.Keeper__r.Office__c;
                 System.debug(' 3.2 ');
                itemAdminTable.balanceNow = itemME.Reminder__c;
                 System.debug(' 3.3 ');
                expCards = [SELECT Amount__c, MonthlyExpense__c, CardDate__c FROM Expense_Card__c WHERE MonthlyExpense__c =:itemME.Id];
                System.debug(' 4 ');
                for (Expense_Card__c expCard : expCards) {
                    System.debug(' 4.1 ');
                    dt = expCard.CardDate__c;
                    System.debug(' 5 ');
                    itemAdminTable.byEachMonth.set(dt.month(), (itemAdminTable.byEachMonth.get(dt.month()) + expCard.Amount__c));
                    System.debug(' 6 ');
                    if (!monthAverageAmount.contains(dt.month())) {
                        monthAverageAmount.add(dt.month());
                    }
                }
				// tmp=
				System.debug(' 7 ');
                itemAdminTable.monthlyAverage = itemME.SpentAmount__c / monthAverageAmount.size();
                itemAdminTable.total = itemME.SpentAmount__c;
       //         itemAdminTable.byEachMonth
                System.debug(' 8 ');
                System.debug(' ' + itemAdminTable);
                adminTable.add(itemAdminTable);

            }
            System.debug(str + ' ' + pickListValuesList.indexOf(str) + '  ' );
        }
		System.debug('  ' + adminTable);
        return JSON.serializePretty(adminTable);
    }

}