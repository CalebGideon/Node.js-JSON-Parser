
//Attempt at lexicon

const lexicon = {
    LEFT_BRACE : "LEFT_BRACE",
    RIGHT_BRACE : "RIGHT_BRACE",
    LEFT_BRACKET : "LEFT_BRACKET",
    RIGHT_BRACKET : "RIGHT_BRACKET",
    COLON : "COLON",
    COMMA : "COMMA",
    NUMBER : "NUMBER",
    FLOAT_POINT : "FLOAT_POINT",
    STRING : "STRING",
    MINUS : "MINUS",
    TRUE : "TRUE",
    FALSE : "FALSE",
    NULL : "NULL"
};

var START_FLAG = true;
var KEY_FLAG = false;
var COLON_FLAG = false;
var PAIR_FLAG = false;
var ARRAY_FLAG = false;


const fs = require('fs');
//console.log(fs);
var path = './data/step4/valid.json';
var curr_token = 0

//Abstractify individual char's of string data to tokens

function tokenisation(data) {

    let tokens = [];
    let position = 0;
    //console.log(data.length);
    while(position < data.length) {
        //console.log(position + " " + data[position]);
        let char = data[position];

        if(char === "{") tokens.push({type : lexicon.LEFT_BRACE, value : '{'});
        else if(char === "}") tokens.push({type : lexicon.RIGHT_BRACE, value : '}'});
        else if(char === "[") tokens.push({type : lexicon.LEFT_BRACKET, value : '['});
        else if(char === "]") tokens.push({type : lexicon.RIGHT_BRACKET, value : ']'});
        else if(char === ":") tokens.push({type : lexicon.COLON, value : ':'});
        else if(char === ",") tokens.push({type : lexicon.COMMA, value : ','});
        else if(/[-]/.test(char)) tokens.push({type : lexicon.MINUS, value : '-'});
        else if(/[.]/.test(char)) tokens.push({type : lexicon.FLOAT_POINT, value : '.'});
        else if(char === '"') {
            let str = "";
            position += 1;
            while(data[position] !== '"') {
                str += data[position];
                position += 1;
            }
            tokens.push({type : lexicon.STRING, value : str});
        } 
        else if(/[0-9]/.test(char)) {
            let num = '';
            num += data[position];
            position += 1;
            while(/[0-9]/.test(data[position])) {
                num += data[position];
                position += 1;
            }
            tokens.push({type : lexicon.NUMBER, value : num});
            continue;
        } 
        else if(char === 't' && data.slice(position, position+4) === 'true') {
            tokens.push({type : lexicon.TRUE, value : 'true'});
            position += 3;
        }  
        else if(char === 'f' && data.slice(position, position+5) === 'false') {
            tokens.push({type : lexicon.FALSE, value : 'false'});
            position += 4;
        }   
        else if(char == 'n' && data.slice(position,position+4) == 'null') {
            tokens.push({type : lexicon.NULL, value : 'null'});
            position += 3;
        }
        else if(/\s/.test(char)) {
            //NOTHING FOR WHITE SPACE
        }
        else {
            throw new Error(`Unexpected Character: ${char}`);
        }
        position += 1;
    }

    return tokens;
}

//NEEDS TO BE IN ITS OWN FUNCTION FFS

function Parse(data) {
    let tokens = tokenisation(data);
    //console.log(tokens);

    if(tokens.length == 0) {
        throw new Error(`JSON is empty: ${tokens}`);
    }

    //Main parsing loop
    var JSON_Complete = ParseMain(tokens, data);
    curr_token = 0;

    console.log(`Parsed JSON object successfull: ${JSON_Complete}`);
    return JSON_Complete;
}

module.exports = { Parse };

fs.readFile(path, 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    //console.log(data);
    Parse(data);
});


function ParseMain(tokens, data) {
    let JSON_Complete;
    if(tokens[curr_token].type === lexicon.LEFT_BRACE) {
        KEY_FLAG = true;
        JSON_Complete = ParseObject(tokens, data);
        START_FLAG = false;
    }
    else if(tokens[curr_token].type === lexicon.LEFT_BRACKET) {
        ARRAY_FLAG = true;
        JSON_Complete = ParseArray(tokens, data);
        START_FLAG = false;
    }

    if(START_FLAG == true) {
        throw new Error(`JSON does not have correct formatting: ${data} bad token! ${tokens[curr_token].type}`);
    }

    return JSON_Complete;
}

