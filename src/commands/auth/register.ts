import { Colors, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js';
import { command } from '../../utils';

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

	//TODO: Validate token
	const isTokenValid = false;

	const response = new EmbedBuilder();

	if (!isTokenValid) {
		response
			.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
			.setTitle('Registration Failed')
			.setDescription('Token you provided is invalid. Please try again.')
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

	const registerEmbed = new EmbedBuilder()
		.setDescription(`<@${interaction.member?.user.id}> registered successfuly`)
		.setColor(Colors.Green)

	const logChannel = interaction.guild?.channels.cache.get('1036030834613956712');
	(logChannel as TextChannel).send({ embeds: [registerEmbed] })

	//TODO: Remove unverified role
	//TODO: Add verified role
});