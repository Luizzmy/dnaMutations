const Mutation=require('../models/Mutation.model')

exports.verifMutation= async (req,res)=>{
  const {
    dna
  }= req.body

  const adn= await Mutation.findOne({dna})
  if (adn){
    return res
    .status(403)
    .json({message:"That DNA has already been recorded"})
  } 

  if(dna.length!=6){
    return res
    .status(403)
    .json({message:"There is something wrong with the number of dna chains, please try again"})
  }
  
  let arrl=false
  dna.forEach(i=>{
    if(i.length!=6){
      arrl=true
     }
  })

  let wl=false
  let acc=0
  let narr=dna.join("").split("")
  narr.forEach(l=>{
    if(l=="A"||l=="C"||l=="G"||l=="T"){
      acc++
    }else{
      acc=acc
    }
    if(acc!=narr.length){
      wl=true
    } else{
      wl=false
    }
  })

  if(arrl || wl){
    return res
    .status(403)
    .json({message:"Please check you have 6 letters in each chain and that they are A, T, C or G"})
  } else {
    const mutation = hasMutation(dna)
    await Mutation.create({
      dna,
      mutation
    })
    return res
    .status(200)
    .json(dna)
  }
    
  function hasMutation(dna){
  
    //Get frequencies of chars function
   function getCharFrequencies(str) {
     let freq={}
     for(let i=0; i<str.length; i++){
       let char=str.charAt(i)
       if(char==str.charAt(i+1)){
         if(freq[char]){
         freq[char]++
       } else {
         freq[char]=1
       }}
     }
   return freq
   }
    
    //Transform original array to columns function
    function columns(arr){
    let res=[]
    for(let j=0;j<6;j++){
        let colArr=[]
      for(let i=0;i<6;i++){
      let newArr=[]
      newArr.push(arr[i][j])
      colArr.push(newArr[0])
    }
    res.push(colArr.join(""))
    }
        return res
    }
    
    //Get left to right diagonals
   function leftToRight(array){
    let res=[]
    let Ylength = array.length;
    let Xlength = array[0].length;
    let maxLength = Math.max(Xlength, Ylength);
    let temp;
    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
      temp = [];
      for ( let y = Ylength - 1; y >= 0; --y) {
          let x = k - y;
          if (x >= 0 && x < Xlength) {
              temp.push(array[y][x]);
          } 
      }
     if(temp.length > 3) {
          res.push(temp.join(""))
      }
  }
    return res
  }
    //rightToLeft diagonals
    function rightToLeft(array){
    let res=[]
  let Ylength = array.length;
  let Xlength = array[0].length;
  let maxLength = Math.max(Xlength, Ylength);
  let temp;
  for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
      temp = [];
      for (let y = Ylength - 1; y >= 0; --y) {
          let x = k - (Ylength - y);
          if (x >= 0 && x < Xlength) {
              temp.push(array[y][x]);
          } 
      }
    if(temp.length > 3) {
          res.push(temp.join(""))
      }
  }
    return res
  }
    
    //Check frequencies of rows
    let counter=0
    dna.forEach(i=>{
      let fr=getCharFrequencies(i)
      for(const prop in fr){
        if(fr[prop]>=3){
          counter++
        }
      }
    })
    
    //Check frequencies of columns
    columns(dna).forEach(i=>{
      let fr=getCharFrequencies(i)
      for(const prop in fr){
        if(fr[prop]>=3){
          counter++
        }
      }
    })
    
    //Check frequencies leftToRight Diagonals
    leftToRight(dna).forEach(i=>{
      let fr=getCharFrequencies(i)
      for(const prop in fr){
        if(fr[prop]>=3){
          counter++
        }
      }
    })
    
    //Check frequencies rightToLeft Diagonals
      rightToLeft(dna).forEach(i=>{
      let fr=getCharFrequencies(i)
      for(const prop in fr){
        if(fr[prop]>=3){
          counter++
        }
      }
    })
    
    if(counter>=2){
      return true
    } else{
      return false
    }
  }

}