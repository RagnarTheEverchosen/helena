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

	const response = new EmbedBuilder();

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
		})
		.then(async (channel) => {
			let category = await interaction.guild?.channels.cache.find(c => c.name === "PŘEDMĚTY" && c.type === ChannelType.GuildCategory && c.children.cache.size < 50) as CategoryChannel;
			if (!category) category = await interaction.guild?.channels.create({ 
				name: 'PŘEDMĚTY',
				type: ChannelType.GuildCategory,
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
			}) as CategoryChannel;
			if (await category.children.cache.size == 50) category = await interaction.guild?.channels.create({ 
				name: 'PŘEDMĚTY',
				type: ChannelType.GuildCategory,
				permissionOverwrites: [
					{
						id: keys.unverifiedRole,
						deny: [PermissionFlagsBits.ViewChannel]
					},
					{
						id: keys.verifiedRole,
						deny: [PermissionFlagsBits.ViewChannel]
					}
				]
			}) as CategoryChannel;
			await channel.setParent(category.id);
		})
		.catch(async (err) => {
			console.error(err);
			response
				.setTitle('Error')
				.setDescription('An error accured while creating channel.')
				.setColor(Colors.Red)

			await interaction.editReply({
				embeds: [response]
			});
		});

	});

});