
const trolls = [
    {name: "Ollebolle", level: 62},
    {name: "Krollebolle", level: 31},
    {name: "Findus", level: 9},
];

//Level up trolls by 5

const levelUp = trolls.map((n) => [{name: n.name, level: n.level+5}])

console.log(levelUp)

//ForEach, map, filter, find, sort, 

//Create list where level is odd number

const oddTrolls = trolls.filter((n) => n.level%2!==0)

console.log(oddTrolls)
