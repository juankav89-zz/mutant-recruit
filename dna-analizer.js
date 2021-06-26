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
/**
 * Validate nitrogenBasec
 * @param {string} data 
 * @param {array} predecessors 
 * @param {boolean} firstGene 
 */
function validateNitrogenBase(data, key, predecessors, firstGene) {
    //regex validation prevent recieve data with not valid characters
    if (/^[ATCG]+$/.test(data)) {
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

function firstBasePairValidation(data) {
    return new Promise((resolve, reject) => {
        let firstCase = ["AAAA", "TTTT", "CCCCC", "GGGG"]
        return firstCase.includes(data.substring(0, 4).toUpperCase()) ? resolve() : reject()
    });
}

function validateBasePair(data, key, predecessors) {
    
    data.split('').forEach(nitrogenBase => {
        let result = validateNitrogenBase(nitrogenBase, key, predecessors, firstGene);
        if (result.isMutant){
            //response mutant resolve promise
            resolve();
        }
        revoke(result.predecessors);
    });
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
        //Validate data integrity
        dna.array.forEach(function (element, key, array) {
            if (!(/^[ATCG]+$/.test(data))) {
                revoke({"error" : "Not Valid Data"});
            }
        });
        //start information process
        dna.array.forEach(function (element, key, array) {
            if (key == 0) {
                firstBasePairValidation(element)
                    .then(() => resolve(dna))
                    .catch(() => {/*used to catch first process*/})
                    .then(() => validateBasePair(element, key, predecessors))
                    .then(result = resolve(dna))
                    .catch(result => predecessors = result);
                    ;
            } else {
                validateBasePair(element, key, predecessors)
                .then(resolve(dna))
                .catch(result => predecessors = result)
                ;
            }
            firstGene = false;
        });
        // response revoke promise 
    }
  };
  