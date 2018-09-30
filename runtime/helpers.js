module.exports = {

    loadPage: function (url, waitInSeconds) {
        var timeout = (waitInSeconds) ? (waitInSeconds * 1000) : DEFAULT_TIMEOUT;
        return driver.get(url);
    },

    getTitle: function () {
        return driver.getTitle();
    },

    getURLToVerify: function () {
        return driver.getCurrentUrl();
    }
};