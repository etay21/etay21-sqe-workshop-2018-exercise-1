import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

const parseCode = (codeToParse) => {
    const func = esprima.parseScript(codeToParse,{loc: true});
    console.log(func);
    return parser(func);
};

var elseif=0;

const objectLine= (line,type,name,condition,val)=>
{
    return { Line:line, Type:type, Name:name, Condition:condition, Val:val};
};

const parser= (ast)=> {


    switch (ast.type) {
    case 'Program':
        return programParser(ast);
    case 'FunctionDeclaration':
        return  FunctionDcl(ast);
    case 'VariableDeclaration':
        return  varDecl(ast);
    case 'ExpressionStatement':
        return  assDecl(ast);
    case 'WhileStatement':
        return  whilExp(ast);
    case 'IfStatement':
        return  ifExp(ast);
    case 'ReturnStatement':
        return  returnExp(ast);
    case 'ForStatement':
        return  forExp(ast);

    }


};

const programParser= (ast)=>
{
    //const obj= objectLine(ast.loc.start.line, ast.type, '', '','');
    //return ast.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[obj]);
    return ast.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[]);
};

const FunctionDcl= (ast)=>
{

    const obj = objectLine(ast.loc.start.line, ast.type, ast.id.name, '','');
    const parms = ast.params.map((param)=> objectLine (param.loc.start.line,'variable declaration',param.name ,'',''));
    const funBody = ast.body.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[obj].concat(parms));
    return funBody;
};

const varDecl= (ast)=>
{

    const vars = ast.declarations.reduce((acc,curr) => acc.concat(objectLine(curr.loc.start.line, ast.type, curr.id.name,'',curr.init ? curr.init.value : '')),[]);
    return vars;
};

const assDecl= (ast)=>
{

    const obj = objectLine(ast.expression.loc.start.line, ast.expression.type, ast.expression.left.name, '',escodegen.generate(ast.expression.right));
    return obj;
};

const whilExp= (ast)=>{

    const test = escodegen.generate(ast.test);
    const tmp= objectLine (ast.loc.start.line,ast.type, '',test,'');
    const all = ast.body.body.reduce((acc,curr) => acc.concat(parser(curr)),[]);
    // const all = parser(ast.body.body);
    return [tmp].concat(all);

};
const ifExp= (ast)=> {

    const test = escodegen.generate(ast.test);
    let all;
    let tmp;
    let ezer;
    debugger;
    console.log("etayyyyyy");
    if (elseif == 0) {
        console.log('1');
        tmp = objectLine(ast.loc.start.line, ast.type, '', test, '');
    }
    else {
        console.log('2');
        tmp = objectLine(ast.loc.start.line, 'else if statement', '', test, '');
    }
    //let ezer= ast.alternate ? parser(ast.alternate) : '';
    if (ast.alternate === null) {
        console.log('3');
        elseif = 0;
        ezer = '';
    }
    else {
        console.log('4');
        elseif = 1;
        ezer = parser(ast.alternate);
        elseif = 0;
    }

    //ast.consequent.reduce((acc, curr) => acc.concat(parser(curr)), []);


    if (ast.consequent.body === undefined) {
        console.log('5');
        all = parser(ast.consequent);

    }

    else {
        console.log('6');

        all = ast.consequent.body.reduce((acc, curr) => acc.concat(parser(curr)), []);

    }

    //  const all = parser(ast.consequent);

    if (ezer === '') {
        console.log('7');
        return [tmp].concat(all);
    }
    else {
        console.log('8');

        return [tmp].concat(all).concat(ezer);
    }

};
const returnExp= (ast)=> {
    const test = objectLine (ast.loc.start.line,ast.type, '','', escodegen.generate(ast.argument));
    return [test];
};
const forExp= (ast)=>{

    const test = escodegen.generate(ast.test);
    const tmp= objectLine (ast.loc.start.line,ast.type, '',test,'');
    const all = ast.body.body.reduce((acc,curr) => acc.concat(parser(curr)),[]);
    return [tmp].concat(all);

};


export {parseCode};