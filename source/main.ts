
import {readJson} from "authoritarian"

import {Config} from "./interfaces"
import {prepareAuthServer} from "./modules/google-solution"
import {
	mockQueryUserByGoogleId as queryUserByGoogleId
} from "./modules/user-accounting"
// import {prepareAuthServer} from "./modules/passport-google-solution"

export async function main() {
	const {authServer, google} = await readJson<Config>("config.json")
	const server = await prepareAuthServer({google, queryUserByGoogleId})
	server.listen(authServer.port)
	console.log(`Auth server listening on port ${authServer.port}`)
}

main()
	.catch(error => console.error(error))
