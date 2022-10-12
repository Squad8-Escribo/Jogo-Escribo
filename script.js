
//Menus codes

const buttonsLevel= async()=>{
    
    const response = await fetch("fases.json");
    const data = await response.json();
    buttons.innerHTML="";
    text.innerHTML="";
    result.innerHTML="";
    for(let i=0;i<data.length;i++){
        buttons.innerHTML+=`<input type="button" onclick="chooseLevel(${i})" value="Level ${i+1}"><br>`;
    }
}
buttonsLevel()

const chooseLevel =  async(level) => {
    const response = await fetch("fases.json");
    const data = await response.json();
    text.innerHTML="";
    buttons.innerHTML="";
    for(let i=0;i<data[level].length;i++){
        buttons.innerHTML+=`<input type="button" onclick="choosePhase(${i},${level})" value="${Object.keys(data[level][i])}"/><br>`;
    }
  };



//Game codes

const choosePhase = async(phase,level)=>{
    result.innerHTML="";
    text.innerHTML="";
    const response = await fetch("fases.json");
    const data = await response.json();

    //level passing system

    if(phase>=data[level].length){
        level++;
        phase=0;
    }
    if(level>=data.length){
        buttonsLevel()
        alert("Parabens voce terminou o jogo");
    }
    //get array for json

    var phaseName=Object.keys(data[level][phase]);
    var phaseName=phaseName[0]
    const arrayText=(data[level][phase][phaseName]);

    //if chosse word, one by one

    if(phaseName=="palavras"){
        buttons.innerHTML=`<br><input type="button" onclick="startArtyon()" value="Começar"/></br>`;
        var hits=0;
        let numberWord=0;
        text.innerHTML=arrayText[numberWord];

        artyom.redirectRecognizedTextOutput(function(text,isFinal){
            if(isFinal){
                var arrayWord=Artyom.prototype.splitStringByChunks(text,1);
                    console.log(arrayWord[0].trim().toLowerCase()+"<-recebe|json->"+arrayText[numberWord].toLowerCase())
                    console.log(arrayWord[0].trim().toLowerCase()==arrayText[numberWord].toLowerCase())
                    if(arrayWord[0].trim().toLowerCase()==arrayText[numberWord].toLowerCase()){
                        hits++;
                        numberWord++;
                    }
            }
        });

    //others cases

    }else{
        buttons.innerHTML=`<br><input type="button" onclick="startArtyon()" value="Começar"/></br>`;
        for(var i=0;i<arrayText.length;i++){
            text.innerHTML+=arrayText[i];
        }

        artyom.redirectRecognizedTextOutput(function(text,isFinal){
            if(isFinal){
                let hits=0;
                var arrayWord=Artyom.prototype.splitStringByChunks(text,1);
                for(var i=0;i<arrayWord.length;i++){
                    console.log(arrayWord[i].trim().toLowerCase()+"<-recebe|json->"+arrayText[i].trim().toLowerCase())
                    console.log(arrayWord[i].trim().toLowerCase()==arrayText[i].trim().toLowerCase())
                    if(arrayWord[i].trim().toLowerCase()==arrayText[i].trim().toLowerCase()){
                        hits++;
                    }
                }
                if(hits>=(arrayWord.length*0.9)){
                    result.innerHTML="Parabes voce conseguiu 3 estrelas<br>";
                }else if(hits>=(arrayWord.length*0.75)){
                    result.innerHTML="Voce conseguiu 2 estrelas<br>";
                }else if(hits>=(arrayWord.length*0.5)){
                    result.innerHTML="Voce consegiu 1 estrelas<br>";
                }else{
                    result.innerHTML="Voce nao conseguiu nenhuma estrela";
                }
                result.innerHTML+=`<input type="button" onclick="choosePhase(${(phase+1)},${level})" value="Proxima fase"/><br>`;
                result.innerHTML+=`<input type="button" onclick="buttonsLevel()" value="Voltar ao começo"/><br>`;
                stopArtyon();
            }
        });
    } 

}
//Artyom codes

var artyom = new Artyom();


    artyom.addCommands([//precisa de um comando
        {
          descripition:"Lendo zebra",
          indexes:["Zebra"],
          action:function(i){  
            if(i==0){
                h3.innerHTML=`Acertou`;
            }
          }
        },
    ]); 

    function startArtyon(){
        artyom.initialize({
            lang:"pt-BR",
            continuous:false, // Listen forever, dps de um comando ele continua ouvindo
            soundex: false, // Use the soundex algorithm to increase accuracy
            debug:true, // Show messages in the console
            listen:true // Start to listen commands !
        })
    }

    function stopArtyon(){
        artyom.fatality();
    }