#!/bin/sh

echo "${GITHUB_REPOSITORY}"
echo "${DOCKER_SERVICE}"
if [ "${GITHUB_REPOSITORY}" != "kvalitetsit/fut-patient-web" ] && [ "${DOCKER_SERVICE}" = "kvalitetsit/fut-patient-web" ]; then
  echo "Please run setup.sh REPOSITORY_NAME"
  exit 1
fi
