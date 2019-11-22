const copyfiles = require('copyfiles');

//Copy wijmo cultures files
const oneSignalFilesFrom = 'ext_modules/**/*';
const oneSignalFilesTo = 'www';

copyfiles([oneSignalFilesFrom, oneSignalFilesTo], 1, function(c,err){
    if(err)
        console.log(err);
});
