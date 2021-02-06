const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const publicDirPath = path.join(__dirname, "/public");

cron.schedule("* * * * *", () => {
    // https://stackoverflow.com/questions/19167297/in-node-delete-all-files-older-than-an-hour
    fs.readdir(publicDirPath, function(err, files) {
        files.forEach(function(file, index) {
            if (file.includes("gb-poke")) {
                fs.stat(path.join(publicDirPath, file), function(err, stat) {
                    let endTime, now;
                    
                    if (err) 
                    {
                        return console.error(err);
                    }
    
                    now = new Date().getTime();
                    endTime = new Date(stat.ctime).getTime() + 1; //밀리초 단위
                    if (now > endTime) 
                    {
                        return fs.unlink(path.join(publicDirPath, file), function(err) {
                            if (err) 
                            {
                                return console.error(err);
                            }
                            console.log('successfully deleted');
                        });
                    }
                });
            }
        });
    });
});