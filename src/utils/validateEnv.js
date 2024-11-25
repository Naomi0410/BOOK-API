import { cleanEnv } from "envalid";
import { str, port } from "envalid/dist/validators.js";

const env = cleanEnv(process.env, {
MONGO_URI: str(),
PORT: port(),
});

console.log('MONGO_URI:', env.MONGO_URI);

export default env;