import { Client, GatewayIntentBits } from 'discord.js';
import { registreEvents } from '../utils';
import events from '../events';
import keys from '../keys';
import { Logger } from '../logger';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent
	],
});

registreEvents(client, events);

client.login(keys.clientToken)
	.catch((err) => {
		Logger.error('Login error', err);
		process.exit(1);
	});