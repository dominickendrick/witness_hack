Feature:

    As a guardian travel reader I would like to see users recommended places 
    when I visit a travel article so that can get a broader view of what a place is like
    
    Scenario: User visiting a travel article from witness
    
        Given I am a guardian user 
        When I visit a page about holidays in paris
        Then I should see related witness travel data about paris
    
    Scenario: User visiting a travel article from witness
    
        Given I am a guardian moderator
        When I moderate a contribution
        Then I should be able to add keyword tags
    
    
    

    related witness query
        
    travel:
    http://n0ticeapis.com/2/search?group=group/guardianwitness/travel
    
    paris:
    http://n0ticeapis.com/2/search?location=paris
    
    travel+paris
    http://n0ticeapis.com/2/search?location=paris&group=group/guardianwitness/travel