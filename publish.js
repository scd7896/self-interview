const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const s3 = new AWS.S3({ region: "ap-northeast-2" });
const cloudFront = new AWS.CloudFront();

const uploadDir = function (s3Path, bucketName) {
  function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  }

  walkSync(s3Path, function (filePath, stat) {
    let bucketPath = filePath.substring(s3Path.length + 1);
    let params = { Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath) };
    s3.putObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully uploaded " + bucketPath + " to " + bucketName);
      }
    });
  });
};

s3.listObjects({ Bucket: "self-interview" }, (err, data) => {
  s3.deleteObjects(
    {
      Bucket: "self-interview",
      Delete: {
        Objects: data.Contents.map(({ Key }) => ({ Key })),
      },
    },
    (err, data) => {
      uploadDir(path.join(__dirname, "build"), "self-interview");
      cloudFront.createInvalidation(
        {
          DistributionId: "E1XLSYM546UK6I",
          InvalidationBatch: {
            Paths: {
              Quantity: 1,
              Items: ["/*"],
            },
            CallerReference: new Date().toString(),
          },
        },
        (err) => {
          console.log("pugeREquestErr", err);
        },
      );
    },
  );
});
