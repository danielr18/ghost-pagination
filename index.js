module.exports = function(n_page, page_count, options) {
    var ret = '';
    var pageCount = Number(page_count);
    var page = Number(n_page);
    var limit;
    if (options.hash.limit) {
        if (pageCount - options.hash.limit > 2 && options.hash.limit > 0) {
            limit = +options.hash.limit;
        }
    }
    var newContext = {};
    if (typeof limit === 'number') {
        //--First--//
        if (page === 1) {
            newContext = {
                n: 1,
                active: true
            }
        } else {
            newContext = {
                n: 1
            }
        }
        var leftCount = Math.ceil(limit / 2) - 1;
        var rightCount = limit - leftCount - 1;
        if (page + rightCount >= pageCount)
            leftCount = limit - (pageCount - page);
        if (page - leftCount <= 1)
            leftCount = page - 1;
        if (page - leftCount > 2) {
            newContext.ellipsis = true;
        }
        newContext.first = true;
        ret = ret + options.fn(newContext);
        //--End First--//
        //--Middle--//
        var i = 0;
        leftCount = Math.ceil(limit / 2) - 1;
        if (page + rightCount >= pageCount)
            leftCount = limit - (pageCount - page);
        if (page - leftCount <= 1)
            leftCount = page - 2;
        var start = page - leftCount;
        while (i < limit && i < pageCount && start < pageCount) {
            newContext = {
                n: start
            };
            if (start === page) newContext.active = true;
            newContext.middle = true;
            ret = ret + options.fn(newContext);
            start++;
            i++;
        }
        //--End Middle--//
        //--Last--//
        if (page === pageCount) {
            newContext = {
                n: pageCount,
                active: true
            }
        } else {
            newContext = {
                n: pageCount
            }
        }
        var rightCount = limit - Math.ceil(limit / 2) + 1;
        if (pageCount - page > rightCount && limit != pageCount) {
            newContext.ellipsis = true;
        }
        newContext.last = true;
        ret = ret + options.fn(newContext);
        //--End last--//
    } else {
        for (var i = 1; i <= pageCount; i++) {
            newContext = {
                n: i
            };
            if (i === page) newContext.active = true;
            if (i === 1) newContext.first = true;
            else if (i === pageCount) newContext.last = true;
            else newContext.middle = true;
            ret = ret + options.fn(newContext);
        }
    }
    return ret;
};
