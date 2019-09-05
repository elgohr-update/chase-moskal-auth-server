
import {LoginTopic, AuthTopic, TokenTopic, AccessToken} from "authoritarian"

import {GoogleMagic} from "./google-magic"

export class LoginService implements LoginTopic {
	private _authService: AuthTopic
	private _tokenService: TokenTopic
	private _googleMagic: GoogleMagic

	constructor(options: {
		authService: AuthTopic
		googleMagic: GoogleMagic
		tokenService: TokenTopic
	}) {
		this._authService = options.authService
		this._googleMagic = options.googleMagic
		this._tokenService = options.tokenService
	}

	async userLoginRoutine(): Promise<AccessToken> {
		await this._googleMagic.initGoogleAuth()
		this._googleMagic.prepareGoogleSignOutButton({
			button: document.querySelector<HTMLDivElement>("#google-signout")
		})
		const tokens = await this._auth()

		// TODO write tokens to token service

		return tokens.accessToken
	}

	/**
	 * Authenticate with google
	 */
	private async _auth() {
		const googleUser = await this._googleMagic.prepareGoogleSignInButton()
		const googleToken = googleUser.getAuthResponse().id_token
		console.log("googleToken", googleToken)
		const tokens = await this._authService.authenticateWithGoogle({googleToken})
		return tokens
	}
}