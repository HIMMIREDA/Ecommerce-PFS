
install remotelivereload chrome extension for auto reload springboot app : [RemoteLiveReload](https://chrome.google.com/webstore/detail/remotelivereload/jlppknnillhjgiengoigajegdpieppei?hl=en-GB) and click on it to get activated



## Run backend + client + mysql containers
```bash
./start_all.sh
```
#### springboot app is accessible on : http://localhost:8080
#### react app is accessible on : http://localhost:3000
#### mysql is accessible on : port 3307  user = root password=root (in case you want to use it)
#### phpmyadmin is accessible on : http://localhost:81 user=root password=root

## stop all containers
```bash
./stop_all.sh
```

## install a npm package for client
```bash
./mynpm install <nameOfPackage>
```



