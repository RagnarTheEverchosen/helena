import { Awaitable, Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

type LoggerFunction = (...args: unknown[]) => void
export interface CommandProps {
	interaction: ChatInputCommandInteraction
	client: Client
	log: LoggerFunction
}

export type CommandsExec = (props: CommandProps) => Awaitable<unknown>
export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
export interface Command {
	meta: CommandMeta
	exec: CommandsExec
}

export interface CommandCategoryExtra {
	description?: string
	emoji?: string
}

export interface CommandCategory extends CommandCategoryExtra {
	name: string
	commands: Command[]
}