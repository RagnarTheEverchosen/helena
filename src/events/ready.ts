import { ActivityType } from 'discord.js'
import { event } from '../utils'
import { Logger } from '../logger';

export default event('ready', ({ log }, client) => {
	Logger.info(`Logged in as ${client.user.tag}`);
	client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: 'over MENDELU' }], status: 'online' });
})