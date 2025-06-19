import { exec } from 'child_process';

exec('pwmetrics --config pwmetrics.config.json', (err, stdout, stderr) => {
    if (err) {
        console.error('❌ Error:', stderr);
        process.exit(1);
    }
    console.log('📊 pwmetrics output:\n', stdout);
});