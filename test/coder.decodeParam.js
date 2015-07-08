var chai = require('chai');
var assert = chai.assert;
var coder = require('../lib/solidity/coder');
var c = require('../lib/utils/config');
var BigNumber = require('bignumber.js');
var bn = BigNumber;

c.USE_RAW_BYTES = false;

describe('lib/solidity/coder', function () {
    describe('decodeParam', function () {
        var test = function (t) {
            it('should turn ' + t.value + ' to ' + t.expected, function () {
                assert.deepEqual(coder.decodeParam(t.type, t.value), t.expected);
            });
        };


        test({ type: 'int', expected: new bn(1),            value: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'int', expected: new bn(16),           value: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int', expected: new bn(-1),           value: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ type: 'int256', expected: new bn(1),         value: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'int256', expected: new bn(16),        value: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int256', expected: new bn(-1),        value: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'});
        test({ type: 'int8', expected: new bn(16),          value: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int32', expected: new bn(16),         value: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int64', expected: new bn(16),         value: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'int128', expected: new bn(16),        value: '0000000000000000000000000000000000000000000000000000000000000010'});
        test({ type: 'bytes32', expected: '6761766f66796f726b0000000000000000000000000000000000000000000000',
            value: '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ type: 'bytes', expected: '6761766f66796f726b',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ type: 'bytes32', expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            value: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'bytes', expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000020' +
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'bytes', expected: '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '731a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'bytes', expected: '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
        '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000060' +
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
        test({ type: 'string', expected: 'gavofyork',       value: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000009' +
        '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ type: 'string', expected: '\xc3\xa4\x00\x00\xc3\xa4',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000006' +
            'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        test({ type: 'string', expected: '\xc3',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            'c300000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'bytes', expected: 'c3a40000c3a4',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000006' +
            'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        test({ type: 'bytes32', expected: 'c3a40000c3a40000000000000000000000000000000000000000000000000000',
            value: 'c3a40000c3a40000000000000000000000000000000000000000000000000000'});
        test({ type: 'int[]', expected: [],                 value: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'int[]', expected: [new bn(3)],        value: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'int256[]', expected: [new bn(3)],     value: '0000000000000000000000000000000000000000000000000000000000000020' +
        '0000000000000000000000000000000000000000000000000000000000000001' +
        '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'int[]', expected: [new bn(1), new bn(2), new bn(3)],
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000001' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000003'});
        test({ type: 'bool', expected: true,                value: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ type: 'bool', expected: false,               value: '0000000000000000000000000000000000000000000000000000000000000000'});
        test({ type: 'real', expected: new bn(1),           value: '0000000000000000000000000000000100000000000000000000000000000000'});
        test({ type: 'real', expected: new bn(2.125),       value: '0000000000000000000000000000000220000000000000000000000000000000'});
        test({ type: 'real', expected: new bn(8.5),         value: '0000000000000000000000000000000880000000000000000000000000000000'});
        test({ type: 'real', expected: new bn(-1),          value: 'ffffffffffffffffffffffffffffffff00000000000000000000000000000000'});
        test({ type: 'ureal', expected: new bn(1),          value: '0000000000000000000000000000000100000000000000000000000000000000'});
        test({ type: 'ureal', expected: new bn(2.125),      value: '0000000000000000000000000000000220000000000000000000000000000000'});
        test({ type: 'ureal', expected: new bn(8.5),        value: '0000000000000000000000000000000880000000000000000000000000000000'});
        test({ type: 'address', expected: '407d73d8a49eeb85d32cf465507dd71d507100c1',
            value: '000000000000000000000000407d73d8a49eeb85d32cf465507dd71d507100c1'});
        test({ type: 'string', expected: 'welcome to ethereum. welcome to ethereum. welcome to ethereum.',
            value: '0000000000000000000000000000000000000000000000000000000000000020' +
            '000000000000000000000000000000000000000000000000000000000000003e' +
            '77656c636f6d6520746f20657468657265756d2e2077656c636f6d6520746f20' +
            '657468657265756d2e2077656c636f6d6520746f20657468657265756d2e0000'});
    });
});

describe('lib/solidity/coder', function () {
    describe('decodeParams', function () {
        var test = function (t) {
            it('should turn ' + t.values + ' to ' + t.expected, function () {
                assert.deepEqual(coder.decodeParams(t.types, t.values), t.expected);
            });
        };


        test({ types: ['int'], expected: [new bn(1)],       values: '0000000000000000000000000000000000000000000000000000000000000001'});
        test({ types: ['bytes32', 'int'], expected: ['6761766f66796f726b0000000000000000000000000000000000000000000000', new bn(5)],
            values: '6761766f66796f726b0000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000005'});
        test({ types: ['int', 'bytes32'], expected: [new bn(5), '6761766f66796f726b0000000000000000000000000000000000000000000000'],
            values: '0000000000000000000000000000000000000000000000000000000000000005' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000'});
        test({ types: ['int', 'string', 'int', 'int', 'int', 'int[]'], expected: [new bn(1), 'gavofyork', new bn(2), new bn(3), new bn(4),
            [new bn(5), new bn(6), new bn(7)]],
            values: '0000000000000000000000000000000000000000000000000000000000000001' +
            '00000000000000000000000000000000000000000000000000000000000000c0' +
            '0000000000000000000000000000000000000000000000000000000000000002' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000004' +
            '0000000000000000000000000000000000000000000000000000000000000100' +
            '0000000000000000000000000000000000000000000000000000000000000009' +
            '6761766f66796f726b0000000000000000000000000000000000000000000000' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '0000000000000000000000000000000000000000000000000000000000000005' +
            '0000000000000000000000000000000000000000000000000000000000000006' +
            '0000000000000000000000000000000000000000000000000000000000000007'});
        test({ types: ['int', 'bytes', 'int', 'bytes'], expected: [
            new bn(5),
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
            new bn(3),
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b',
        ],
            values: '0000000000000000000000000000000000000000000000000000000000000005' +
            '0000000000000000000000000000000000000000000000000000000000000080' +
            '0000000000000000000000000000000000000000000000000000000000000003' +
            '00000000000000000000000000000000000000000000000000000000000000e0' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '231a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '0000000000000000000000000000000000000000000000000000000000000040' +
            '331a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b' +
            '431a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b'});
    });
});
