import { Event } from '../types'
import ready from './ready'
import interactionCreate from './interactionCreate'
import guildMemberAdd from './guildMemberAdd'
import guildMemberRemove from './guildMemberRemove'

const events: Event<any>[] = [
	ready,
	interactionCreate,
	guildMemberAdd,
	guildMemberRemove,
]

export default events