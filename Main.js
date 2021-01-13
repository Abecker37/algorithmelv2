console.log(process.argv)
let args = process.argv;
for (i = 0 ; i < process.argv.length ; i++){
    if (args[i] == '-action'){
        console.log("salut")
    }
}