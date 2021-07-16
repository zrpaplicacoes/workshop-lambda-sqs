# ZRP Workshop: Reading SQS Queues with Lambda

This repository is part of a ZRP workshop called __"Reading SQS Queues with Lambda"__.

To go throughout this lecture you __MUST__ have installed:

* Node (lts/fermium)
* yarn@latest

Additionally you __SHOULD__ install for a better overall experience:

* Visual Studio Code
* Docker
* Docker Compose
* [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

## Structure

This repo is a monorepo managed by Yarn Workspaces. There are 3 main folders:

* Web: React with Typescript to implement a lightweight frontend (@workshop/web);
* Serverless: Lambda functions that implement the main interface for our services (@workshop/serverless);
* Shared: Reusable code between web and serverless (@workshop/shared);

## Navigation

There are multiple tags in this repository between points of interest during the lecture.
To move to a particular tag, use: `git checkout <tag_name>`

The tags available are:

* initial-setup: Repository created, without any folders;
* commitizen: A friendly reminder to commit correctly;
* monorepo: Creates every monorepo package;
