# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.177.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="16-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Change default shell to bash
SHELL ["/bin/bash", "-c"]

# [Optional] Uncomment this section to install additional OS packages.
ARG PKGS=

RUN if [[ ! -z "$PKGS" ]]; then echo "Installing packages ${PKGS}.." \
    && apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends ${PKGS} \
    ;fi

# [Optional] Uncomment if you want to install an additional version of node using nvm
ARG EXTRA_NODE_VERSION=

RUN if [[ ! -z "$EXTRA_NODE_VERSION" ]]; then echo "Installing extra node ${EXTRA_NODE_VERSION}..." \
    && su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}" \
    ;fi

# [Optional] Uncomment if you want to install more global node modules
ARG GLOBAL_MODULES=

# [Optional] Add global modules
RUN if [[ ! -z "$GLOBAL_MODULES" ]]; then echo "Installing global modules ${GLOBAL_MODULES}..." \
    && su node -c "npm install -g ${GLOBAL_MODULES}" \
    ;fi

# [Optional] Uncomment if you want to keep terminal history
# You must mount a volume with target=/commandhistory
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.history \
    && chown -R node /commandhistory \
    && echo $SNIPPET >> "/home/node/.bashrc" \
    && echo $SNIPPET >> "/home/node/.zshrc"

# [Optional] Uncomment if you want to keep node repl history
# You must enable the command above and add rlwrap to $PKGS
RUN SNIPPET="alias node=\"env NODE_NO_READLINE=1 rlwrap node\"" \
    && echo $SNIPPET >> "/home/node/.bashrc" \
    && echo $SNIPPET >> "/home/node/.zshrc"
