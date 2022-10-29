import { Client, GatewayIntentBits } from 'discord.js'
import { registreEvents } from '../utils'
import events from '../events'
import keys from '../keys'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers
	],
})

registreEvents(client, events)

client.login(keys.clientToken)
	.catch((err) => {
		console.error('[Login Error]', err)
		process.exit(1)
	})