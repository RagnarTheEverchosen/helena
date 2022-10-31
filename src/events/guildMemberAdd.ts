import { Colors, EmbedBuilder, RoleResolvable, TextChannel } from 'discord.js';
import { event } from '../utils';
import { GuildSettings } from '../config.json';

export default event('guildMemberAdd', ({ log , client}, member) => {
	log(member.user.tag, member.joinedTimestamp);

	const unverifiedRole = member.guild.roles.cache.get(GuildSettings.Roles.Unverified.ID);
	member.roles.add(unverifiedRole as RoleResolvable, 'joinded guild');

	const joinEmbed = new EmbedBuilder()
		.setDescription(`<@${member.user.id}> joined the server`)
		.setColor(Colors.Orange)

	const logChannel = member.guild.channels.cache.get(GuildSettings.Channels.Log.ID);
	(logChannel as TextChannel).send({ embeds: [joinEmbed] })

	const verifyEmbedCZE = new EmbedBuilder()
		.setDescription('CZE')
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png'})
		.setColor(Colors.Green)
		.setFooter({ text: 'Pokud se ti nedaří se ověřit, prosím napiš zprávu Fouss#3807' });

	const verifyEmbedENG = new EmbedBuilder()
		.setDescription('ENG')
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png'})
		.setColor(Colors.Green)
		.setFooter({ text: 'If you cannot verify, send message to Fouss#3807' });

	member.user.send({ embeds: [verifyEmbedCZE, verifyEmbedENG] });

})