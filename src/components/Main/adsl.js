

const { exec } = window.require('child_process')

exec('RASDIAL 宽带连接 K98989988 987654321', (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
})
