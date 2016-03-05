/*jshint node:true*/
/*jshint mocha:true*/
'use strict';

var assert = require('assert');
var sinon = require('sinon');
var paginate = require('..');

describe('Ghost - Custom Paginate Helper', function() {
    var options;
    beforeEach(function() {
        options = {
            fn: sinon.stub(),
            hash: {}
        };
    });

    describe('When limit is specified', function() {
        beforeEach(function() {
            options.hash.limit = 5;
        });
        describe('and it is valid (PageCount - limit >2 && limit > 0)', function() {
            it('should call options.fn with expected context', function() {
                var cases = [{
                    input: [1, 10],
                    expected: [{
                        n: 1,
                        active: true,
                        first: true
                    }, {
                        n: 2,
                        middle: true
                    }, {
                        n: 3,
                        middle: true
                    }, {
                        n: 4,
                        middle: true
                    }, {
                        n: 5,
                        middle: true
                    }, {
                        n: 6,
                        middle: true
                    }, {
                        n: 10,
                        ellipsis: true,
                        last: true
                    }]
                }, {
                    input: [5, 10],
                    expected: [{
                        n: 1,
                        first: true,
                        ellipsis: true
                    }, {
                        n: 3,
                        middle: true
                    }, {
                        n: 4,
                        middle: true
                    }, {
                        n: 5,
                        middle: true
                    }, {
                        n: 6,
                        middle: true
                    }, {
                        n: 7,
                        middle: true
                    }, {
                        n: 10,
                        ellipsis: true,
                        last: true
                    }]
                }, {
                    input: [10, 10],
                    expected: [{
                        n: 1,
                        first: true,
                        ellipsis: true
                    }, {
                        n: 5,
                        middle: true
                    }, {
                        n: 6,
                        middle: true
                    }, {
                        n: 7,
                        middle: true
                    }, {
                        n: 8,
                        middle: true
                    }, {
                        n: 9,
                        middle: true
                    }, {
                        n: 10,
                        active: true,
                        last: true
                    }]
                }];
                cases.forEach(function(test) {
                    paginate(test.input[0], test.input[1], options);
                    test.expected.forEach(function(expected) {
                        assert(options.fn.calledWith(expected));
                    });
                });
            });
        });
        describe('and it is not valid', function() {
            it('should call options.fn with expected context', function() {
                var cases = [{
                    input: [1, 1],
                    expected: [{
                        n: 1,
                        active: true,
                        first: true
                    }]
                }, {
                    input: [2, 4],
                    expected: [{
                        n: 1,
                        first: true,
                    }, {
                        n: 2,
                        active: true,
                        middle: true
                    }, {
                        n: 3,
                        middle: true
                    }, {
                        n: 4,
                        last: true
                    }]
                }, {
                    input: [7, 7],
                    expected: [{
                        n: 1,
                        first: true,
                    }, {
                        n: 2,
                        middle: true
                    }, {
                        n: 3,
                        middle: true
                    }, {
                        n: 4,
                        middle: true
                    }, {
                        n: 5,
                        middle: true
                    }, {
                        n: 6,
                        middle: true
                    }, {
                        n: 7,
                        active: true,
                        last: true
                    }]
                }];
                cases.forEach(function(test) {
                    paginate(test.input[0], test.input[1], options);
                    test.expected.forEach(function(expected) {
                        assert(options.fn.calledWith(expected));
                    });
                });
            });
        });
        describe('or it is 0', function() {
            it('should call options.fn with expected context', function() {
                options.hash.limit = 0;
                var test = {
                    input: [2, 2],
                    expected: [{
                        n: 1,
                        first: true
                    }, {
                        n: 2,
                        active: true,
                        last: true
                    }]
                };
                paginate(test.input[0], test.input[1], options);
                test.expected.forEach(function(expected) {
                    assert(options.fn.calledWith(expected));
                });
            });
        });
    });
    describe('When limit is not specified', function() {
        it('should call options.fn with expected context', function() {
            var cases = [{
                input: [1, 5],
                expected: [{
                    n: 1,
                    active: true,
                    first: true
                }, {
                    n: 2,
                    middle: true
                }, {
                    n: 3,
                    middle: true
                }, {
                    n: 4,
                    middle: true
                }, {
                    n: 5,
                    last: true
                }]
            }, {
                input: [3, 7],
                expected: [{
                    n: 1,
                    first: true,
                }, {
                    n: 2,
                    middle: true
                }, {
                    n: 3,
                    active: true,
                    middle: true
                }, {
                    n: 4,
                    middle: true
                }, {
                    n: 6,
                    middle: true
                }, {
                    n: 7,
                    last: true
                }]
            }, {
                input: [1, 1],
                expected: [{
                    n: 1,
                    active: true,
                    first: true
                }]
            }];
            cases.forEach(function(test) {
                paginate(test.input[0], test.input[1], options);
                test.expected.forEach(function(expected) {
                    assert(options.fn.calledWith(expected));
                });
            });
        });
    });
});
