Please create a new environment for $ARGUMENTS.

Follow these steps:

1. In packages/server/src/utils/getEnvPath.ts, add a new variable and value.
2. Add .env.$ARGUMENTS in both packages/server and packages/client. Just copies values from .env.hadyai
3. Ask me how many containers I want and how many trays for each container.
4. In `packages/server/src/constants.ts`, add a new values for this new environment
