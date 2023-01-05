import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { command } from '../../utils';

const meta = new SlashCommandBuilder()
	.setName('setupverify')
	.setDescription('Creates verify tutorial message');

export default command(meta, async ({ interaction }) => {

	const response = new EmbedBuilder()
		.setAuthor({ name: 'Verification', iconURL: 'https://cdn4.iconfinder.com/data/icons/basic-ui-colour/512/ui-41-512.png' })
		.setTitle('How to verify')
		.setDescription('Use \`/verify\` and follow the bots instructions')
		.setColor('#00459e')
		.setFooter({ text: 'If you cannot verify, send message to Fouss#3807' });

	await interaction.channel?.send({
		embeds: [response]
	});

});