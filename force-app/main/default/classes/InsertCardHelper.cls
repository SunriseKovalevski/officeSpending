public with sharing class InsertCardHelper {
    public static void handleBeforeInsert(List<Expense_Card__c> cards) {
        for (Expense_Card__c item : cards){
            Integer month = item.CardDate__c.month();
            List<Monthly_Expense__c> mEs = getMEsForUser(item.CardKeeper__c);
            
            for (Monthly_Expense__c itemMonth : mEs) {
                if (itemMonth.MonthDate__c.month() == month) {
                    item.MonthlyExpense__c = itemMonth.Id;
                }
            }
            
            if (item.MonthlyExpense__c == null) {
                Monthly_Expense__c mE = createNewME (item.CardKeeper__c, item.CardDate__c);
                item.MonthlyExpense__c = mE.Id;
            }
        }
    }
    
    public static List <Monthly_Expense__c> getMEsForUser (Id userId) {
        return [SELECT Id, MonthDate__c FROM Monthly_Expense__c WHERE Keeper__r.Id =: userId];
    }
    
    public static Monthly_Expense__c createNewME (Id userId, Date cardDate) {
        Monthly_Expense__c mE = new Monthly_Expense__c();
        mE.Balance__c = 300;
        mE.Keeper__c = userId;
        mE.MonthDate__c = cardDate;
        
        insert mE;
        return mE;
    }
}