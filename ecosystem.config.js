module.exports = {
    apps: [
        {
            name: 'dado_antigo',
            script: './dado_antigo/index.js',
            exec_mode: 'cluster',
            watch: ['./dado_antigo', './helpers'],
            ignore_watch: ['./dado_antigo/logs'],
            max_memory_restart: '200M',
            restart_delay: 1000,
        },
    ]
};
