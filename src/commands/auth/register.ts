import { Colors, EmbedBuilder, GuildMember, RoleResolvable, SlashCommandBuilder, TextChannel } from 'discord.js';
import { command } from '../../utils';
import { isUserTokenValid } from '../../verification';
import keys from '../../keys';

const meta = new SlashCommandBuilder()
	.setName('register')
	.setDescription('Registeres a MENDELU student.')
	.addNumberOption((option) => 
		option
			.setName('token')
			.setDescription('Verification token.')
			.setRequired(true)
	);

export default command(meta, async ({ interaction }) => {
	const token = interaction.options.getNumber('token');

	await interaction.deferReply({
		ephemeral: true,
	});

	const isTokenValid = await isUserTokenValid(interaction.member?.user.id!, token!);

	const response = new EmbedBuilder();

	if (!isTokenValid) {
		response
			.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
			.setTitle('Registration Failed')
			.setDescription('Token you provided is invalid or you didn\'t generate your token yet')
			.setColor(Colors.Red)
			.setFooter({ text: 'If you cannot register, send message to Fouss#3807' });
		

		return await interaction.editReply({
			embeds: [response]
		});
	}

	response
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
		.setTitle('Registration Successful')
		.setDescription('Welcome to the MENDELU Discord Server')
		.setColor(Colors.Green)

	await interaction.editReply({
		embeds: [response]
	});

	const unverifiedRole = interaction.guild?.roles.cache.get(keys.unverifiedRole);
	const verifiedRole = interaction.guild?.roles.cache.get(keys.verifiedRole);

	(interaction.member as GuildMember).roles.remove(unverifiedRole as RoleResolvable);
	(interaction.member as GuildMember).roles.add(verifiedRole as RoleResolvable);

	const registerEmbed = new EmbedBuilder()
		.setDescription(`<@${interaction.member?.user.id}> registered successfuly`)
		.setColor(Colors.Green)

	const logChannel = interaction.guild?.channels.cache.get(keys.logChannel);
	(logChannel as TextChannel).send({ embeds: [registerEmbed] })

});