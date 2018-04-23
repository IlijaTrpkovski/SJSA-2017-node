#!/bin/bash

# Add Tillix repository
sudo add-apt-repository ppa:webupd8team/terminix

# Add Sublime text Key and repository
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
sudo apt-get install apt-transport-https
sudo echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list

# Elementary Tweaks
sudo add-apt-repository ppa:philip.scott/elementary-tweaks

# MongoDB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
sudo echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# Node.js
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -

# VS Code
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'

# Update repositories
sudo apt-get update

# Install packages
sudo apt-get install build-essential tilix sublime-text libxss1 libappindicator1 libindicator7 gitg elementary-tweaks mongodb-org nodejs code git

# Install deb packages

# Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb

# Visual Studio Code
#https://go.microsoft.com/fwlink/?LinkID=760868 -O vscode.deb
#sudo dpkg -i vscode.deb

# Slack
wget https://downloads.slack-edge.com/linux_releases/slack-desktop-2.8.2-amd64.deb
sudo dpkg -i slack*.deb

sudo apt-get install -f



