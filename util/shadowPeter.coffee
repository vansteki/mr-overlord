# shadowOeter is used to wakeup slack-hubot
# from https://github.com/slackhq/node-slack-client

Slack = require 'slack-client'
https = require "https"
token = '' # Add a bot at https://my.slack.com/services/new/bot and copy the token here.
autoReconnect = true
autoMark = true
slack = new Slack(token, autoReconnect, autoMark)

slack.on 'presenceChange', (u, msg) ->
  console.log u.name + "," + msg + "," + +new Date
  if msg == 'active'
    https.get 'https://mr-overlord.herokuapp.com', (res, err) ->

slack.on 'open', ->
  channels = []
  groups = []
  unreads = slack.getUnreadCount()
  # Get all the channels that bot is a member of
  channels = ("##{channel.name}" for id, channel of slack.channels when channel.is_member)
  # Get all groups that are open and not archived
  groups = (group.name for id, group of slack.groups when group.is_open and not group.is_archived)
  console.log "Welcome to Slack. You are @#{slack.self.name} of #{slack.team.name}"
  console.log 'You are in: ' + channels.join(', ')
  console.log 'As well as: ' + groups.join(', ')

slack.on 'error', (error) ->
  console.error "Error: #{error}"

slack.login()
