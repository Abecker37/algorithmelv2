const { table } = require('console');

let args = process.argv;


function transform(input,output){
    for(i = 0 ; i < input.length ; i++){
        let FullDate = new Date((input[i].release_date)*1000);
        let Year = FullDate.getFullYear();
        input[i].title = input[i].title + " " +"(" + Year + ")";
        nouveauJson( input[i], output);
    }
}

function nouveauJson(ajout, out){
    let writable = JSON.stringify(ajout,null,"\t");
    let fs = require('fs');
    fs.appendFileSync(out,writable);
}

function sort_date(input,output){
    for(i=input.length-1;i>=1;i--){
         for(j=0;j<=i-1;j++){
             if( input[j+1].release_date < input[j].release_date){
                 let tmp = input[j];
                 input[j]= input[j+1];
                 input[j+1] = tmp;
             }
         }
    }
    for(i=0; i<input.length; i++){
        nouveauJson( input[i], output);
    }
 }


for (i = 0 ; i < process.argv.length ; i++){
    if (args[i] == '-action'){
        if (args[i+1] == 'transform'){
            let input = require(args[i+2]);
            let output = args[i+3];
            start = new Date().getTime();
            transform(input,output);
            stop = new Date().getTime();
            console.log("time : " + (stop - start));
        }
        if (args[i+1] == 'sort_date'){
            let input = require(args[i+2]);
            let output = args[i+3];
            start = new Date().getTime();
            sort_date(input,output);
            stop = new Date().getTime();
            console.log("time : " + (stop - start));
        }
    }
}
