module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    chrome: '41',
                    ie: '10'
                },
                debug: false,
                useBuiltIns: 'entry',
                corejs: '2.6.11'
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        production: {
            plugins: ['emotion']
        },
        development: {
            plugins: [['emotion', { sourceMap: true }]]
        }
    }
};
