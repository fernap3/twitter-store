export class Tweet
{
	constructor(public body: string) { }

	public get len () { return this.body.length; };
}