import 'dotenv/config';

import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	DB_HOST: get('HOST_DATABASE').required().asString(),
	DB_USERNAME: get('USERNAME_DATABASE').required().asString(),
	DB_PASSWORD: get('PASSWORD_DATABASE').required().asString(),
	DB_DATABASE: get('DATABASE').required().asString(),
	DB_PORT: get('PORT_DATABASE').required().asPortNumber(),

	SEND_EMAIL: get('SEND_EMAIL').required().asString(),
	MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
	MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
	MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
};
