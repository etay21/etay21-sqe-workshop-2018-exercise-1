import * as esprima from 'esprima';
import * as escodegen from 'escodegen';

const parseCode = (codeToParse) => {
    const func = esprima.parseScript(codeToParse,{loc: true});
    console.log(parser(func));
    return func;
};



const objectLine= (line,type,name,condition,val)=>
{
    return { Line:line, Type:type, Name:name, Condition:condition, Val:val};
};

const parser= (ast)=> {
    console.log(ast);

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
    }


};

const programParser= (ast)=>
{
    const obj= objectLine(ast.loc.start.line, ast.type, '', '','');
    return ast.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[obj]);
};

const FunctionDcl= (ast)=>
{
    const obj = objectLine(ast.loc.start.line, ast.type, ast.id.name, '','');
    const parms = ast.params.map((param)=> objectLine (param.loc.start.line,param.type, 'variable declaration','',''));
    const funBody = ast.body.body.reduce(((acc,curr)=> acc.concat(parser(curr))),[obj,parms]);
    return funBody;
};

const varDecl= (ast)=>
{
    const vars = ast.declarations.reduce((acc,curr) => acc.concat(objectLine(curr.loc.start.line, ast.type, curr.id.name,'','')),[]);
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
    return [tmp].concat(all);

};

export {parseCode};