#!/bin/bash

sonic -c config.cfg &
node server
