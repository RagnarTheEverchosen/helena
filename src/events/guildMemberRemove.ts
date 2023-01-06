import { Colors, EmbedBuilder, TextChannel } from 'discord.js';
import { event } from '../utils';
import keys from '../keys';
import { Logger } from '../logger';

export default event('guildMemberRemove', ({ log, client }, member) => {
	Logger.info('[USER LEAVE]', member.user.tag);

	const leaveEmbed = new EmbedBuilder()
		.setDescription(`<@${member.user.id}> left the server`)
		.setColor(Colors.Red);
		
	const logChannel = member.guild.channels.cache.get(keys.logChannel);
	if (!logChannel) {
		Logger.warn('Log channel not found');
	} else {
		(logChannel as TextChannel).send({ embeds: [leaveEmbed] });
	}

});