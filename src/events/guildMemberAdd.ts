import { Colors, EmbedBuilder, RoleResolvable } from 'discord.js'
import { event } from '../utils'

export default event('guildMemberAdd', ({ log , client}, member) => {
	// Log member join
	log(member.user.tag, member.joinedTimestamp)

	const unverifiedRole = member.guild.roles.cache.get('1035914191246209044')
	member.roles.add(unverifiedRole as RoleResolvable, 'joinded guild')

	const verifyEmbedCZE = new EmbedBuilder()
		.setDescription('CZE')
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png'})
		.setColor(Colors.Green)
		.setFooter({ text: 'Pokud se ti nedaří se ověřit, prosím napiš zprávu Fouss#3807' })

	const verifyEmbedENG = new EmbedBuilder()
		.setDescription('ENG')
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png'})
		.setColor(Colors.Green)
		.setFooter({ text: 'If you cannot verify, send message to Fouss#3807' })

	member.user.send({ embeds: [verifyEmbedCZE, verifyEmbedENG] })

})