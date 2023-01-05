import { ChannelType, Colors, EmbedBuilder, SlashCommandBuilder, TextChannel } from 'discord.js';
import { command } from '../../utils';

const meta = new SlashCommandBuilder()
	.setName('removecourse')
	.setDescription('Adds course/courses')
	.addStringOption((option) => 
		option
			.setName('input')
			.setDescription('Course or list of courses you don\'t want to see.')
			.setMinLength(1)
			.setMaxLength(2000)
			.setRequired(true)
	);

export default command(meta, async ({ interaction }) => {
	const input = interaction.options.getString('input')
	const courses = input!.split(/[ ,;]+/);

	await interaction.deferReply({
		ephemeral: true,
	});

	const courseSuccess: string[] = [];
	const courseFailed: string[] = [];

	for (const course of courses) {

		const courseChannel = interaction.guild?.channels.cache.find(c => c.name === course.toLowerCase() && c.type === ChannelType.GuildText) as TextChannel;
		if (!courseChannel) {
			courseFailed.push(course.toUpperCase())
			continue;
		};

		courseChannel.permissionOverwrites.edit(interaction.member?.user.id as string, { ViewChannel: false });
		courseSuccess.push(course.toUpperCase());

	};

	const response = new EmbedBuilder()
		.setTitle('Selected Courses')
		.setColor('#00459e')
		.setFooter({ text: 'If the course failed to remove, it probably doesn\'t exist or was misspelled.\nIf you are having problems adding courses contact one of the moderators.' });

	for (const course of courseSuccess) {
		response.addFields({ name: course, value: 'Successfuly removed course' });
	}

	for (const course of courseFailed) {
		response.addFields({ name: course, value: 'Failed to remove course' });
	}


	interaction.editReply({
		embeds: [response],
	});

	
});