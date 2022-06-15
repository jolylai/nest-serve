#!/usr/bin/env zx

const container = 'nest-serve';

await $`git pull`;
await $`docker build -t ${container} .`;
await $`docker stop ${container}`;
await $`docker rm ${container}`;
await $`docker run --restart always --name ${container} -p 7070:7070 -v /root/${container}/public/uploads:/app/public/uploads -d ${container}`;
