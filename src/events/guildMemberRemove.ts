import { Colors, EmbedBuilder, TextChannel } from 'discord.js';
import { event } from '../utils';

export default event('guildMemberRemove', ({ log, client }, member) => {
	log(member.user.tag, member.joinedTimestamp);

	const leaveEmbed = new EmbedBuilder()
		.setDescription(`<@${member.user.id}> left the server`)
		.setColor(Colors.Red)

	const logChannel = member.guild.channels.cache.get('1036030834613956712');
	(logChannel as TextChannel).send({ embeds: [leaveEmbed] })

})