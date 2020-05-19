public class ExpensePageClass {
    public class ExpensesList {
        public String keyName;
        public Decimal balance;
        public String officeName;
        public Decimal spent;
    }
    
    
    public class CardData {
        @AuraEnabled
        public Decimal amount {get;set;}
        public String description {get;set;}
        public Date cardDate {get; set;}
      //  public String action;
    }
    
    @AuraEnabled
    public static String createCard(String userEmail) {
        return 'hi';
    }
    
    @AuraEnabled
    public static List<Decimal> getAllAmountsForInit (String userEmail){
        List <Decimal> str = new List<Decimal>();
        Decimal amount = 0;
        Date dt = Date.today();
        Integer month =-1;
        List<Contact> cnt = [SELECT Id, Email FROM Contact WHERE Email=:userEmail LIMIT 1];
        List<Monthly_Expense__c> mE = [SELECT Balance__c, MonthDate__c, Reminder__c, SpentAmount__c
                                      FROM Monthly_Expense__c WHERE Keeper__r.Email=:userEmail 
                                      ORDER BY MonthDate__c ASC LIMIT 1000];
        List<Expense_Card__c> eC = [SELECT Amount__c, CardDate__c, Description__c, MonthlyExpense__c
                                    FROM Expense_Card__c WHERE CardKeeper__c =: cnt[0].Id 
            						ORDER BY CardDate__c ASC LIMIT 1000];
        for (Integer i = 1; i < 13; i++){
            amount = 0;
        for (Expense_Card__c item : eC) {
		    dt = item.CardDate__c;
            
            month =-1;
            if(dt != null) {
                month = dt.month();
            }
            if ((item.MonthlyExpense__c != null)&(month == i)) {
                amount += item.Amount__c;
           		System.debug(i+' Expense_Card__c  item  ===>>>  ' + JSON.serializePretty(item));
            }
        }
            str.add(amount);
        }
        
        return str;
    }
    
    @AuraEnabled
    public static List<String> getDateList(String userEmail, Integer selectedMonth) {
      //Integer sMonth = Integer.valueOf(selectedMonth);
        selectedMonth++;
        List<Contact> cnt = [SELECT Id, Email FROM Contact WHERE Email=:userEmail LIMIT 1];
        List<Expense_Card__c> eC = [SELECT  CardDate__c
                                    FROM Expense_Card__c WHERE CardKeeper__c =: cnt[0].Id
                                   AND CALENDAR_Month(CardDate__c) =: selectedMonth 
            						ORDER BY CardDate__c ASC LIMIT 1000];
        System.debug('first callback ' + JSON.serializePretty(eC));
        List <String> returnList = new List<String>();
        for (Expense_Card__c item: eC) {
            System.debug('  getDateList ======>>>>  ' + JSON.serializePretty(item.get('CardDate__c')));
            if (!returnList.contains(String.valueOf((item.get('CardDate__c'))))) {
            	returnList.add(String.valueOf((item.get('CardDate__c'))));    
            }
        }        
        System.debug('  returnList ======>>>>  ' + JSON.serializePretty(returnList));
        return returnList;
    }
    
    //per month
    @AuraEnabled
    public static String getExpenseForUser (String userEmail, Integer selectedMonth) {
        selectedMonth++;
        String[] monthNames = new String[] {'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'};
		
        
        
        List<Contact> cnt = [SELECT Id, Email FROM Contact WHERE Email=:userEmail LIMIT 1];
        system.debug(' ' + cnt[0].id + cnt[0].Email + ' ' + userEmail);
        List<Monthly_Expense__c> mE = [SELECT Balance__c, MonthDate__c, Reminder__c, SpentAmount__c
                                      FROM Monthly_Expense__c WHERE Keeper__r.Email=:userEmail 
                                      ORDER BY MonthDate__c ASC LIMIT 1000];
        List<Expense_Card__c> eC = [SELECT Amount__c, CardDate__c, Description__c, MonthlyExpense__c
                                    FROM Expense_Card__c WHERE CardKeeper__c =: cnt[0].Id
                                   AND CALENDAR_Month(CardDate__c) = :selectedMonth 
            						ORDER BY CardDate__c ASC LIMIT 1000];
        System.debug(' eC  =-=-=>>' + eC);
        
        List<Date> dates = new List<Date>();
        List <String> returnList = new List<String>();
   		List<CardData> cardData = new List<CardData>();
        
      	for (Expense_Card__c item: eC) {
            CardData card = new CardData();
            card.amount = item.Amount__c;
            card.description = item.Description__c;
            card.cardDate = item.CardDate__c;
    
              cardData.add(card);
        }
		System.debug('dates ==> ' + dates);

        
        for (Integer i = 0; i < 12; i++) {   
        }
        for (Monthly_Expense__c item : mE) {
            system.debug(' ' + item);
        }
        
        system.debug('cardData  ====>  ' + JSON.serializePretty(cardData));
        
        return JSON.serializePretty(cardData);
    }
}