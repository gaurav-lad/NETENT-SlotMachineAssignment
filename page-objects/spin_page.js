var TOTAL_SPINS = 50;

module.exports = {

    elements: {
        spinButton: by.css('div[id="spinButton"]'),
        lastWin: by.css('span[id="lastWin"]'),
        totalSpins: by.css('span[id="credits"]'),
        bet: by.css('span[id="bet"]'),
        Test: by.css('#header > nav > ul > li:nth-child(1) > a'),
        spinButtonDisable: by.css('div[class="disabled"]'),
        repeatSpinButton: by.css('div[id="spinButton"][class]'),
        prizeWon: by.css('div[class="trPrize won"]'),
        betUp: by.css('div[id="betSpinUp"]'),
        changeMachine: by.css('a[class="btnChangeMachine"]'),
        changedMachine: by.css('div[id="prizes_list_slotMachine2"]:not([style*="display"])'),
        machinePayout: by.css('span[class="tdPayout"]'),
        slotMachine: by.css('div[id="prizes_list_slotMachine1"]'),

    },

    spinClick: function () {
        driver.findElement(page.spin_page.elements.spinButton).click();
        return driver.sleep(7000);
    },

    IspinTillIClick: function () {
        driver.findElement(page.spin_page.elements.spinButton).click();
        return driver.sleep(5000)
            .then(function () {
                return driver.wait(until.elementsLocated(page.spin_page.elements.repeatSpinButton), 25000)
                    .then(function (el) {
                        return driver.findElement(page.spin_page.elements.lastWin).getText()
                            .then(function (lastWin) {
                                lastWin = Number(lastWin);
                                if (lastWin > 0) {
                                    TOTAL_SPINS = TOTAL_SPINS + lastWin;
                                } else {
                                    driver.findElement(page.spin_page.elements.bet).getText()
                                        .then(function (betValue) {
                                            TOTAL_SPINS = TOTAL_SPINS - betValue;
                                            page.spin_page.spinClick();
                                        })
                                }
                            })
                    });
            })
        return TOTAL_SPINS;
    },

    spinResultVerify: function () {
        return driver.findElement(page.spin_page.elements.lastWin).getText()
            .then(function (lastWin) {
                lastWin = Number(lastWin);
                if (lastWin > 0) {
                    return driver.findElement(page.spin_page.elements.prizeWon).getText()
                        .then(function (winChart) {
                            winChart = Number(winChart);
                            return expect(winChart).to.equal(lastWin);
                        })
                } else {
                    return console.log("final LastWin: ", lastWin);
                }
            })
    },

    setBetAt: function (bet) {
        console.log("BET:", bet);
        while (bet != 1) {
            driver.findElement(page.spin_page.elements.betUp).click();
            bet--;
        }
        return true;
    },

    IShouldSeeWinChartAs: function (Wins) {
        var array = Wins.split(",");
        var selectList, desiredOption;
        var listArray = [];
        selectList = driver.findElement(page.spin_page.elements.slotMachine);
        return selectList.findElements(page.spin_page.elements.machinePayout)
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText()
                        .then(function doesOptionMatch(text) {
                            listArray.push(text);
                        })

                });
            })
            .then(function equateArray() {
                const finalArray = [];
                array.forEach((e1) => listArray.forEach((e2) => {
                    if (e1 === e2) {
                        finalArray.push(e1);
                    }
                }))
                return finalArray;
            })
    },

    IChangeMachine: function () {
        driver.findElement(page.spin_page.elements.changeMachine).click();
        return driver.sleep(5000);
    },

    IShouldSeeTheChangedSlotMachine: function () {
        return driver.findElement(page.spin_page.elements.changedMachine).isDisplayed();
    }
}