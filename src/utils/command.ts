import { Command, CommandCategory, CommandsExec, CommandMeta, CommandCategoryExtra } from '../types'

export function command(meta: CommandMeta, exec: CommandsExec): Command {
	return {
		meta,
		exec
	}
}

export function category(name: string, commands: Command[], extra: CommandCategoryExtra = {}): CommandCategory {
	return {
		name,
		commands,
		...extra,
	}
}