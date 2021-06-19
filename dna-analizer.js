/*
predecessors strcutrure array:
[
    top-left => [
        letter, count
    ],
    top => [
        letter, count
    ],
    top-right => [
        letter, count
    ],
    left => [
        letter, count
    ],
    right => [
        letter, count
    ],
    under-left => [
        letter, count
    ],
    under => [
        letter, count
    ],
    under-right => [
        letter, count
    ],
]
 */
function validateNitrogenBase(data, predecessors) {
    //regex validation prevent recieve data with not valid characters
    if (/^[a-zA-Z]+$/.test(data)) {
        // check list of precesors to validate if its posible mutant if some of next rules continue
        /*
            predecessors[top-left] its same
            predecessors[top] its same
            predecessors[top-right] its same
            predecessors[left] its same
            predecessors[right] its same
            predecessors[under-left] its same
            predecessors[under] its same
            predecessors[under-right] its same

            if some of predecessors count more than 4 same letters, stop process and report mutant
        */
    }
    throw Error;

};

module.exports = {
    isReportedSequency: function (dnaSequency) {
        var params = {
            TableName : "dna_sequency",
            KeyConditionExpression: "#sequency = :dna ",
            ExpressionAttributeNames:{
                "#sequency": "sequency"
            },
            ExpressionAttributeValues: {
                ":dna": dnaSequency
            }
        };

        docClient.query(params, function(err, data) {
            if (err) {
                // response revoke promise            
            } else {
                // data.Items (list of items)
                // response resolve sequency with data
            }
        });
    },
    recordSequency: function (dnaSequency) {
        var params = {
            TableName : "dna_sequency",
            KeyConditionExpression: "#sequency = :dna ",
            ExpressionAttributeNames:{
                "#sequency": "sequency"
            },
            ExpressionAttributeValues: {
                ":dna": dnaSequency
            }
        };

        docClient.put(params, function(err, data) {
            if (err) {
                // response revoke promise            
            } else {
                // data.Items (list of items)
                // response resolve sequency with data
            }
        });
    },
    isMutantSequency(dna) {
        let predecessors = [];
        dna.array.forEach(element => {
            element.split('').forEach(nitrogenBase => {
                let result = validateNitrogenBase(nitrogenBase, predecessors);
                if (result.isMutant){
                    //response mutant resolve promise
                }
                predecessors = result.predecessors;
            });
        });
        // response revoke promise 
    }
  };
  