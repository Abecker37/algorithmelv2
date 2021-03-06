let args = process.argv;

/**
 * Fonction permattant de transformer les secondes en année pour la date et de l'afficher dans un fichier json a coté du titre du film
 * @param {*} input : Fichier json d'entrée
 * @param {*} output :Fichier de sortie d'entrée
 */
function transform(input,output){
    for(i = 0 ; i < input.length ; i++){
        let FullDate = new Date((input[i].release_date)*1000);
        let Year = FullDate.getFullYear();
        input[i].title = input[i].title + " " +"(" + Year + ")";
        nouveauJson( input[i], output);
    }
}

/**
 * Fonction permettant de créer un nouveau json
 * @param {*} ajout : Chose a rajouter dans le fichier
 * @param {*} out : Fichier json qui sera modifier
 */
function nouveauJson(ajout, out){
    let writable = JSON.stringify(ajout,null,"\t");
    let fs = require('fs');
    fs.appendFileSync(out,writable);
}

/**
 * Fonction permettant de trier le fichier json par date de sortie
 * @param {*} input : Fichier json d'entrée
 * @param {*} output :Fichier de sortie d'entrée
 */
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

/**
 * Fonction permettant de trier le fichier json par ordre alphabétique
 * @param {*} input : Fichier json d'entrée
 * @param {*} output :Fichier de sortie d'entrée
 */
function sort_titre(input,output){
    for(i=input.length-1;i>=1;i--){
        for(j=0;j<=i-1;j++){
            if(input[j+1].title < input[j].title){
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

/**
 * Fonction permettant renvoyer en console tous les film sortie en une année donner si le fichier n'est pas trier
 * @param {*} input : Fichier json d'entrée
 * @param {*} search_year : Année de sortie de film rechercher
 */
function search_date_false(input,search_year){
    for(i=0 ; i<input.length ; i++){
        let FullDate = new Date((input[i].release_date)*1000);
        let Year = FullDate.getFullYear();
        if(Year == search_year){
            console.log(input[i])
        }
    }
}
/**
 * Fonction permettant renvoyer en console tous les film sortie en une année donner si le fichier est pas trier par date
 * @param {*} input : Fichier json d'entrée
 * @param {*} search_year : Année de sortie de film rechercher
 */
function search_date_true(input,search_year){
    let min = 0;
    let max = input.length;
    let middle = (min+max)/2;
    if (middle % 2 != 0){
        middle = middle-0.5;
    }
    let FullDate = new Date((input[middle].release_date)*1000);
    let middle_year = FullDate.getFullYear()
    while(search_year != middle_year){
        if(middle_year<search_year){
            min = middle;
            middle = (min+max)/2;
            if (middle % 1 != 0){
                middle = middle-0.5;
            }
            FullDate = new Date((input[middle].release_date)*1000);
            middle_year = FullDate.getFullYear()
        }
        if(middle_year>search_year){
            max = middle;
            middle = (min+max)/2;
            if (middle % 1 != 0){
                middle = middle-0.5;
            }
            FullDate = new Date((input[middle].release_date)*1000);
            middle_year = FullDate.getFullYear()
        }
    }
    while(middle_year == search_year){
        middle = middle-1;
        FullDate = new Date((input[middle].release_date)*1000);
        middle_year = FullDate.getFullYear()
    }
    middle = middle + 1;
    FullDate = new Date((input[middle].release_date)*1000);
    middle_year = FullDate.getFullYear()
    while(middle_year == search_year){
        console.log(input[middle]) ;
        middle = middle+1;
        FullDate = new Date((input[middle].release_date)*1000);
        middle_year = FullDate.getFullYear()
    }
}

/**
 * fonction permettant d'afficher en console le film le plus récent avec un genre donnée et un mot clé dans le résumé
 * @param {*} input : Fichier json d'entrée
 * @param {*} key_word : Mot clé qui doit apparaitre dans le résumé
 * @param {*} genre :Genre du film
 */
function search_key_word(input,key_word,genre){
    let recent_date = - 1000000000000000;
    let recent_movie
    for(i=0 ; i<input.length-1; i++){
        if(input[i].overview.includes(key_word)){
            try{
                if(input[i].genres.includes(genre)){
                    if(input[i].release_date>recent_date){
                        recent_date = input[i].release_date;
                        recent_movie = input[i];
                    }
                }
            }catch (Exception){
            }
            
        }
    }
    console.log(recent_movie);
}







for (i = 0 ; i < process.argv.length ; i++){
    if (args[i] == '-action'){
        let input = require(args[i+2]);
        start = new Date().getTime();
        if (args[i+1] == 'transform'){
            let output = args[i+3];
            transform(input,output);
        }
        if (args[i+1] == 'sort_date'){
            let output = args[i+3];
            sort_date(input,output);
        }
        if (args[i+1] == 'sort_titre'){
            let output = args[i+3];
            sort_titre(input,output);
        }
        if (args[i+1] == 'search_date'){
            let search_year = args[i+3];
            if (args[i+4] == 'false'){
                search_date_false(input,search_year);  
            }
            if (args[i+4] == 'true'){  
                search_date_true(input,search_year);
            }
        }
        if (args[i+1] == 'search_key_word'){
            let key_word = args[i+3];
            let genre = args[i+4];
            search_key_word(input,key_word,genre);
        }
        stop = new Date().getTime();
        console.log("time : " + (stop - start));
    }
}