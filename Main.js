let movie = require("./" + "movies.json");
let args = process.argv;


function transform(input,output){
    for(i = 0 ; i < input.length ; i++){
        let FullDate = new Date((input[i].release_date)*1000);
        let Year = FullDate.getFullYear();
        input[i].title = input[i].title + " " +"(" + Year + ")";
        nouveauJson( input[i], output)
    }
}

function nouveauJson(ajout, out){
    let writable = JSON.stringify(ajout,null,"\t");
    let fs = require('fs');
    fs.appendFileSync(out,writable);
}



for (i = 0 ; i < process.argv.length ; i++){
    if (args[i] == '-action'){
        if (args[i+1] == 'transform'){
            let input = require(args[i+2]);
            let output = args[i+3];
            transform(input,output);
        }
    }
}