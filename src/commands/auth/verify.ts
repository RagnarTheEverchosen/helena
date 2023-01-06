import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, ComponentType, EmbedBuilder, MessageComponentInteraction, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';
import { isValidEmail, isValidStudent, isUserInDatabase } from '../../verification';
import { UserModel } from '../../types';
import nodemailer from 'nodemailer';
import keys from '../../keys';
import { verifyEmail } from '../../templates'
import Mail from 'nodemailer/lib/mailer';
import { Logger } from '../../logger';

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

	const isInDatabase = await isUserInDatabase(interaction.member?.user.id!);

	if(isInDatabase) {
		response
			.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
			.setTitle('Verification Failed')
			.setDescription('You have already recieved a registration token')
			.setColor(Colors.Red)
			.setFooter({ text: 'If you cannot verify, send message to Fouss#3807' });
		

		return await interaction.editReply({
			embeds: [response]
		});
	}

	response
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
		.setTitle('Check your data')
		.setFields(
			{ name: 'Email', value: `${email}`, inline: true },
			{ name: 'ID Number', value: `${id}`, inline: true }
		)
		.setColor(Colors.Green)
		.setFooter({ text: 'You have 7 seconds to click \'Verify\', after that action will terminate' })

	const responseActionRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('verification_yes')
					.setLabel('Verify')
					.setStyle(ButtonStyle.Success)
			);

	await interaction.editReply({
		embeds: [response],
		components: [responseActionRow]
	});

	interaction.channel?.awaitMessageComponent({ time: 7000, componentType: ComponentType.Button, dispose: true })
		.then((i) => {
			if (i.customId === 'verification_yes' && i.user.id === interaction.member?.user.id) {

				//TODO: this is bs make a proper token generator
				const token = Math.floor(100000000 + Math.random() * 900000000);
				const user = new UserModel({
					createdAt: new Date(),
					id: interaction.member?.user.id,
					token: token,
					email: email
				});

				const transporter = nodemailer.createTransport({
					host: keys.smtpProvider,
					auth: {
						user: keys.emailUser,
						pass: keys.emailPwd,
					},
				});

				const emailTemplate = verifyEmail(token);

				const mailOptions: Mail.Options = {
					from: keys.emailUser,
					to: email!,
					subject: 'MENDELU Discord Verification',
					html: emailTemplate.html,
				};

				transporter.sendMail(mailOptions, (err, info) => {
					if (err) {
						const errResponse = new EmbedBuilder()
							.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
							.setTitle('Verification Error')
							.setDescription('There was an error sending the email!')
							.setFooter({ text: 'Please conntact one of the mods' })
							.setColor(Colors.Red);

							interaction.editReply({ 
								embeds: [errResponse], 
								components: [] 
						   });
						   Logger.error('Failed to send verification email', err);
					} else {
						const yesResponse = new EmbedBuilder()
							.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
							.setTitle('Verification Email Send')
							.setDescription('With your token you can now use \`/register\`')
							.setColor(Colors.Green);

						user.save();

						interaction.editReply({ 
							embeds: [yesResponse], 
							components: [] 
					   });
					}
				});
			}
		}).catch(() => {
			const timeoutResponse = new EmbedBuilder()
					.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
					.setTitle('Verification Canceled')
					.setDescription('You took too long. Please try again.')
					.setColor(Colors.Red);

			interaction.editReply({
				embeds: [timeoutResponse],
				components: []
			});
		});

});