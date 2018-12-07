import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

const parseCode = (codeToParse,params) => {
    const func = esprima.parseScript(codeToParse,{loc: true});
    let env= {};

    return parser(func,params,env);
};



const parser= (ast,params,env)=> {
    let check = ast.type;
    if(check==='Program')
        return programParser(ast,params,env);
    else if (check === 'ForStatement')
        return forExp(ast,params,env);
    else if(check==='VariableDeclaration')
        return varDecl(ast,params,env);
    else if(check==='ExpressionStatement')
        return  assDecl(ast,params,env);
    else
        return parser2(ast,params,env);

};

const parser2= (ast,params,env)=> {
    let check = ast.type;
    switch (check) {
    case 'WhileStatement':
        return whilExp(ast,params,env);
    case 'IfStatement':
        return ifExp(ast,params,env);
    case 'ReturnStatement':
        return returnExp(ast,params,env);
    case 'FunctionDeclaration':
        return FunctionDcl(ast,params,env);
       case 'BlockStatement':
           return blockStament(ast,params,env);
    }
};
const blockStament(ast,params,env) =>
{

};

const programParser= (ast,params,env)=>
{
    //const obj= objectLine(ast.loc.start.line, ast.type, '', '','');
    //return ast.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[obj]);
    return ast.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[]);
};

const FunctionDcl= (ast,params,env)=>
{
    //const obj = objectLine(ast.loc.start.line, ast.type, ast.id.name, '','');
    const parms = ast.params.reduce((acc,curr)=> acc.concat(curr.name),[]);
    parms.map((name)=> env[name]= name)
    const body = 
    return ast.body.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[obj].concat(parms));

};

const varDecl= (ast,params,env)=>
{
    env = ast.declarations.reduce((acc,curr) => Object.assign({Var:curr.id.name ,Val: curr.init ? escodegen.generate(curr.init) : ''} , env));
    //return ast.declarations.reduce((acc,curr) =>
    //    acc.concat(objectLine(curr.loc.start.line, ast.type, curr.id.name,'',curr.init ? escodegen.generate(curr.init) : '')),[]);
    return null;

};

const assDecl= (ast,params,env)=>
{

    return  objectLine(ast.expression.loc.start.line, ast.expression.type, escodegen.generate(ast.expression.left), '',escodegen.generate(ast.expression.right));

};

const whilExp= (ast,params,env)=>{

    const test = escodegen.generate(ast.test);
    const tmp= objectLine (ast.loc.start.line,ast.type, '',test,'');
    const all = ast.body.body.reduce((acc,curr) => acc.concat(parser(curr)),[]);
    // const all = parser(ast.body.body);
    return [tmp].concat(all);

};

const ifExp= (ast,params,env)=> {
    const test = escodegen.generate(ast.test);
    let all;
    let tmp=findTmp(ast,test);
    let ezer = findAlt(ast);
    if (ast.consequent.body === undefined) {
        all = parser(ast.consequent);
    }
    else {
        all = ast.consequent.body.reduce((acc, curr) => acc.concat(parser(curr)), []);
    }
    if (ezer === '') {
        return [tmp].concat(all);
    }
    else {
        return [tmp].concat(all).concat(ezer);
    }
};



const returnExp= (ast,params,env)=> {
    const test = objectLine (ast.loc.start.line,ast.type, '','', escodegen.generate(ast.argument));
    return [test];
};
const forExp= (ast,params,env)=>{

    const test = escodegen.generate(ast.test);
    const tmp= objectLine (ast.loc.start.line,ast.type, '',test,'');
    const all = ast.body.body.reduce((acc,curr) => acc.concat(parser(curr)),[]);
    return [tmp].concat(all);

};

export {parseCode};