// Forked from https://github.com/jscs-dev/node-jscs/blob/a61ae06e45bae55e751ea8ecef283af85cf3142c/lib/rules/require-trailing-comma.js
//
// ##### Valid with ignoreSingleValue: "withClosingBracesOnSameLine"
//
// var baz = {
//     one: 1,
// };
//
// var baz = { bazinga: {
//     one: 1,
//     two: 2,
// } };
//
// var baz = [{
//     one: 1,
//     two: 2,
// }];
//
// ##### Invalid with ignoreSingleValue: "withClosingBracesOnSameLine"
//
// var baz = {
//     one: 1
// };
//
// ##### Valid with ignoreSingleLine
// 
// var baz = { one: 1 };
//

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
    configure: function(options) {

        if (typeof options === 'object') {
            if ('ignoreSingleValue' in options) {
                assert(
                    options.ignoreSingleValue === true || options.ignoreSingleValue === 'withClosingBracesOnSameLine',
                    this.getOptionName() + ' option ignoreSingleValue should have true value or withClosingBracesOnSameLine'
                );
                this._ignoreSingleValue = true;
            }
            if ('ignoreSingleLine' in options) {
                assert(
                    options.ignoreSingleLine === true,
                    this.getOptionName() + ' option ignoreSingleLine requires true value or should be removed'
                );
                this._ignoreSingleLine = true;
            }
        } else {
            assert(
                options === true,
                this.getOptionName() + ' option requires a true value or should be removed'
            );
        }
    },

    getOptionName: function() {
        return 'bodylabsRequireTrailingComma';
    },

    check: function(file, errors) {
        var _this = this;

        file.iterateNodesByType(['ObjectExpression', 'ArrayExpression'], function(node) {
            var isObject = node.type === 'ObjectExpression';
            var entities = isObject ? node.properties : node.elements;

            if (entities.length === 0) {
                return;
            }

            if (_this._ignoreSingleValue === true && entities.length === 1) {
                return;
            }

            if (_this._ignoreSingleLine && node.loc.start.line === node.loc.end.line) {
                return;
            }

            var closingToken = file.getLastNodeToken(node);

            if (_this._ignoreSingleValue === 'closingBracesOnSameLine') {
                var prevToken = file.getPrevToken();
                if (prevToken.value === '}' && closingToken.loc.end.line === node.loc.end.line) {
                    return;
                }
            }

            errors.assert.tokenBefore({
                token: closingToken,
                expectedTokenBefore: {type: 'Punctuator', value: ','},
                message: 'Missing comma before closing ' + (isObject ? 'curly brace' : 'bracket')
            });
        });
    }

};