function ParseObject(tokens, data) {
    let _value;
    let _key;
    let new_object = {};
    curr_token += 1; // Move past the opening brace

    while(curr_token < tokens.length && tokens[curr_token].type !== lexicon.RIGHT_BRACE) {

        if(KEY_FLAG === true) {
            if(tokens[curr_token].type === lexicon.STRING) {
                _key = tokens[curr_token].value;
                KEY_FLAG = false;
                COLON_FLAG = true;
            } else {
                throw new Error(`JSON does not have correct formatting: ${data} bad token! ${tokens[curr_token].type}`);
            }
        } 
        
        else if(COLON_FLAG === true) {
            if(tokens[curr_token].type !== lexicon.COLON) {
                throw new Error(`JSON does not have correct formatting: ${data} bad token! ${tokens[curr_token].type}`);
            }
            COLON_FLAG = false;
        } 
        
        else if(PAIR_FLAG === true) {
            if(tokens[curr_token].type === lexicon.COMMA) {
                KEY_FLAG = true;
                PAIR_FLAG = false;
            } else {
                throw new Error(`JSON does not format key-pair values correctly: ${data} bad token! ${tokens[curr_token].type}`);
            }
        } 
        
        else {
            _value = ParseValue(tokens, data);
            new_object[_key] = _value;
            PAIR_FLAG = true;
        }
        //console.log(tokens[curr_token]);
        //console.log(curr_token + " " + tokens.length);
        curr_token += 1;
    }
    
    //if comma was added even though it was last key-pair, key_flag will still be true, expecting next key-pair. ERROR!
    if(KEY_FLAG === true && tokens[curr_token-1].type !== lexicon.LEFT_BRACE) {
        throw new Error(`Expected additional key-pair: ${data} bad token! ${tokens[curr_token].type}`);
    }

    KEY_FLAG = false;
    PAIR_FLAG = false;
    curr_token += 1; // Move past the closing brace
    return new_object;
}

function ParseNumber(tokens, data) {

    let value = '';

    if(tokens[curr_token].type === lexicon.MINUS) {
        value += tokens[curr_token].value;
        curr_token += 1;

        if(tokens[curr_token].type !== lexicon.NUMBER) {
            throw new Error(`JSON expects number after minus: ${data} bad token! ${tokens[curr_token].type}`);
        }
    }

    value += tokens[curr_token].value;

    if(curr_token+1 < tokens.length && tokens[curr_token+1].type === lexicon.FLOAT_POINT) {
        if(curr_token+2 < tokens.length && tokens[curr_token+2].type === lexicon.NUMBER) {
            value = parseFloat(value + tokens[curr_token+1].value + tokens[curr_token+2].value);
            curr_token += 2;
        } 
        
        else {
            throw new Error(`JSON does not have correct numerical value for key-pair: ${data} bad token! ${tokens[curr_token].type}`);
        }
    } 
    
    else {
        value = parseInt(value);

    }
    return value;
}

function ParseArray(tokens, data) {
    curr_token += 1; // Move past the opening bracket

    var new_array = [];

    while(curr_token < tokens.length && tokens[curr_token].type !== lexicon.RIGHT_BRACKET) {

        if(ARRAY_FLAG === true) {

            var elem = ParseValue(tokens, data);
            new_array.push(elem);
            ARRAY_FLAG = false;
        }

        else {
            if(tokens[curr_token].type !== lexicon.COMMA) {
                ARRAY_FLAG = true;
                throw new Error(`JSON Array does not have correct formatting: ${data} bad token! ${tokens[curr_token].type}`);
            }
        }
        //console.log(tokens[curr_token]);
        //console.log(curr_token + " " + tokens.length);
        curr_token += 1;

    }

    if(ARRAY_FLAG === true && tokens[curr_token-1].type !== lexicon.LEFT_BRACKET) {
        throw new Error(`JSON Array does not have correct formatting: ${data} bad token! ${tokens[curr_token].type}`);
    }

    ARRAY_FLAG == false;
    curr_token++;
    return new_array;
}

function ParseValue(tokens, data) {
     // Value parsing
     var _value;
     if(tokens[curr_token].type === lexicon.LEFT_BRACE) {
        KEY_FLAG = true;
        _value = ParseObject(tokens, data);
        curr_token -= 1; //Value is incremented, so remove one here to account for entire object parse incremenet
    } 
    
    else if(tokens[curr_token].type === lexicon.LEFT_BRACKET) {
        ARRAY_FLAG = true;
        _value = ParseArray(tokens, data);
        curr_token -= 1; //Value is incremented, so remove one here to account for entire array parse incremenet
    } 
    
    else if(tokens[curr_token].type === lexicon.NULL) {
        value = null;
    } 

    else if(tokens[curr_token].type === lexicon.NUMBER || tokens[curr_token].type === lexicon.MINUS) {
        _value = ParseNumber(tokens, data);
    } 
    
    else if(tokens[curr_token].type === lexicon.STRING) {
        _value = tokens[curr_token].value;
    } 
    
    else if(tokens[curr_token].type === lexicon.TRUE) {
        _value = true;
    } 
    
    else if(tokens[curr_token].type === lexicon.FALSE) {
        _value = false;
    } 
    
    else {
        throw new Error(`Unexpected token type: ${data} bad token! ${tokens[curr_token].type}`);
    }

    return _value;
}
