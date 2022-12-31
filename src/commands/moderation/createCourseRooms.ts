import { CategoryChannel, ChannelType, Colors, EmbedBuilder, GuildBasedChannel, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';
import { PREDMETY } from '../../courses.json';
import keys from '../../keys';

const meta = new SlashCommandBuilder()
	.setName('createcourserooms')
	.setDescription('Creates rooms for all courses');

export default command(meta, async ({ interaction }) => {

	await interaction.deferReply({
		ephemeral: true,
	});

	const response = new EmbedBuilder()
			.setTitle('Course Creation')
			.setColor('#00459e');

	PREDMETY.forEach(async (course) => {
		if (await interaction.guild?.channels.cache.find(c => c.name === course.ZKRATKA.toLowerCase() && c.type === ChannelType.GuildText)) return;

		interaction.guild?.channels.create({
			name: course.ZKRATKA,
			topic: course.NAZEV,
			type: ChannelType.GuildText,
			permissionOverwrites: [
				{
					id: keys.unverifiedRole,
					deny: [PermissionFlagsBits.ViewChannel],
				},
				{
					id: keys.verifiedRole,
					deny: [PermissionFlagsBits.ViewChannel],
				}
			]
		});

		response.setDescription(`Course ${course.ZKRATKA} added`)

		interaction.editReply({
			embeds: [response]
		});

	});

	response.setDescription('Course rooms created')

	await interaction.editReply({
		embeds: [response]
	});

});