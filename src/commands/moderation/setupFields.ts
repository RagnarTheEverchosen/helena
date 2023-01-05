import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';
import { OBORY } from '../../fields.json';

const meta = new SlashCommandBuilder()
	.setName('setupfields')
	.setDescription('Creates a list of available fields.');

export default command(meta, async ({ interaction }) => {

	const embeds: EmbedBuilder[] = [];

	let embed = new EmbedBuilder()
		.setTitle('Obory')
		.setColor('#00459e')
		.setDescription('Use \`/addfield\` to add your field');

	OBORY.forEach(async (field) => {
		if (embed.data.fields?.length! + 1 > 25) {
			embeds.push(embed);
			embed = new EmbedBuilder()
				.setColor('#00459e');
		}
		embed.addFields({ name: field.name, value: field.value });
	});

	embeds.push(embed);

	await interaction.channel?.send({ embeds });

});