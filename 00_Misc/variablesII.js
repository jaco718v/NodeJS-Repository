"use strict"

//totalGlobalVariable = "Don't do it like this"
//var globalVariable = "Also no"

//const arguments = 123

function anotherScope(){
    //function scrop
}

{
    //Block scope
}

{   
    console.log("Block scope here")
}

/*{
    var something = true
    {
        var something = false  //var bløder ud
    }
    console.log(something)
}*/

{
    let something = true
    {
        let something = false
    }
    console.log(something)
}

