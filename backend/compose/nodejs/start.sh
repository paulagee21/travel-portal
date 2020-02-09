set -o errexit
set -o pipefail
set -o nounset
set -o xtrace

#knex migrate:latest --env local
#knex seed:run --env local
npm run migrate
npm run dev