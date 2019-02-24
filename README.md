# daytime

a friendly implementation of RFC 867, the Daytime Protocol, on both TCP and UDP.

Remember, Daytime is for humans, NTP is for machines.

Give it a spin:
```
> npm start
```

try it with tcp:
```
> nc 0.0.0.0 13
```
it'll connect, and the server will reply with the time

or udp:
```
> nc -u 0.0.0.0 13
```
then hit enter to send a message, the server will reply with the time
