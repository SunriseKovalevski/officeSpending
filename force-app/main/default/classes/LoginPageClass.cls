public class LoginPageClass {
    @auraEnabled
    public static String getContact(String userEmail, String userpassw){
        List<Contact> lcont = new List<Contact>(
            [SELECT Id, Email, Password__c, Admin__c FROM Contact
            WHERE Email=:userEmail LIMIT 1]);
        if (lcont.size()==0) {
            system.debug('no no no');
            return 'User does not exist';
            
        } else {
            if (lcont[0].Password__c == userpassw) {
                if (lcont[0].Admin__c == true) {
                    return 'Admin';
                } else {
                return 'Login successfully';
                }
            } else {
                return 'Invalid Password';
            }
        }
    }
}