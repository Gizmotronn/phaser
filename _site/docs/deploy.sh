#!/bin/bash

export PATH=/Users/jameshamann/.rvm/gems/ruby-2.4.2/bin:/Users/jameshamann/.rvm/gems/ruby-2.4.2@global/bin:/Users/jameshamann/.rvm/rubies/ruby-2.4.2/bin:/Users/jameshamann/.rvm/bin:/Library/Frameworks/Python.framework/Versions/3.6/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
export MEDIUM_USERNAME=jameshamann
ruby -v
gem install feedjira
jekyll build
aws s3 sync /Users/jameshamann/Documents/Development/jameshamann/_site s3://jameshamann.com --delete
