Feature: Verifying Slot Machine till I wins
As a Player, I want to verify my wins on Slot Machine

Scenario: Spin till I Win
Given I am on Slot Machine
When I spin till I win
Then I should see my results