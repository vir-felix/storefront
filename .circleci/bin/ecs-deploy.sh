#!/bin/bash

sudo apt-get -y install python3-pip wget
sudo pip3 install awscli
wget https://github.com/mikefarah/yq/releases/download/2.0.1/yq_linux_amd64 -O /tmp/yq
sudo mv /tmp/yq /usr/local/bin/yq
sudo chmod +x /usr/local/bin/yq

if [ -z "${AWS_REGION}" ]; then
	AWS_REGION=us-west-2
fi

if [ "${CLOUDFORMATION_AWS_ACCESS_KEY_ID}" ]; then
	AWS_ACCESS_KEY_ID=${CLOUDFORMATION_AWS_ACCESS_KEY_ID}
fi

if [ "${CLOUDFORMATION_AWS_SECRET_ACCESS_KEY}" ]; then
	AWS_SECRET_ACCESS_KEY=${CLOUDFORMATION_AWS_SECRET_ACCESS_KEY}
fi

echo "AWS_REGION: ${AWS_REGION:0:2}"
echo "AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID:0:2}"
echo "AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY:0:2}"


aws s3 cp --recursive s3://${S3_ECS_DEPLOY_BUCKET}/staging/devops .

find aws -name \*sh | xargs chmod +x
cd aws/app
./update-app-stack.sh sk-service
