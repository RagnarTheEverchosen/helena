import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

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
			.setDescription('ID Number found on your ISIC')
			.setRequired(true)
	)

export default command(meta, ({ interaction }) => {
	const email = interaction.options.getString('university_email')
	const id = interaction.options.getNumber('id')

	// TODO: Verify passed data
	const isValidStudent = false

	const response = new EmbedBuilder()

	if (!isValidStudent) {
		response
			.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
			.setTitle('Verification Failed')
			.setDescription('Email or ID you provided is invalid. Please try again.')
			.setColor(Colors.Red)
			.setFooter({ text: 'If you cannot verify, send message to Fouss#3807' })
		
		return interaction.reply({
			ephemeral: true,
			embeds: [response]
		})
	}

	response
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
		.setTitle('Is this you?')
		.setFields(
			{ name: 'Email', value: `${email}`, inline: true },
			{ name: 'ID Number', value: `${id}`, inline: true }
		)
		.setColor(Colors.Green)

	// TODO: Send verification email if "Confirm" has been clicked
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
			)

	return interaction.reply({
		ephemeral: true,
		embeds: [response],
		components: [responseActionRow]
	})
})