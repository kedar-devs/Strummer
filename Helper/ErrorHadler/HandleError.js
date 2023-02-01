exports.handleValidationError=(err)=>{
    console.log('in here')
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if(errors.length > 1) {
       const formattedErrors = errors.join(' ')
       return {messages: formattedErrors, fields:fields}
    }
    else{
    return {messages: errors, fields: fields}
    }
}

exports.handleDublicateError=(err)=>{
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    return {messages: error, fields: field}
}