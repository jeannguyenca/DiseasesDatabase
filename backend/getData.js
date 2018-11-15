export function populateArray(inputArray, disease) {
 let array = [];
 array.push({ "name": disease });
 inputArray[disease].forEach(ele => {
  let atYear = parseInt(ele["dim"]["YEAR"]);
  let value = parseInt(ele["Value"]);
  let yearValue = [];
  if (value >= 10) {
    let duplicate = false;
    for(let i = 1; i < array.length; i++){
      // console.log(array[i].year);
      if (atYear === array[i].year){
        array[i].cases += value;
        duplicate = true;
      }
    }
    if(!duplicate){
      yearValue = { year: atYear, cases: value };
      array.push(yearValue);
    }
  }
   array.sort(function (a, b) {
    var aNum = a["year"];
    var bNum = b["year"];
    return aNum - bNum;
   });

 })
 return array;
}  

export function getData(country, year, db){
 //MongoDB query
 let data = db.collection("diseases")
  .aggregate([
   {
    $lookup: {
     from: "cho",
     pipeline: [
      {
       $match: {
        $and: [
         { "dim.COUNTRY": country },
         { "dim.YEAR": { $gte: year } }
        ]
       }
      }
     ],
     as: "cho"
    }
   },
   {
    $lookup: {
     from: "ntd",
     pipeline: [
      {
       $match: {
        $and: [
         { "dim.COUNTRY": country },
         { "dim.YEAR": { $gte: year } }
        ]
       }
      }
     ],
     as: "ntd"
    }
   },
   {
    $lookup: {
     from: "whs",
     pipeline: [
      {
       $match: {
        $and: [
         { "dim.COUNTRY": country },
         { "dim.YEAR": { $gte: year } }
        ]
       }
      }
     ],
     as: "whs"
    }
   },
    {
      $lookup: {
        from: "dia",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "dia"
      }
    },
    {
      $lookup: {
        from: "lep",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "lep"
      }
    },
    {
      $lookup: {
        from: "mal",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "mal"
      }
    },
    {
      $lookup: {
        from: "mea",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "mea"
      }
    },
    {
      $lookup: {
        from: "mum",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "mum"
      }
    },
    {
      $lookup: {
        from: "rub",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "rub"
      }
    },
    {
      $lookup: {
        from: "tub",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "tub"
      }
    ,
  },
    {
      $lookup: {
        from: "yel",
        pipeline: [
          {
            $match: {
              $and: [
                { "dim.COUNTRY": country },
                { "dim.YEAR": { $gte: year } }
              ]
            }
          }
        ],
        as: "yel"
      }
    }

  ]);
  return data;
}



