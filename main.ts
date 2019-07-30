import * as fs from "fs";
import * as process from "process";
import { Tweet } from "./tweet";

const key = process.argv[2];
const infile = process.argv[3];
if (!key || !infile)
{
	console.log(`Usage: node main.js [key] [path-to-file]`);
	process.exit();
}

const fileContent = fs.readFileSync(infile, { encoding: "utf8" });

let part = 0;
let tweet = new Tweet(`${key}:${part}:`);
let tweets = [] as Tweet[];

const TWITTER_MAX_LEN = 280;

for (let c of fileContent)
{
	if (tweet.len + c.length >= TWITTER_MAX_LEN)
	{
		tweets.push(tweet);
		part += 1;
		tweet = new Tweet(`${key}:${part}:`);
	}

	tweet.body += c;
}

if (tweet.len > 0)
	tweets.push(tweet);

console.log(tweets);
fs.writeFileSync("out.txt", JSON.stringify(tweets))

