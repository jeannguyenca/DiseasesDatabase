export function populateArray(inputArray, disease) {
 let array = [];
 array.push({ "name": disease });
 inputArray[disease].forEach(ele => {
  let atYear = parseInt(ele["dim"]["YEAR"]);
  let value = parseInt(ele["Value"]);
  let yearValue = [];
  if (value != 0) {
   yearValue = { year: atYear, cases: value };
   array.push(yearValue);
   array.sort(function (a, b) {
    var aNum = a["year"];
    var bNum = b["year"];
    return aNum - bNum;
   });
  }
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
   }
  ]);
  return data;
}



