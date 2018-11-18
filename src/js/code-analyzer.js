import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

const parseCode = (codeToParse) => {
    const func = esprima.parseScript(codeToParse,{loc: true});
    return parser(func);
};

var elseif=0;

const objectLine= (line,type,name,condition,val)=>
{
    return { Line:line, Type:type, Name:name, Condition:condition, Val:val};
};


const parser= (ast)=> {
    let check = ast.type;
    if(check==='Program')
        return programParser(ast);
    else if(check==='FunctionDeclaration')
        return FunctionDcl(ast);
    else if(check==='VariableDeclaration')
        return varDecl(ast);
    else if(check==='ExpressionStatement')
        return  assDecl(ast);
    else
        return parser2(ast);

};
const parser2= (ast)=> {
    let check = ast.type;
    if (check === 'WhileStatement')
        return whilExp(ast);
    else if (check === 'IfStatement')
        return ifExp(ast);
    else if (check === 'ReturnStatement')
        return returnExp(ast);
    else if (check === 'ForStatement')
        return forExp(ast);
    return;
};
/*
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
        return  forExp(ast);}};

*/
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
const findTmp=(ast,test)=>
{
    if (elseif == 0) {
        return  objectLine(ast.loc.start.line, ast.type, '', test, '');
    }
    else {
        return objectLine(ast.loc.start.line, 'else if statement', '', test, '');
    }
};

const findAlt=(ast)=>
{
    if (ast.alternate === null) {
        elseif = 0;
        let ezer = '';
        return ezer;
    }
    else {

        elseif = 1;
        let ezer = parser(ast.alternate);
        elseif = 0;
        return ezer;
    }
};
const ifExp= (ast)=> {
    const test = escodegen.generate(ast.test);
    let all;
    let tmp=findTmp(ast,test);
    let ezer = findAlt(ast);
    //let ezer= ast.alternate ? parser(ast.alternate) : '';
    //ast.consequent.reduce((acc, curr) => acc.concat(parser(curr)), []);
    if (ast.consequent.body === undefined) {
        all = parser(ast.consequent);
    }
    else
        all = ast.consequent.body.reduce((acc, curr) => acc.concat(parser(curr)), []);
    if (ezer === '') {
        return [tmp].concat(all);
    }
    else {
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