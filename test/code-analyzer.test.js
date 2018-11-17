import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {

    it('is parsing an empty function correctly', () => {
        assert.deepEqual(
            (parseCode('')),
            []
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.deepEqual(
            (parseCode('let a;' + '\n' +
                'a=9')),
            [
                {
                    'Line': 1,
                    'Type': 'VariableDeclaration',
                    'Name': 'a',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 2,
                    'Type': 'AssignmentExpression',
                    'Name': 'a',
                    'Condition': '',
                    'Val': '9'
                }
            ]     );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.deepEqual(
            parseCode('let a=9;'),
            [
                {
                    'Line': 1,
                    'Type': 'VariableDeclaration',
                    'Name': 'a',
                    'Condition': '',
                    'Val': 9
                }
            ]
        );
    });
    it('is parsing a simple variable declaration correctly', () => {
        assert.deepEqual(
            parseCode('let a=9;'),
            [
                {
                    'Line': 1,
                    'Type': 'VariableDeclaration',
                    'Name': 'a',
                    'Condition': '',
                    'Val': 9
                }
            ]
        );
    });
    it('is parsing a simple variable declaration correctly', () => {
        assert.deepEqual(
            parseCode('function binarySearch(X, V, n){\n' +
                '    let low, high, mid;\n' +
                '    low = 0;\n' +
                '    high = n - 1;\n' +
                '    while (low <= high) {\n' +
                '        mid = (low + high)/2;\n' +
                '        if (X < V[mid])\n' +
                '            high = mid - 1;\n' +
                '        else if (X > V[mid])\n' +
                '            low = mid + 1;\n' +
                '        else\n' +
                '            return mid;\n' +
                '    }\n' +
                '    return -1;\n' +
                '}'),[
                {
                    'Line': 1,
                    'Type': 'FunctionDeclaration',
                    'Name': 'binarySearch',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 1,
                    'Type': 'variable declaration',
                    'Name': 'X',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 1,
                    'Type': 'variable declaration',
                    'Name': 'V',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 1,
                    'Type': 'variable declaration',
                    'Name': 'n',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 2,
                    'Type': 'VariableDeclaration',
                    'Name': 'low',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 2,
                    'Type': 'VariableDeclaration',
                    'Name': 'high',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 2,
                    'Type': 'VariableDeclaration',
                    'Name': 'mid',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 3,
                    'Type': 'AssignmentExpression',
                    'Name': 'low',
                    'Condition': '',
                    'Val': '0'
                },
                {
                    'Line': 4,
                    'Type': 'AssignmentExpression',
                    'Name': 'high',
                    'Condition': '',
                    'Val': 'n - 1'
                },
                {
                    'Line': 5,
                    'Type': 'WhileStatement',
                    'Name': '',
                    'Condition': 'low <= high',
                    'Val': ''
                },
                {
                    'Line': 6,
                    'Type': 'AssignmentExpression',
                    'Name': 'mid',
                    'Condition': '',
                    'Val': '(low + high) / 2'
                },
                {
                    'Line': 7,
                    'Type': 'IfStatement',
                    'Name': '',
                    'Condition': 'X < V[mid]',
                    'Val': ''
                },
                {
                    'Line': 8,
                    'Type': 'AssignmentExpression',
                    'Name': 'high',
                    'Condition': '',
                    'Val': 'mid - 1'
                },
                {
                    'Line': 9,
                    'Type': 'IfStatement',
                    'Name': '',
                    'Condition': 'X > V[mid]',
                    'Val': ''
                },
                {
                    'Line': 10,
                    'Type': 'AssignmentExpression',
                    'Name': 'low',
                    'Condition': '',
                    'Val': 'mid + 1'
                },
                {
                    'Line': 12,
                    'Type': 'ReturnStatement',
                    'Name': '',
                    'Condition': '',
                    'Val': 'mid'
                },
                {
                    'Line': 14,
                    'Type': 'ReturnStatement',
                    'Name': '',
                    'Condition': '',
                    'Val': '-1'
                }
            ]);

    });
});



