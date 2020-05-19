public class NewCardWizardClass {
    
    @AuraEnabled
    public static String saveCard (String userEmail, Decimal amountValue, String descriptionValue, Date tdateValue) {
        List<Contact> cnt = [SELECT Id, Email FROM Contact WHERE Email=:userEmail LIMIT 1];
        List<Monthly_Expense__c> mE = [SELECT Id, MonthDate__c
                                      FROM Monthly_Expense__c WHERE Keeper__c=:cnt[0].Id LIMIT 1];
        Expense_Card__c card = new Expense_Card__c();
		card.Amount__c = amountValue;
        card.CardDate__c = tdateValue;
        card.Description__c = descriptionValue;
        card.CardKeeper__c = cnt[0].Id;
        card.MonthlyExpense__c = mE[0].Id;
        insert card;
        return  JSON.serializePretty(card);
    }

}