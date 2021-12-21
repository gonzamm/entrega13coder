function repeatNumbers(num){
    let objRepeat = {};
    //Bucle FOR para generar numeros del 1 al 1000, y generar un objeto con los numeros que se repitan
    for (let i = 0; i < num; i++) {
        nroRandom = Math.trunc(Math.random()*(1001)); //Genero un numero aleatorio del 1 al 1000
        //IF para fijarse si el objeto ya tiene ese numero, si no lo tiene lo genera, si lo tiene le suma 1
        if (objRepeat.hasOwnProperty(nroRandom) === false){
            objRepeat[nroRandom] = 1
        } else {
            objRepeat[nroRandom]++
        }
    }
    return objRepeat;
}

process.on('message', (cant)=>{
    let repeat = repeatNumbers(cant);
    process.send(repeat);

})