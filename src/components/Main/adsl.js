const { exec } = window.require('child_process')


const adslDel = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 3e4)
        exec('RASDIAL 宽带连接 /d', (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                resolve()
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);

            exec('RASDIAL 宽带连接 057150550817 152666', (err, stdout, stderr) => {
                if (err) {
                    exec('RASDIAL 宽带连接 057150550817 152666')
                    console.log(err);
                    resolve()
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve()
            })

        })
    })


}

export {
    adslDel
}