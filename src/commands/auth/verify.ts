import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';
import { isValidEmail, isValidStudent } from '../../verification';

const meta = new SlashCommandBuilder()
	.setName('verify')
	.setDescription('Verifies a MENDELU student.')
	.addStringOption((option) => 
		option
			.setName('university_email')
			.setDescription('xlogin@mendelu.cz')
			.setMinLength(1)
			.setMaxLength(2000)
			.setRequired(true)
	)
	.addNumberOption((option) => 
		option
			.setName('id')
			.setDescription('ID Number found on your ISIC.')
			.setRequired(true)
	);

export default command(meta, async ({ interaction }) => {
	const email = interaction.options.getString('university_email');
	const id = interaction.options.getNumber('id');

	await interaction.deferReply({
		ephemeral: true,
	});

	const isValidID = await isValidStudent(id!);
	const isValidUniEmail = isValidEmail(email!);

	const response = new EmbedBuilder();

	if (!isValidID || !isValidUniEmail) {
		response
			.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
			.setTitle('Verification Failed')
			.setDescription('Email or ID you provided is invalid. Please try again.')
			.setColor(Colors.Red)
			.setFooter({ text: 'If you cannot verify, send message to Fouss#3807' });
		

		return await interaction.editReply({
			embeds: [response]
		});
	}

	//TODO: Check if ID already is registered

	response
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
		.setTitle('Is this you?')
		.setFields(
			{ name: 'Email', value: `${email}`, inline: true },
			{ name: 'ID Number', value: `${id}`, inline: true }
		)
		.setColor(Colors.Green)
		.setFooter({ text: 'If the data are incorect click \'Cancel\' and start over.' })

	const responseActionRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('verification_yes')
					.setLabel('Confirm')
					.setStyle(ButtonStyle.Success),
				
				new ButtonBuilder()
					.setCustomId('verification_no')
					.setLabel('Cancel')
					.setStyle(ButtonStyle.Danger),
			);

	await interaction.editReply({
		embeds: [response],
		components: [responseActionRow]
	});

	//TODO: Handle button clicks

});