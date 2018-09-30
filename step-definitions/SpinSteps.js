module.exports = function () {

    this.Given(/^I am on Slot Machine$/, function () {
        helpers.loadPage('http://slotmachinescript.com', 180)
        return helpers.getTitle()
            .then(function (Title) {
                console.log(Title);
                return expect(Title).to.equal('Add a HTML5 Slot Machine to your Site');
            })
            .then(function () {
                return helpers.getURLToVerify()
                    .then(function (url) {
                        console.log(url);
                        return expect(url).to.equal('http://slotmachinescript.com/');
                    })
            })
    });

    this.When(/^I spin$/, function () {
        return page.spin_page.spinClick();
    });

    this.When(/^I spin till I win$/, function () {
        return page.spin_page.IspinTillIClick();
    });

    this.Then(/^I should see my results$/, function () {
        return page.spin_page.spinResultVerify();
    })

    this.When(/^I set BET at "(.*)"$/, function (bet) {
        return page.spin_page.setBetAt(bet);
    });

    this.Then(/^I should see WIN CHART as "(.*)"$/, function (Wins) {
        var winArr = [] 
        winArr= Wins.split(",");
        return page.spin_page.IShouldSeeWinChartAs(Wins).then(function(retArray){
            console.log("RetArr: ", retArray)
            return expect(winArr.length).to.equal(retArray.length);
        })
    });

    this.When(/^I change Machine$/, function () {
        return page.spin_page.IChangeMachine();
    });

    this.Then(/^I should see the changed Slot Machine$/, function () {
        return page.spin_page.IShouldSeeTheChangedSlotMachine();
    });

};