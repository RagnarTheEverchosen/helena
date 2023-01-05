import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';
import { PREDMETY } from '../../courses.json';

const meta = new SlashCommandBuilder()
	.setName('setupcourses')
	.setDescription('Creates a list of available courses.');

export default command(meta, async ({ interaction }) => {

	let embeds: EmbedBuilder[] = [];

	let embed = new EmbedBuilder()
		.setTitle('Predměty')
		.setColor('#00459e')
		.setDescription('Use \`/addcourse\` to add your courses');

		PREDMETY.forEach(async (course) => {
		if (embed.data.fields?.length! + 1 > 10) {
			if (embeds.length + 1 > 10) {
				interaction.channel?.send({ embeds });
				embeds = [];
			};
			embeds.push(embed);
			embed = new EmbedBuilder()
				.setColor('#00459e');
		}
		embed.addFields({ name: course.ZKRATKA, value: course.NAZEV });
	});

	embeds.push(embed);

	await interaction.channel?.send({ embeds });

});