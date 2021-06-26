
var laboratory = require('./dna-analizer');

/**
 * Lambda function: Validate if dna sequency its for human or mutant
 *
 * INPUT:
 *   - dna: String array with dna sequency
 *      Ex: "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
 * 
 * OUTPUT
 *  CODE 200 - Is a mutant
 *  CODE 403 - Is a human
 */

// Load AWS libraries to get information
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    try {
        //Validate param dna must be recieve
        if (!event.dna) {
            return {
                statusCode: 400,
                body: JSON.stringify('400-Bad Request not include dna data'),
            };
        }
        let dna = event.dna;
        laboratory.isReportedSequency(dna, dynamo).then(
            laboratoryResult => todo()
        );
        let process = 1;
        return {
            statusCode: 403,
            body: JSON.stringify('400-Forbidden'),
        };
    }
    catch(error){
        console.log(error) //TODO
    }
};