import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";
import * as path from "path";

export default function createAwsUser(envFilePath: string) {
  
  
  const dynamoPolicy = new aws.iam.Policy("dynamoPolicy", {
    policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
            {
                Action: "dynamodb:*",
                Effect: "Allow",
                Resource: "*",
            },
        ],
    }),
  });
  
  // Attach the policy to an IAM user or role
  const user = new aws.iam.User("dynamoUser");
  new aws.iam.UserPolicyAttachment("userPolicyAttachment", {
    user: user.name,
    policyArn: dynamoPolicy.arn,
  });
  
  const accessKey = new aws.iam.AccessKey("dynamoAccessKey", { user: user.name });
  const awsAccessKeyId = accessKey.id;
  const awsSecretAccessKey = accessKey.secret.apply(secret => secret);

  // Append the AWS credentials to the .env file
  accessKey.id.apply(awsAccessKeyId => {
    accessKey.secret.apply(awsSecretAccessKey => {
      appendEnvVariables(envFilePath, {
        AWS_ACCESS_KEY_ID: awsAccessKeyId,
        AWS_SECRET_ACCESS_KEY: awsSecretAccessKey,
      });
    });
});

  return { awsAccessKeyId, awsSecretAccessKey };
}

function appendEnvVariables(filePath: string, variables: { [key: string]: string }) {
  let envContent = "";
  if (fs.existsSync(filePath)) {
    envContent = fs.readFileSync(filePath, "utf-8");
  }

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`^${key}=.*$`, "m");
    const newLine = `${key}=${value}`;
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, newLine);
    } else {
      envContent += `\n${newLine}`;
    }
  }

  fs.writeFileSync(filePath, envContent.trim() + "\n");
}

