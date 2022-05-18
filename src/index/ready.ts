import { Client } from "discord.js";
import mongoose from "mongoose";
import config from "../config.json";

export var owner: any;

export async function ready(client: Client) {
    if (client.user) {
		console.log(`Logged in as "${client.user.tag}"!`);
		owner = client.users.cache.get("299587516082683914");
	}

	await mongoose
		.connect(config.mongooseURI, {
			autoIndex: false,
		})
		.then(() => {
			console.log(`Connected to "${mongoose.connections[0].db.databaseName}" database!`);
		})
		.catch((err) => {
			console.log(err);
			owner?.send(err);
		})
}