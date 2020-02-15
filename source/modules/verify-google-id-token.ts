
// TODO cjs
import * as _googleAuth from "google-auth-library"

export async function verifyGoogleIdToken({
	googleToken,
	oAuth2Client,
	googleClientId
}: {
	googleToken: string
	googleClientId: string
	oAuth2Client: _googleAuth.OAuth2Client
}) {

	const ticket = await oAuth2Client.verifyIdToken({
		idToken: googleToken,
		audience: googleClientId
	})

	const payload = ticket.getPayload()
	const googleId = payload.sub
	const {picture: avatar} = payload

	return {googleId, avatar}
}
