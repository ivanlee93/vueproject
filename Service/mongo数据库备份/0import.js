import * as path from "path";
import * as fs from "fs";
const promisify = require("bluebird").promisify;
const appendFileAsync = promisify(fs.appendFile);


const BATCH_SIZE = 100;

let connection = "localhost";
let database = "personnelyy";
let targetPath = "C:\\VueProject\\Service\\mongo数据库备份";

if (!fs.existsSync(targetPath))
    require("mkdirp").sync(targetPath);

let exportCollections = [
    { collection: "clients", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "competents", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "departments", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "leaves", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "majors", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "positions", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "userinfos", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] },
    { collection: "workschedules", query: {}, projection: {}, sort: {}, skip: 0, limit: 0, exportType: "json", fields: [] }
];
let totalDocs = 0;
let collectionResult = {};//collectionResult:{[name:string]:number}

function exportCollection(collectionParams) {
    let { collection, filename, query, projection, sort, skip, limit, fields, exportType } = collectionParams;

    let continueRead = true;
    let filepath = path.resolve(targetPath, filename || (collection + ".json"));

    console.log(`export docs from ${connection}:${database}:${collection} to ${filepath} start...`);

    if (fs.existsSync(filepath))
        fs.unlinkSync(filepath);

    if (!_.isEmpty(fields)) {
        projection = {};
        fields.forEach(field => {
            projection[field] = 1;
        })
    } else {
        fields = mb.tryGetFields({ connection, db: database, collection });
    }

    collectionResult[collection] = 0;

    let theSkip = skip;
    let theLimit = limit || Number.MAX_SAFE_INTEGER;
    while (continueRead) {
        let docs = mb.readFromDb({ connection, db: database, collection, query, projection, sort, skip: theSkip, limit: theLimit > BATCH_SIZE ? BATCH_SIZE : theLimit });
        let readLength = docs.length;

        theSkip += readLength;
        theLimit -= readLength;

        if (readLength < BATCH_SIZE)
            continueRead = false;

        if (readLength) {
            collectionResult[collection] += readLength;
            let jsonContent = mb.docsToJSON({ docs, fields, jsonType: exportType });
            await(appendFileAsync(filepath, jsonContent));

            console.log(`export ${collectionResult[collection]} docs to ${path.basename(filepath)}.`);
            totalDocs += docs.length;
        }

        sleep(10)
    }

    console.log(`export ${collectionResult[collection]} docs from ${connection}:${database}:${collection} to ${filepath} finished.`);
}

exportCollections.forEach(it => exportCollection(it));
_.delay(() => mb.openFolder(targetPath), 1000);

if (exportCollections.length > 1)
    console.log(`Total ${totalDocs} document(s) of ${exportCollections.length} collections successfully exported.`, collectionResult);
