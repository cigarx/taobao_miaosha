const { exec } = require('child_process')


exec('RASDIAL 宽带连接 057150550817 152666', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})
