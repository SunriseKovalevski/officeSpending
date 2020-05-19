trigger InsertCardTrigger on Expense_Card__c (before insert) {
	 if (Trigger.isBefore && Trigger.isInsert) {
        InsertCardHelper.handleBeforeInsert(Trigger.new);
    }
}