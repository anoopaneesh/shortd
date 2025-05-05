#!/bin/sh

(
  echo "Waiting for Zookeeper to be ready..."
  sleep 10

  echo "Zookeeper is ready! Running the script..."
  # Add your commands here
  /bin/zookeeper-shell localhost create /test_znode 100000
) &  # Run in the background


/bin/zookeeper-server-start /etc/kafka/zookeeper.properties 