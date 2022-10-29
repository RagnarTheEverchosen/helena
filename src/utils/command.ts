import { Command, CommandCategory, CommandsExec, CommandMeta } from '../types'

export function command(meta: CommandMeta, exec: CommandsExec): Command {
	return {
		meta,
		exec
	}
}

export function category(name: string, commands: Command[]): CommandCategory {
	return {
		name,
		commands
	}
}