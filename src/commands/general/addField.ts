import { GuildMember, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';
import { OBORY } from '../../fields.json';

const meta = new SlashCommandBuilder()
	.setName('addfield')
	.setDescription('Adds field')
	.addStringOption((option) => 
		option
			.setName('input')
			.setDescription('Field that you want to add')
			.setMinLength(1)
			.setMaxLength(2000)
			.setRequired(true)
	);

export default command(meta, async ({ interaction }) => {
	const input = interaction.options.getString('input')!;

	await interaction.deferReply({
		ephemeral: true,
	});

	const response = new EmbedBuilder()
		.setTitle('Field Selection')
		.setColor('#00459e')
		.setFooter({ text: 'If the field failed to add, it probably doesn\'t exist or was misspelled.\nIf you are having problems adding your field contact one of the moderators.' });

	const fieldRole = interaction.guild?.roles.cache.find(c => c.name.toLowerCase() === input.toLowerCase());
	if (!fieldRole || !(OBORY.some(f => f.name.toLowerCase() === input.toLowerCase()))) {
		response.addFields({ name: input, value: 'Failed to add field' });
		interaction.editReply({
			embeds: [response],
		});
		return;
	};

	const member = interaction.member as GuildMember;
	member!.roles.add(fieldRole);

	response.addFields({ name: input, value: 'Successfuly added field' });

	interaction.editReply({
		embeds: [response],
	});

});