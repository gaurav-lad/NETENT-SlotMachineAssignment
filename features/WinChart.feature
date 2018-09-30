Feature: Raise bets to win more
As a Player, I want to raise my bets and see my win chart

Scenario Outline: Verifying BET and WIN CHART
Given I am on Slot Machine
When I set BET at "<BET>"
Then I should see WIN CHART as "<Wins>"
Examples:
| BET | Wins                               |
|   1 | 200,50,20,16,15,14,12,7,4          |
|   2 | 400,100,40,32,30,28,24,14,8        |
|   3 | 600,150,60,48,45,42,36,21,12       |
|   4 | 800,200,80,64,60,56,48,28,16       |
|   5 | 1000,250,100,80,75,70,60,35,20     |
|   6 | 1200,300,120,96,90,84,72,42,24     |
|   7 | 1400,350,140,112,105,98,84,49,28   |
|   8 | 1600,400,160,128,120,112,96,56,32  |
|   9 | 1800,450,180,144,135,126,108,63,36 |
|  10 | 2000,500,200,160,150,140,120,70,40 |