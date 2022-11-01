import { Colors, EmbedBuilder, TextChannel } from 'discord.js';
import { event } from '../utils';
import keys from '../keys';

export default event('guildMemberRemove', ({ log, client }, member) => {
	log(member.user.tag, member.joinedTimestamp);

	const leaveEmbed = new EmbedBuilder()
		.setDescription(`<@${member.user.id}> left the server`)
		.setColor(Colors.Red);
		
	const logChannel = member.guild.channels.cache.get(keys.logChannel);
	(logChannel as TextChannel).send({ embeds: [leaveEmbed] });

});