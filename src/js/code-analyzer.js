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
    parms.map((name)=> env[name]= name);
    const bodyN = parseCode(ast.body,params,env);
    ast.body=bodyN;
    return ast;

};


const varDecl= (ast,params,env)=>
{
    ast.declarations.map((dec)=> {const value = dec.init;
                                    if(value === undefined)
                                    {
                                        env[dec.id.name] =null;
                                    }
                                    else {
                                        env[dec.id.name] =escodegen.generate(sub(env,value));
                                    }}
    )
    return ast;

};

const assDecl= (ast,params,env)=>
{
    env[ast.left.name] = escodegen.generate(sub(env,ast.right));
    return ast;
   /// return  objectLine(ast.expression.loc.start.line, ast.expression.type, escodegen.generate(ast.expression.left), '',escodegen.generate(ast.expression.right));

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




const whilExp= (ast,params,env)=>{

    const test = sub(ast.test,env);
    var newEnv = Object.assign({},env);
    const bodyN = parseCode(ast.body,newEnv);
    ast.body=bodyN;
    //TODO EVALLLLLLLLLLLLLLLLLLLLLL
    ast['testTF'] = checkTest(ast.test,ast,params,env)
    //END EVALLLLLLLL
    return ast;
};


const checkTest(ast.test,ast,params,env) =>{
//TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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