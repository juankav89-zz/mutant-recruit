/**
 * Validate nitrogenBasec
 * @param {string} data 
 * @param {array} predecessors 
 * @param {boolean} firstGene 
 */
function validateNitrogenBase(data, nitrogenBaseKey, key, predecessors) {
    return new Promise((resolve, reject) => {
        //Load data on predecessors map
        let nitrogenBase = {"letter":data,"count":0}
        
        // Obtaion letters to validate
        let map = [
            predecessors[key-1][nitrogenBaseKey].top.letter ?? '',
            predecessors[key-1][nitrogenBaseKey].topLeft.letter ?? '',
            predecessors[key][nitrogenBaseKey-1].left.letter ?? ''
        ];
        let topCount = predecessors[key-1][nitrogenBaseKey].top.count ?? 0;
        let topLeftCount = predecessors[key-1][nitrogenBaseKey].topLeft.count ?? 0;
        let leftCount = predecessors[key-1][nitrogenBaseKey].left.count ?? 0;
        if (map[0]==data) {
            topCount = topCount + 1;
        }
        if (map[1]==data) {
            topLeftCount = topLeftCount + 1;
        };
        if (map[2]==data) {
            leftCount = leftCount + 1;
        };
        if ([topCount, topLeftCount, leftCount].includes(4)) {
            resolve(true);
        }
        predecessors[key][nitrogenBaseKey] = {
            top: {
                letter:data,
                count:topCount
            },
            left: {
                letter:data,
                count:leftCount
            },
            topLeft: {
                letter:data,
                count:topLeftCount
            },
        }
        reject(predecessors);
    });
};

function firstBasePairValidation(data) {
    return new Promise((resolve, reject) => {
        let firstCase = ["AAAA", "TTTT", "CCCCC", "GGGG"]
        return firstCase.includes(data.substring(0, 4).toUpperCase()) ? resolve() : reject()
    });
}

/**
 * Get information from adn "basePair" and validate nitrogen base 
 * @param {*} data 
 * @param {*} key 
 * @param {*} predecessors 
 */
function validateBasePair(data, key, predecessors) {
    data.split('').forEach(function (nitrogenBase, nitrogenBaseKey) {
        validateNitrogenBase(nitrogenBase, nitrogenBaseKey, key, predecessors).then(()=>{
            resolve();
        }).catch(predecessors => revoke(predecessors));
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
  