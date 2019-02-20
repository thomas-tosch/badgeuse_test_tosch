const LIST = [];

exports.addToken = (token) => {
    LIST.push(token);

    setTimeout(() => {
        LIST.splice(LIST.indexOf(token), 1);
    },10800000); // after 3h
};

exports.checkToken = (tokenClient) => {
    return LIST.indexOf(tokenClient) >= 0;
};

exports.delToken = (token) => {
    LIST.splice(LIST.indexOf(token), 1);
};