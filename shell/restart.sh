#!/bin/sh
echo '' > nohup.out
./shell/kill.sh
sleep 1
./shell/background.sh
