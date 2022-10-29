import { ActivityType } from 'discord.js'
import { event } from '../utils'

export default event('ready', ({ log }, client) => {
	log(`Logged in as ${client.user.tag}`)
	client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: 'over MENDELU' }], status: 'online' })
})