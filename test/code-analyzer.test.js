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


    it('test', () => {
        assert.deepEqual(
            parseCode('function test1(x){\n' +
        '    let tmp=1;\n' +
        '    while (tmp<4) {\n' +
        '        tmp=tmp+1;\n' +
        '    }\n' +
        '    return tmp;\n' +
        '}') ,
            [
                {
                    'Line': 1,
                    'Type': 'FunctionDeclaration',
                    'Name': 'test1',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 1,
                    'Type': 'variable declaration',
                    'Name': 'x',
                    'Condition': '',
                    'Val': ''
                },
                {
                    'Line': 2,
                    'Type': 'VariableDeclaration',
                    'Name': 'tmp',
                    'Condition': '',
                    'Val': 1
                },
                {
                    'Line': 3,
                    'Type': 'WhileStatement',
                    'Name': '',
                    'Condition': 'tmp < 4',
                    'Val': ''
                },
                {
                    'Line': 4,
                    'Type': 'AssignmentExpression',
                    'Name': 'tmp',
                    'Condition': '',
                    'Val': 'tmp + 1'
                },
                {
                    'Line': 6,
                    'Type': 'ReturnStatement',
                    'Name': '',
                    'Condition': '',
                    'Val': 'tmp'
                }
            ]
        );
    });


    it('test 2', () => {
        assert.deepEqual(
            parseCode('let x=8;\n' +
                'let y=1;\n' +
                'for(let i =0;i<5;i++) {\n' +
                '    y = y + 1;\n' +
                '    x = x - x;\n' +
                '   }'),
            [
                {
                    'Line': 1,
                    'Type': 'VariableDeclaration',
                    'Name': 'x',
                    'Condition': '',
                    'Val': 8
                },
                {
                    'Line': 2,
                    'Type': 'VariableDeclaration',
                    'Name': 'y',
                    'Condition': '',
                    'Val': 1
                },
                {
                    'Line': 3,
                    'Type': 'ForStatement',
                    'Name': '',
                    'Condition': 'i < 5',
                    'Val': ''
                },
                {
                    'Line': 4,
                    'Type': 'AssignmentExpression',
                    'Name': 'y',
                    'Condition': '',
                    'Val': 'y + 1'
                },
                {
                    'Line': 5,
                    'Type': 'AssignmentExpression',
                    'Name': 'x',
                    'Condition': '',
                    'Val': 'x - x'
                }
            ]
        );
    });
    it('is parsing a simple variable declaration correctly', () => {
        assert.deepEqual(
            parseCode('let x=0;\n' +
                'for(let i =0;i<5;i++) {\n' +
                '    x = x + 1;\n' +
                '   }\n' +
                '\n'),
            [
                {
                    'Line': 1,
                    'Type': 'VariableDeclaration',
                    'Name': 'x',
                    'Condition': '',
                    'Val': 0
                },
                {
                    'Line': 2,
                    'Type': 'ForStatement',
                    'Name': '',
                    'Condition': 'i < 5',
                    'Val': ''
                },
                {
                    'Line': 3,
                    'Type': 'AssignmentExpression',
                    'Name': 'x',
                    'Condition': '',
                    'Val': 'x + 1'
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



